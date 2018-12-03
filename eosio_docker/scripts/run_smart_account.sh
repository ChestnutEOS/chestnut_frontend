echo '=== cleos get account smartaccount ==='
cleos get account smartaccount
echo '=== cleos get table smartaccount smartaccount settings ==='
cleos get table smartaccount smartaccount settings
cleos push action smartaccount update '["smartaccount","0"]' -p smartaccount
echo '=== cleos get table smartaccount smartaccount settings ==='
cleos get table smartaccount smartaccount settings

echo '=== freeze account ==='
cleos push action smartaccount update '["smartaccount","1"]' -p smartaccount
echo '=== cleos get table smartaccount smartaccount settings ==='
cleos get table smartaccount smartaccount settings
# cleos push action smartaccount hello '[]' -p smartaccount
sleep 1
echo '=== unfreeze account ==='
cleos push action smartaccount update '["smartaccount","0"]' -p smartaccount
cleos push action smartaccount hello '[]' -p smartaccount



echo '=== Transaction Limits ==='
echo 'cleos push action smartaccount addtxlimit ["smartaccount","500","7"] -p smartaccount'
cleos push action smartaccount addtxlimit '["smartaccount","500","7"]' -p smartaccount
sleep 0.5
echo 'cleos get table smartaccount smartaccount txlimits'
cleos get table smartaccount smartaccount txlimits

echo 'cleos push action smartaccount rmtxlimit ["smartaccount","0"] -p smartaccount'
cleos push action smartaccount rmtxlimit '["smartaccount","0"]' -p smartaccount
sleep 0.5
echo 'cleos get table smartaccount smartaccount txlimits'
cleos get table smartaccount smartaccount txlimits

echo 'cleos push action smartaccount addtxlimit ["smartaccount","5","1"] -p smartaccount'
cleos push action smartaccount addtxlimit '["smartaccount","5","1"]' -p smartaccount
sleep 0.5

echo '=== do some example transactions ==='
cleos push action smartaccount hello '[]' -p smartaccount
sleep 0.5
cleos push action smartaccount hello '[]' -p smartaccount
sleep 0.5
cleos push action smartaccount hello '[]' -p smartaccount
sleep 0.5
cleos push action smartaccount hello '[]' -p smartaccount
sleep 0.5
cleos push action smartaccount hello '[]' -p smartaccount
sleep 0.5

echo 'cleos get table smartaccount smartaccount txlimits'
cleos get table smartaccount smartaccount txlimits

echo 'cleos push action smartaccount rmtxlimit ["smartaccount","0"] -p smartaccount'
cleos push action smartaccount rmtxlimit '["smartaccount","0"]' -p smartaccount

echo 'cleos push action smartaccount addtxlimit ["smartaccount","300","30"] -p smartaccount'
cleos push action smartaccount addtxlimit '["smartaccount","300","30"]' -p smartaccount
sleep 0.5
echo 'cleos push action smartaccount addtxlimit ["smartaccount","200","1"] -p smartaccount'
cleos push action smartaccount addtxlimit '["smartaccount","200","1"]' -p smartaccount
sleep 0.5

cleos push action smartaccount locktxlimit '["smartaccount","1"]' -p smartaccount
sleep 0.5
cleos get table smartaccount smartaccount txlimits

cleos push action smartaccount locktxlimit '["smartaccount","0"]' -p smartaccount
sleep 0.5
cleos get table smartaccount smartaccount txlimits
cleos push action smartaccount rmtxlimit '["smartaccount","0"]' -p smartaccount
cleos push action smartaccount rmtxlimit '["smartaccount","1"]' -p smartaccount
cleos get table smartaccount smartaccount txlimits



echo '=== EOS limits ==='
cleos push action smartaccount addeoslimit '["smartaccount","50.0000 EOS","5"]' -p smartaccount
cleos push action smartaccount addeoslimit '["smartaccount","100.0000 EOS","1"]' -p smartaccount
sleep 0.5
cleos get table smartaccount smartaccount eoslimits

cleos push action smartaccount rmeoslimit '["smartaccount","0"]' -p smartaccount
sleep 0.5
cleos get table smartaccount smartaccount eoslimits

echo '=== do some example EOS transfers ==='
cleos push action eosio.token transfer '["smartaccount","daniel","40.0000 EOS","memo"]' -p smartaccount
sleep 0.5
cleos push action eosio.token transfer '["smartaccount","daniel","10.0000 EOS","memo"]' -p smartaccount
sleep 0.5
cleos push action eosio.token transfer '["smartaccount","daniel","20.0000 EOS","memo"]' -p smartaccount
sleep 0.5
cleos push action eosio.token transfer '["smartaccount","daniel","30.0000 EOS","memo"]' -p smartaccount
sleep 0.5

cleos push action smartaccount addeoslimit '["smartaccount","50.0000 EOS","5"]' -p smartaccount
sleep 0.5
cleos push action smartaccount addeoslimit '["smartaccount","50.0000 EOS","5"]' -p smartaccount
sleep 0.5

cleos push action smartaccount lockeoslimit '["smartaccount","1"]' -p smartaccount
sleep 0.5
cleos get table smartaccount smartaccount eoslimits
cleos push action smartaccount lockeoslimit '["smartaccount","0"]' -p smartaccount
sleep 0.5
cleos get table smartaccount smartaccount eoslimits


echo 'push action smartaccount rmeoslimit ["smartaccount","0"] -p smartaccount'
cleos push action smartaccount rmeoslimit '["smartaccount","1"]' -p smartaccount
sleep 0.5
cleos push action smartaccount rmeoslimit '["smartaccount","2"]' -p smartaccount
sleep 0.5
cleos push action smartaccount rmeoslimit '["smartaccount","3"]' -p smartaccount
sleep 0.5


echo '=== Single EOS Transfer Limits ==='
echo 'cleos push action smartaccount addtknlimit ["smartaccount","100.0000 EOS"] -p smartaccount'
cleos push action smartaccount addtknlimit '["smartaccount","100.0000 EOS"]' -p smartaccount
sleep 0.5

echo 'cleos push action smartaccount rmtknlimit ["smartaccount","4,EOS"] -p smartaccount'
cleos push action smartaccount rmtknlimit '["smartaccount","4,EOS"]' -p smartaccount

echo 'cleos push action smartaccount addtknlimit ["smartaccount","100.0000 EOS"] -p smartaccount'
cleos push action smartaccount addtknlimit '["smartaccount","100.0000 EOS"]' -p smartaccount
sleep 0.5

echo 'cleos get table smartaccount smartaccount tokenlimits'
cleos get table smartaccount smartaccount tokenlimits

cleos push action eosio.token transfer '["smartaccount","daniel","99.0000 EOS","memo"]' -p smartaccount
sleep 0.5
echo 'cleos get table smartaccount smartaccount tokenlimits'
cleos get table smartaccount smartaccount tokenlimits

echo 'update token limit form 100.0000 EOS to 10.0000 EOS'
echo 'cleos push action smartaccount addtknlimit ["smartaccount","10.0000 EOS"] -p smartaccount'
cleos push action smartaccount addtknlimit '["smartaccount","10.0000 EOS"]' -p smartaccount

echo 'cleos push action smartaccount locktknlimit ["smartaccount","4,EOS","1"] -p smartaccount'
sleep 0.5
cleos push action smartaccount locktknlimit '["smartaccount","4,EOS","1"]' -p smartaccount
echo 'cleos get table smartaccount smartaccount tokenlimits'
cleos get table smartaccount smartaccount tokenlimits
sleep 0.5



echo '=== Whitelist transactions ==='
cleos push action smartaccount addwhitelist '["smartaccount","trish"]' -p smartaccount
sleep 0.5
cleos get table smartaccount smartaccount whitelist

cleos push action smartaccount rmwhitelist '["smartaccount","trish"]' -p smartaccount
sleep 0.5
cleos get table smartaccount smartaccount blacklist

cleos push action smartaccount addwhitelist '["smartaccount","annette"]' -p smartaccount
sleep 0.5
cleos push action smartaccount addwhitelist '["smartaccount","ashe"]' -p smartaccount
sleep 0.5
cleos get table smartaccount smartaccount whitelist

cleos push action smartaccount lockwhitelst '["smartaccount","1"]' -p smartaccount
sleep 0.5
cleos get table smartaccount smartaccount whitelist
cleos push action smartaccount lockwhitelst '["smartaccount","0"]' -p smartaccount
sleep 0.5
cleos get table smartaccount smartaccount whitelist



echo '=== Blacklist transactions ==='
cleos push action smartaccount addblacklist '["smartaccount","trish"]' -p smartaccount
sleep 0.5
cleos get table smartaccount smartaccount blacklist

cleos push action smartaccount rmblacklist '["smartaccount","trish"]' -p smartaccount
sleep 0.5
cleos get table smartaccount smartaccount blacklist

cleos push action smartaccount addblacklist '["smartaccount","annette"]' -p smartaccount
sleep 0.5
cleos push action smartaccount addblacklist '["smartaccount","ashe"]' -p smartaccount
sleep 0.5
cleos get table smartaccount smartaccount blacklist

cleos push action smartaccount lockblacklst '["smartaccount","1"]' -p smartaccount
sleep 0.5
cleos get table smartaccount smartaccount blacklist
cleos push action smartaccount lockblacklst '["smartaccount","0"]' -p smartaccount
sleep 0.5
cleos get table smartaccount smartaccount blacklist

