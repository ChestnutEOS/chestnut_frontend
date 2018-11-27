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

    void assert_frozen( name user ) {
      settings_index _settings( _self, _self.value );
      auto setting = _settings.find( user.value );

      print("frozen: ", setting->is_frozen, "\n");
      eosio_assert( !setting->is_frozen, "contract frozen" );
    }

    /****************************************************************************
     *                                T A B L E S
     ***************************************************************************/

    TABLE settings {
      name        user;
      time_point  created;
      bool        is_frozen = 0;

      auto primary_key() const { return user.value; }
    };

    TABLE txlimit {
      uint64_t    id;
      name        user;
      bool        is_frozen = 0;
      time_point  end_time;
      uint64_t    tx_number_limit;
      uint64_t    tx_number;

      uint64_t primary_key() const { return id; }
    };

    TABLE spendlimit {
      uint64_t    id;
      name        user;
      bool        is_frozen = 0;
      time_point  end_time;
      asset       total_EOS_allowed_to_spend;
      asset       current_EOS_spent;

      uint64_t primary_key() const { return id; }
    };

    TABLE whitelist {
      name              user;
      bool              is_frozen = 0;
      std::vector<name> accounts;

      uint64_t primary_key() const { return user.value; }
    };

    TABLE blacklist {
      name              user;
      bool              is_frozen = 0;
      std::vector<name> accounts;

      uint64_t primary_key() const { return user.value; }
    };

    typedef eosio::multi_index< name("settings"),    settings   >    settings_index;
    typedef eosio::multi_index< name("txlimits"),    txlimit    >    stxlimit_index;
    typedef eosio::multi_index< name("spendlimits"), spendlimit >  spendlimit_index;
    typedef eosio::multi_index< name("whitelist"),   whitelist  >   whitelist_index;
    typedef eosio::multi_index< name("blacklist"),   blacklist  >   blacklist_index;

  public:
    using contract::contract;

    // constructor
    chestnut( name receiver, name code, datastream<const char*> ds ):
              contract( receiver, code, ds ) {}

    /****************************************************************************
     *                              A C T I O N S
     ***************************************************************************/

    ACTION checkfrozen() {
      assert_frozen( _self );
    }

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
      // require_auth( _self );
      print("!!Chestnut Smart Transfer!!\n");
      // Uncomment line below to freeze all token transfers
      // eosio_assert(false, "asserted");
    }

    ACTION setnotify ( bool is_on ) {
      print("!!setnotify!!\n");
    }

    ACTION hello( void ) {
      print("hello world\n");
    }

};

// specify the contract name, and export a public action: update
//EOSIO_DISPATCH( chestnut, (update)(transfer) )

extern "C" {
  void apply( uint64_t receiver, uint64_t code, uint64_t action ) {
    // chestnut _chestnut(receiver);
    //auto self = receiver;

    if( code==receiver && action != name("update").value ) {
      execute_action( name(receiver), name(code), &chestnut::checkfrozen );
    }
    if( code==receiver && action== name("update").value ) {
      execute_action( name(receiver), name(code), &chestnut::update );
    }
    // else if(code==receiver && action== name("notify").value) {
    //   execute_action(name(receiver), name(code), &chestnut::notify );
    // }
    // else if(code==receiver && action== name("erase").value) {
    //   execute_action(name(receiver), name(code), &chestnut::erase );
    // }
    else if( code==receiver && action== name("setnotify").value ) {
      execute_action( name(receiver), name(code), &chestnut::setnotify );
    }
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
