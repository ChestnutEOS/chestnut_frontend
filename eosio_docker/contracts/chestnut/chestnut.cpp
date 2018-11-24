#include <eosiolib/asset.hpp>
#include <eosiolib/time.hpp>
#include <eosiolib/eosio.hpp>

#define EOS_SYMBOL symbol("EOS", 4)

using namespace eosio;

CONTRACT chestnut : public eosio::contract {
  private:

    /****************************************************************************
     *                            F U N C T I O N S
     ***************************************************************************/

    void validate_transfer( name code, name to, asset quantity ) {
        // whitelist_table w(code, code);
        asset cap_total;
        asset cap_tx;
        uint64_t duration;

        // auto itr = w.find(to);
        // if(itr != w.end()) {
        //     cap_total = itr->cap_total;
        //     cap_tx = itr->cap_tx;
        //     duration = itr->duration;
        // } else {
        //     settings_table s(code, code);
        //     auto it = s.find(code);
        //     cap_total = it->cap_total;
        //     cap_tx = it->cap_tx;
        //     duration = it->duration;
        // }
        // eosio_assert(quantity <= cap_tx, "cap_tx exceeded!");
        // asset cap_used = get_cap_used(code, to, quantity, duration);
        //print("cap_used:", cap_used.amount);
        //print("cap_total:", cap_total.amount);
        //  eosio_assert(cap_used <= cap_total, "cap_total exceeded!");
    }

    time_point current_time_point() {
      const static time_point ct{ microseconds{ static_cast<int64_t>( current_time() ) } };
      return ct;
    }

    bool getFrozen( name user ) {
      settings_index _settings( _self, _self.value );
      auto setting = _settings.find( user.value );

      print("Is Frozen ", setting->is_frozen, "\n");
      return setting->is_frozen;
    }

    /****************************************************************************
     *                                T A B L E S
     ***************************************************************************/

    TABLE settings {
      name       user;
      time_point created;
      bool       is_frozen = 0;

      auto primary_key() const { return user.value; }
    };

    typedef eosio::multi_index< name("settings"), settings>     settings_index;

  public:
    using contract::contract;

    // constructor
    chestnut( name receiver, name code, datastream<const char*> ds ):
              contract( receiver, code, ds ) {}

    /****************************************************************************
     *                              A C T I O N S
     ***************************************************************************/

    ACTION update( name user, bool freeze ) {
      // to sign the action with the given account
      require_auth( _self );

      settings_index _settings( _self, _self.value );
      auto setting = _settings.find( user.value );

      if ( setting == _settings.end() ) {
        _settings.emplace( _self, [&]( auto& s ) {
            s.user      = user;
            s.created   = current_time_point();
            s.is_frozen = false;
        });
      } else {
        _settings.modify( setting, same_payer, [&]( auto& s ) {
            s.is_frozen = freeze;
        });
      }
      //_settings.erase( setting );
    }

    ACTION safetransfer( name         to,
                         asset        quantity,
                         std::string  memo ) {
      require_auth( _self );

      eosio_assert( quantity.symbol == EOS_SYMBOL, "only supports EOS");

      // validate_blacklist(_self, to);
      validate_transfer( _self , to, quantity);

      // INLINE_ACTION_SENDER(eosio::token, transfer)
      // (N(eosio.token), {{_self, N(gperm)}}, {_self, to, quantity, memo});

      action(
        permission_level{get_self(),"active"_n},
        "eosio.token"_n,
        "transfer"_n,
        std::make_tuple( to, quantity, memo )
      ).send();

      //add_txrecord(_self, to, quantity, memo);
    }

    ACTION transfer( name    from,
                     name    to,
                     asset   quantity,
                     std::string  memo ) {
      require_auth( _self );
      print("!!transfer!!\n");
      // Uncomment line below to freeze all token transfers
      // eosio_assert(false, "asserted");
    }

    ACTION hello( void ) {
      getFrozen("smartaccount"_n);
      print("hello world\n");
    }

};

// specify the contract name, and export a public action: update
//EOSIO_DISPATCH( chestnut, (update)(transfer) )

extern "C" {
  void apply( uint64_t receiver, uint64_t code, uint64_t action ) {
    // chestnut _chestnut(receiver);
    //auto self = receiver;

    if( code==receiver && action== name("update").value ) {
      execute_action( name(receiver), name(code), &chestnut::update );
    }
    // else if(code==receiver && action== name("notify").value) {
    //   execute_action(name(receiver), name(code), &chestnut::notify );
    // }
    // else if(code==receiver && action== name("erase").value) {
    //   execute_action(name(receiver), name(code), &chestnut::erase );
    // }
    else if( code==receiver && action== name("hello").value ) {
      execute_action( name(receiver), name(code), &chestnut::hello );
    }
    else if( code==receiver && action== name("safetransfer").value ) {
      execute_action( name(receiver), name(code), &chestnut::safetransfer );
    }
    else if( code==name("eosio.token").value && action== name("transfer").value ) {
      execute_action( name(receiver), name(code), &chestnut::transfer );
    }

  }
};
