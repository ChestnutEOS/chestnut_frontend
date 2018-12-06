# chestnut

Description

The **chestnut** smart contract is meant to be deployed on an eosio users account to automatically prevent them from making mistakes
such as sending EOS to the wrong account, or sending an incorrect amount.  As smart contracts evolve and become more compelex, users
may not trust a smart contract to automatically send their eos for them, since the contract could send more then money
than orginally advertised.  A relevent example would be transfering tokens to a decentralized exchange that could accidently
send more EOS than the user indented due to bugs or malicous code.

Chestnut, prevents these mistakes by giving the user the power of a smart contract to set spending limits, transaction limits, whitelists,
blacklists, ect.


### Multi-sig account example (not needed)

This will give the active permission of *chestnutdemo* to both *dantestaccnt* and *jacktestacnt*

```bash
cleos set account permission chestnutdemo active '{"threshold": 1, "accounts": [{"permission": {"actor":"dantestaccnt","permission":"active"},"weight":1},{"permission":{"actor":"jacktestacnt","permission":"active"},"weight":1}]}' -p chestnutdemo@active
```
---


**Actions**

---
Freeze all transactions on Chestnut account
### update
ex: freeze
```bash
cleos push action smartaccount update '["smartaccount","1"]' -p smartaccount
```

ex: unfreeze
```bash
cleos push action smartaccount update '["smartaccount","0"]' -p smartaccount
```

---
Create a maximum EOS spending limit parameter for a Chestnut account
### addtknlimit
ex: send no more than ( <= ) 100.0000 EOS in a single transfer
```bash
cleos push action smartaccount addtknlimit '["smartaccount","100.0000 EOS"]' -p smartaccount
```

### rmtknlimit
ex: remove token limit
```bash
cleos push action smartaccount rmtknlimit '["smartaccount","4,EOS"]' -p smartaccount
```

### locktknlimit
ex: lock eos limit
```bash
cleos push action smartaccount locktknlimit '["smartaccount","4,EOS","1"]' -p smartaccount
```
ex: unlock eos limit
```bash
cleos push action smartaccount locktknlimit '["smartaccount","4,EOS","0"]' -p smartaccount
```


---
Create a limit to the number of transactions that can take place on a Chestnut account within a timeframe
### addtxlimit
ex: smart account can not accept (_**receive**_ or _**send**_) more than 50 transactions in 5 days
```bash
cleos push action smartaccount addtxlimit '["smartaccount","50","5"]' -p smartaccount
```

### rmtxlimit
ex: remove first transaction limit (id = 0)
```bash
cleos push action smartaccount rmtxlimit '["smartaccount","0"]' -p smartaccount
```

### locktxlimit
ex: turn transaction limit off, but keep the settings so it can be turned back on
```bash
cleos push action smartaccount locktxlimit '["smartaccount","1"]' -p smartaccount
```
ex: turn transaction limit back on again
```bash
cleos push action smartaccount locktxlimit '["smartaccount","0"]' -p smartaccount
```

---
Create a spending limit parameter for a Chestnut account, including amount and timeframe
### addeoslimit
ex: send no more than ( <= ) 50.0000 EOS over the next 5 days
```bash
cleos push action smartaccount addeoslimit '["smartaccount","50.0000 EOS","5"]' -p smartaccount
```

### rmeoslimit
ex: remove first eos limit (id = 0)
```bash
cleos push action smartaccount rmeoslimit '["smartaccount","0"]' -p smartaccount
```

### lockeoslimit
ex: lock eos limit
```bash
cleos push action smartaccount lockeoslimit '["smartaccount","1"]' -p smartaccount
```
ex: unlock eos limit
```bash
cleos push action smartaccount lockeoslimit '["smartaccount","0"]' -p smartaccount
```

---
Create a list of whitelisted and blacklisted accounts, referencing an EOS account name
### addwhitelist
ex: add goodguybrian to the whitelist
```bash
cleos push action smartaccount addwhitelist '["smartaccount","goodguybrian"]' -p smartaccount
```

### rmwhitelist
ex: remove goodguybrian to the whitelist
```bash
cleos push action smartaccount rmwhitelist '["smartaccount","goodguybrian"]' -p smartaccount
```

### lockwhitelst
ex: lock whitelist
```bash
cleos push action smartaccount lockwhitelst '["smartaccount","1"]' -p smartaccount
```
ex: unlock whitelist
```bash
cleos push action smartaccount lockwhitelst '["smartaccount","0"]' -p smartaccount
```


### addblacklist
ex: add badguybrian to the blacklist
```bash
cleos push action smartaccount addblacklist '["smartaccount","badguybrian"]' -p smartaccount
```

### rmblacklist
ex: remove goodguybrian to the blacklist
```bash
cleos push action smartaccount rmblacklist '["smartaccount","badguybrian"]' -p smartaccount
```

### lockblacklst
ex: lock blacklist
```bash
cleos push action smartaccount lockblacklst '["smartaccount","1"]' -p smartaccount
```
ex: unlock blacklist
```bash
cleos push action smartaccount lockblacklst '["smartaccount","0"]' -p smartaccount
```

---
**Tables**

---
### settings
```json
{
    "name": "settings",
    "base": "",
    "fields": [
        {
            "name": "user",
            "type": "name"
        },
        {
            "name": "created",
            "type": "time_point"
        },
        {
            "name": "is_frozen",
            "type": "bool"
        }
    ]
}
```
```json
{
    "name": "settings",
    "type": "settings",
    "index_type": "i64",
    "key_names": [],
    "key_types": []
}
```

### txlimits
```json
{
    "name": "txlimit",
    "base": "",
    "fields": [
        {
            "name": "id",
            "type": "uint64"
        },
        {
            "name": "user",
            "type": "name"
        },
        {
            "name": "is_locked",
            "type": "bool"
        },
        {
            "name": "days",
            "type": "uint64"
        },
        {
            "name": "end_time",
            "type": "time_point"
        },
        {
            "name": "tx_number_limit",
            "type": "uint64"
        },
        {
            "name": "tx_number",
            "type": "uint64"
        }
    ]
}
```
```json
{
    "name": "txlimits",
    "type": "txlimit",
    "index_type": "i64",
    "key_names": [],
    "key_types": []
}
```


### tokenlimits
```json
{
    "name": "tokenlimit",
    "base": "",
    "fields": [
        {
            "name": "max_transfer",
            "type": "asset"
        },
        {
            "name": "is_locked",
            "type": "bool"
        }
    ]
}
```
```
{
    "name": "tokenlimits",
    "type": "tokenlimit",
    "index_type": "i64",
    "key_names": [],
    "key_types": []
}
```

### eoslimits
```json
{
    "name": "eoslimit",
    "base": "",
    "fields": [
        {
            "name": "id",
            "type": "uint64"
        },
        {
            "name": "user",
            "type": "name"
        },
        {
            "name": "is_locked",
            "type": "bool"
        },
        {
            "name": "days",
            "type": "uint64"
        },
        {
            "name": "end_time",
            "type": "time_point"
        },
        {
            "name": "total_EOS_allowed_to_spend",
            "type": "asset"
        },
        {
            "name": "current_EOS_spent",
            "type": "asset"
        }
    ]
}
```
```json
{
    "name": "eoslimits",
    "type": "eoslimit",
    "index_type": "i64",
    "key_names": [],
    "key_types": []
}
```

### whitelist
```json
{
    "name": "whitelist",
    "base": "",
    "fields": [
        {
            "name": "account",
            "type": "name"
        },
        {
            "name": "is_locked",
            "type": "bool"
        }
    ]
}
```
```json
{
    "name": "whitelist",
    "type": "whitelist",
    "index_type": "i64",
    "key_names": [],
    "key_types": []
}
```

### blacklist
```json
{
    "name": "blacklist",
    "base": "",
    "fields": [
        {
            "name": "account",
            "type": "name"
        },
        {
            "name": "is_locked",
            "type": "bool"
        }
    ]
}
```
```json
{
    "name": "blacklist",
    "type": "blacklist",
    "index_type": "i64",
    "key_names": [],
    "key_types": []
}
```

