#include <eosiolib/eosio.hpp>
#include <eosiolib/time.hpp>
#include <eosiolib/print.hpp>

using namespace eosio;

// Smart Contract Name: seclogic
// Table struct:
//   prefstruct: multi index table to store the preferences
//     prim_key(uint64): primary key
//     user(name/uint64): account name for the user
//     spend_max(uint64): Max amount that can be spent in a single transaction
//     timestamp(uint64): the store the last update block time
// Public method:
//   isnewuser => to check if the given account name has preferences in table or not
// Public actions:
//   update => put the spend_max into the multi-index table and sign by the given account

// Replace the contract class name when you start your own project
CONTRACT seclogic : public eosio::contract {
  private:

    time_point current_time_point() {
      const static time_point ct{ microseconds{ static_cast<int64_t>( current_time() ) } };
      return ct;
    }

    bool isnewuser( name user ) {
      // get object by secordary key
      pref_table _pref_obj( _self, _self.value );

      auto preferences = _pref_obj.get_index<name("getbyuser")>();
      auto user_prefs = preferences.find(user.value);

      return user_prefs == preferences.end();
    }

    TABLE prefstruct {
      uint64_t      prim_key;  // primary key
      name          user;      // account name for the user
      uint64_t      spend_max; // max amount that can be spent in a single transaction
      uint64_t      trans_max; // max number of transactions over time period
      std::string   time_period; // time period over which transactions are limited by trans_max
      time_point    timestamp; // the store the last update block time

      // primary key
      auto primary_key() const { return prim_key; }
      // secondary key: user
      uint64_t get_by_user() const { return user.value; }
    };

    // create a multi-index table and support secondary key
    typedef eosio::multi_index< name("prefstruct"), prefstruct,
            indexed_by< name("getbyuser"), const_mem_fun<prefstruct, uint64_t, &prefstruct::get_by_user> >
      > pref_table;

  public:
    using contract::contract;

    seclogic( name receiver, name code, datastream<const char*> ds ):
               contract( receiver, code, ds ) {}

    ACTION update( name _user, uint64_t& _spend_max, uint64_t& _trans_max ) {
      // to sign the action with the given account
      require_auth( _user );

      pref_table obj(_self, _self.value); // code, scope

      // create new / update spend_max depends whether the user account exist or not
      if (isnewuser(_user)) {
        // insert object if this is a new user
        obj.emplace( _self, [&]( auto& address ) {
          address.prim_key    = obj.available_primary_key();
          address.user        = _user;
          address.spend_max   = _spend_max;
          address.trans_max   = _trans_max;
          address.timestamp   = current_time_point();
        });
      } else {
        // get object by secordary key and modify
        auto preferences = obj.get_index<name("getbyuser")>();
        auto &user_prefs = preferences.get(_user.value);
        // update object
        obj.modify( user_prefs, _self, [&]( auto& address ) {
          address.spend_max   = _spend_max;
          address.trans_max   = _trans_max;
          address.timestamp   = current_time_point();
        });
      }
    }

    // /// @abi action
    // bool approveTransaction( name _user, uint64_t& _spent ) {
    //   // to sign the action with the given account
    //   require_auth( _user );

    //   pref_table obj(_self, _self); // code, scope

    //     // get object by secordary key and modify
    //     auto preferences = obj.get_index<N(getbyuser)>();
    //     auto &user_prefs = preferences.get(_user);

    //     return user_prefs.spend_max > _spent;
    //     // // update object
    //     // obj.modify( user_prefs, _self, [&]( auto& address ) {
    //     //   address.spend_max   = _spend_max;
    //     //   address.trans_max   = _trans_max;
    //     //   address.timestamp   = now();
    //     // });
    //   }

};

// specify the contract name, and export a public action: update
EOSIO_DISPATCH( seclogic, (update) )
