#include <eosiolib/asset.hpp>
#include <eosiolib/time.hpp>
#include <eosiolib/eosio.hpp>

#define EOS_SYMBOL symbol("EOS", 4)

using namespace eosio;

// const uint32_t blocks_per_day        = 2 * 24 * 3600;
// const uint32_t blocks_per_hour       = 2 * 3600;
const int64_t  useconds_per_day      = 24 * 3600 * int64_t(1000000);
// const int64_t  useconds_per_year     = seconds_per_year*1000000ll;

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
      bool        is_locked = 0;
      time_point  end_time;
      uint64_t    tx_number_limit;
      uint64_t    tx_number = 0;

      uint64_t primary_key() const { return id; }
      uint64_t get_by_user() const { return user.value; }
    };

    TABLE eoslimit {
      uint64_t    id;
      name        user;
      bool        is_locked = 0;
      time_point  end_time;
      asset       total_EOS_allowed_to_spend;
      asset       current_EOS_spent = asset(0,EOS_SYMBOL);

      uint64_t primary_key() const { return id; }
      uint64_t get_by_user() const { return user.value; }
    };

    TABLE whitelist {
      name        account;
      bool        is_locked = 0;

      uint64_t primary_key() const { return account.value; }
    };

    TABLE blacklist {
      name        account;
      bool        is_locked = 0;

      uint64_t primary_key() const { return account.value; }
    };

    typedef eosio::multi_index< name("settings"),    settings   >    settings_index;
    typedef eosio::multi_index< name("txlimits"),    txlimit,
            indexed_by< name("byuser"),
                        const_mem_fun< txlimit,
                                       uint64_t,
                                       &txlimit::get_by_user >
                      >
                                                                >     txlimit_index;
    typedef eosio::multi_index< name("eoslimits"),   eoslimit,
            indexed_by< name("byuser"),
                        const_mem_fun< eoslimit,
                                       uint64_t,
                                       &eoslimit::get_by_user >
                      >
                                                                >    eoslimit_index;
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

    ACTION checktxlimit() {
      // try and pass in "receiver" instead of using "_self"
      txlimit_index txlimit_table( _self, _self.value );
      auto tx_limit = txlimit_table.begin();

      for ( ; tx_limit != txlimit_table.end() ; ++tx_limit ) {
        // only check if txlimit is "unlocked"
        if ( !tx_limit->is_locked ) {
          eosio_assert( tx_limit->user == _self, "could not find self");

          // check if limit still in effect
          if ( current_time_point() <= tx_limit->end_time ) {
            //print("tx_limit->tx_number: ", tx_limit->tx_number, "\n");
            //print("tx_limit->tx_number_limit: ", tx_limit->tx_number_limit, "\n");
            eosio_assert( tx_limit->tx_number < tx_limit->tx_number_limit, "exceeded maximum transaction number" );
            // increase transaction count
            txlimit_table.modify( tx_limit, same_payer, [&]( auto& tx ) {
              tx.tx_number = tx.tx_number + 1;
            });
          }
        }
      }
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


    ACTION addtxlimit( name user, uint64_t tx_limit, uint32_t days ) {
      print("!!addtxlimit!! - Chestnut\n");
      require_auth( _self );
      time_point ct{ microseconds{ static_cast<int64_t>( current_time() ) } };
      time_point duration{ microseconds{ static_cast<int64_t>( days * useconds_per_day ) } };

      txlimit_index txlimit_table( _self, user.value );
      txlimit_table.emplace( user, [&]( auto& tx ) {
        tx.id              = txlimit_table.available_primary_key();
        tx.user            = user;
        tx.end_time        = ct + duration;
        tx.tx_number_limit = tx_limit;
      });
    }

    ACTION rmtxlimit( name user, uint64_t id ) {
      print("!!rmtxlimit!! - Chestnut\n");
      require_auth( _self );
      txlimit_index txlimit_table( _self, user.value );
      auto tx_limit = txlimit_table.find( id );

      eosio_assert( tx_limit != txlimit_table.end() , "cannot find txlimit id");

      txlimit_table.erase( tx_limit );
    }

    ACTION locktxlimit( name user, bool lock ) {
      print("!!locktxlimit!! - Chestnut\n");
      require_auth( _self );

      txlimit_index txlimit_table( _self, user.value );
      auto txlimit_user_index = txlimit_table.get_index<name("byuser")>();
      auto txlimit_user = txlimit_user_index.lower_bound( user.value);

      //const auto& st = *txlimit_user;

      for ( ; txlimit_user->user == user ; ++txlimit_user) {
        eosio_assert(txlimit_user->user == user, "incorrect first lower bound record");
        txlimit_table.modify( *txlimit_user, same_payer, [&]( auto& tx ) {
          tx.is_locked =  lock ? true : false ;
        });
      }
    }


    ACTION addeoslimit( name user, asset quantity, uint32_t days ) {
      print("!!addeoslimit!! - Chestnut\n");
      require_auth( _self );
      time_point ct{ microseconds{ static_cast<int64_t>( current_time() ) } };
      time_point duration{ microseconds{ static_cast<int64_t>( days * useconds_per_day ) } };

      eoslimit_index eoslimit_table( _self, user.value );
      eoslimit_table.emplace( user, [&]( auto& e ) {
        e.id                         = eoslimit_table.available_primary_key();
        e.user                       = user;
        e.end_time                   = ct + duration;
        e.total_EOS_allowed_to_spend = quantity;
      });
    }

    ACTION rmeoslimit( name user, uint64_t id ) {
      print("!!rmeoslimit!! - Chestnut\n");
      require_auth( _self );
      eoslimit_index eoslimit_table( _self, user.value );
      auto eos_limit = eoslimit_table.find( id );

      eosio_assert( eos_limit != eoslimit_table.end() , "cannot find txlimit id");

      eoslimit_table.erase( eos_limit );
    }

    ACTION lockeoslimit( name user, bool lock ) {
      print("!!lockeoslimit!! - Chestnut\n");
      require_auth( _self );
      eoslimit_index eoslimit_table( _self, user.value );
      auto eoslimit_user_index = eoslimit_table.get_index<name("byuser")>();
      auto eos_limit_user = eoslimit_user_index.lower_bound( user.value);

      //const auto& st = *txlimit_user;

      for ( ; eos_limit_user->user == user ; ++eos_limit_user) {
        eosio_assert(eos_limit_user->user == user, "incorrect first lower bound record");
        eoslimit_table.modify( *eos_limit_user, same_payer, [&]( auto& e ) {
          e.is_locked =  lock ? true : false ;
        });
      }
    }


    ACTION addwhitelist( name user, name account_to_whitelist ) {
      print("!!addwhitelist!! - Chestnut\n");
      require_auth( _self );
      whitelist_index whitelist_table( _self, user.value );
      eosio_assert( is_account( account_to_whitelist ), "account does not exist");

      whitelist_table.emplace( user, [&]( auto& w ) {
        w.account = account_to_whitelist;
      });
    }

    ACTION rmwhitelist( name user, name account_to_remove ) {
      print("!!rmwhitelist!! - Chestnut\n");
      require_auth( _self );
      whitelist_index whitelist_table( _self, user.value );
      auto whitelisted = whitelist_table.find( account_to_remove.value );

      eosio_assert( whitelisted->account == account_to_remove , "cannot find account");

      whitelist_table.erase( whitelisted );
    }

    ACTION lockwhitelst( name user, bool lock ) {
      print("!!lockwhitelst!! - Chestnut\n");
      require_auth( _self );
      whitelist_index whitelist_table( _self, user.value );
      //auto whitelist_owner = whitelist_table.find( user.value );
      auto begin = whitelist_table.begin();

      for ( ; begin != whitelist_table.end(); ++begin ) {
          whitelist_table.modify( *begin, same_payer, [&]( auto& w ) {
            w.is_locked =  lock ? true : false ;
          });
      }
    }


    ACTION addblacklist( name user, name account_to_blacklist ) {
      print("!!addblacklist!! - Chestnut\n");
      require_auth( _self );
      blacklist_index blacklist_table( _self, user.value );
      eosio_assert( is_account( account_to_blacklist ), "account does not exist");

      blacklist_table.emplace( user, [&]( auto& w ) {
        w.account = account_to_blacklist;
      });
    }

    ACTION rmblacklist( name user, name account_to_remove ) {
      print("!!rmblacklist!! - Chestnut\n");
      require_auth( _self );
      blacklist_index blacklist_table( _self, user.value );
      auto blacklisted = blacklist_table.find( account_to_remove.value );

      eosio_assert( blacklisted->account == account_to_remove , "cannot find account");

      blacklist_table.erase( blacklisted );
    }

    ACTION lockblacklst( name user, bool lock ) {
      print("!!lockblacklst!! - Chestnut\n");
      require_auth( _self );
      blacklist_index blacklist_table( _self, user.value );
      //auto blacklist_owner = blacklist_table.find( user.value );
      auto begin = blacklist_table.begin();

      for ( ; begin != blacklist_table.end(); ++begin ) {
          blacklist_table.modify( *begin, same_payer, [&]( auto& w ) {
            w.is_locked =  lock ? true : false ;
          });
      }
    }


};

// specify the contract name, and export a public action: update
//EOSIO_DISPATCH( chestnut, (update)(transfer) )

extern "C" {
  void apply( uint64_t receiver, uint64_t code, uint64_t action ) {
    // chestnut _chestnut(receiver);
    //auto self = receiver;

    /****************************************************************************
     *  ACTION HANDLERS
     ***************************************************************************/

    // gives ability to rm a txlimit after it is exceeded
    if( code==receiver && action== name("rmtxlimit").value ) {
      execute_action( name(receiver), name(code), &chestnut::rmtxlimit );
    }

    // Runs for every actions that is not "update"
    if( code==receiver && action != name("update").value ) {
      execute_action( name(receiver), name(code), &chestnut::checkfrozen );
      execute_action( name(receiver), name(code), &chestnut::checktxlimit );
    }
    if( code==receiver && action== name("update").value ) {
      execute_action( name(receiver), name(code), &chestnut::update );
    }
    // else if(code==receiver && action== name("notify").value) {
    //   execute_action(name(receiver), name(code), &chestnut::notify );
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

    /****************************************************************************
     *  ACTION SETTINGS
     ***************************************************************************/

    else if( code==receiver && action== name("addtxlimit").value ) {
      execute_action( name(receiver), name(code), &chestnut::addtxlimit );
    }
    // else if( code==receiver && action== name("rmtxlimit").value ) {
    //   execute_action( name(receiver), name(code), &chestnut::rmtxlimit );
    // }
    else if( code==receiver && action== name("locktxlimit").value ) {
      execute_action( name(receiver), name(code), &chestnut::locktxlimit );
    }
    else if( code==receiver && action== name("addeoslimit").value ) {
      execute_action( name(receiver), name(code), &chestnut::addeoslimit );
    }
    else if( code==receiver && action== name("rmeoslimit").value ) {
      execute_action( name(receiver), name(code), &chestnut::rmeoslimit );
    }
    else if( code==receiver && action== name("lockeoslimit").value ) {
      execute_action( name(receiver), name(code), &chestnut::lockeoslimit );
    }
    else if( code==receiver && action== name("addwhitelist").value ) {
      execute_action( name(receiver), name(code), &chestnut::addwhitelist );
    }
    else if( code==receiver && action== name("rmwhitelist").value ) {
      execute_action( name(receiver), name(code), &chestnut::rmwhitelist );
    }
    else if( code==receiver && action== name("lockwhitelst").value ) {
      execute_action( name(receiver), name(code), &chestnut::lockwhitelst );
    }
    else if( code==receiver && action== name("addblacklist").value ) {
      execute_action( name(receiver), name(code), &chestnut::addblacklist );
    }
    else if( code==receiver && action== name("rmblacklist").value ) {
      execute_action( name(receiver), name(code), &chestnut::rmblacklist );
    }
    else if( code==receiver && action== name("lockblacklst").value ) {
      execute_action( name(receiver), name(code), &chestnut::lockblacklst );
    }


  }
};
