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
