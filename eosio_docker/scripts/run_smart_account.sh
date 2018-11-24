echo '=== cleos get account smartaccount ==='
cleos get account smartaccount
echo '=== cleos get table smartaccount smartaccount settings ==='
cleos get table smartaccount smartaccount settings
cleos push action smartaccount update '["smartaccount","0"]' -p smartaccount
echo '=== cleos get table smartaccount smartaccount settings ==='
cleos get table smartaccount smartaccount settings
