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


echo '=== transaction limits ==='
cleos push action smartaccount addtxlimit '["smartaccount","50","7"]' -p smartaccount
sleep 0.5
cleos get table smartaccount smartaccount txlimits
cleos push action smartaccount rmtxlimit '["smartaccount","0"]' -p smartaccount
sleep 0.5
cleos get table smartaccount smartaccount txlimits
cleos push action smartaccount addtxlimit '["smartaccount","50","7"]' -p smartaccount
sleep 0.5
cleos push action smartaccount addtxlimit '["smartaccount","50","30"]' -p smartaccount
sleep 0.5
cleos push action smartaccount addtxlimit '["smartaccount","50","1"]' -p smartaccount
sleep 0.5
cleos push action smartaccount locktxlimit '["smartaccount","1"]' -p smartaccount
sleep 0.5
cleos get table smartaccount smartaccount txlimits
cleos push action smartaccount locktxlimit '["smartaccount","0"]' -p smartaccount
sleep 0.5
cleos get table smartaccount smartaccount txlimits

# echo '=== EOS limits ==='
# cleos push action smartaccount addeoslimit '["smartaccount","50.0000 EOS","5"]' -p smartaccount
# sleep 0.5
# cleos push action smartaccount rmeoslimit '["smartaccount","0"]' -p smartaccount
# sleep 0.5
# cleos push action smartaccount lockeoslimit '["smartaccount","1"]' -p smartaccount
# sleep 0.5
# cleos push action smartaccount lockeoslimit '["smartaccount","0"]' -p smartaccount
# sleep 0.5

# echo '=== Whitelist transactions ==='
# cleos push action smartaccount addwhitelist '["smartaccount","badguybrian"]' -p smartaccount
# sleep 0.5
# cleos push action smartaccount rmwhitelist '["smartaccount","badguybrian"]' -p smartaccount
# sleep 0.5
# cleos push action smartaccount lockwhitelst '["smartaccount","1"]' -p smartaccount
# sleep 0.5
# cleos push action smartaccount lockwhitelst '["smartaccount","0"]' -p smartaccount
# sleep 0.5

# echo '=== Blacklist transactions ==='
# cleos push action smartaccount addblacklist '["smartaccount","goodguybrian"]' -p smartaccount
# sleep 0.5
# cleos push action smartaccount rmblacklist '["smartaccount","goodguybrian"]' -p smartaccount
# sleep 0.5
# cleos push action smartaccount lockblacklst '["smartaccount","1"]' -p smartaccount
# sleep 0.5
# cleos push action smartaccount lockblacklst '["smartaccount","0"]' -p smartaccount
# sleep 0.5

