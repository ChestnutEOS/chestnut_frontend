#!/usr/bin/env bash
set -o errexit

echo "=== setup blockchain accounts and smart contract ==="

# set PATH
PATH="$PATH:/opt/eosio/bin:/opt/eosio/bin/scripts"

set -m

echo "=== install EOSIO.CDT (Contract Development Toolkit) ==="
apt install /opt/eosio/bin/scripts/eosio.cdt-1.3.2.x86_64.deb

# start nodeos ( local node of blockchain )
# run it in a background job such that docker run could continue
nodeos -e -p eosio -d /mnt/dev/data \
  --config-dir /mnt/dev/config \
  --http-validate-host=false \
  --plugin eosio::producer_plugin \
  --plugin eosio::chain_api_plugin \
  --plugin eosio::http_plugin \
  --http-server-address=0.0.0.0:8888 \
  --access-control-allow-origin=* \
  --max-transaction-time=1000 \
  --contracts-console \
  --verbose-http-errors &
sleep 1s
until curl localhost:8888/v1/chain/get_info
do
  sleep 1s
done

# Sleep for 2 to allow time 4 blocks to be created so we have blocks to reference when sending transactions
sleep 2s
echo "=== setup wallet: eosiomain ==="
# First key import is for eosio system account
cleos wallet create -n eosiomain --to-console | tail -1 | sed -e 's/^"//' -e 's/"$//' > eosiomain_wallet_password.txt
cleos wallet import -n eosiomain --private-key 5KQwrPbwdL6PhXujxW37FSSQZ1JiwsST4cqQzDeyXtP79zkvFD3

OWNER_PUBLIC_KEY="EOS6MRyAjQq8ud7hVNYcfnVPJqcVpscN5So8BhtHuGYqET5GDW5CV"
OWNER_PRIVATE_KEY="5KQwrPbwdL6PhXujxW37FSSQZ1JiwsST4cqQzDeyXtP79zkvFD3"
ACTIVE_PUBLIC_KEY="EOS5iBKH8KxAU4BLomJseyhWVvwmTiU4a98xKVwLciPZosHgJ66Z5"
ACTIVE_PRIVATE_KEY="5JhkMn1vP6omtS4nwzWvZX9a6rjuXmpDY7kiMiXSbHW2XRowG5D"

echo "=== setup wallet: securitylogicwal ==="
# key for eosio account and export the generated password to a file for unlocking wallet later
cleos wallet create -n securitylogicwal --to-console | tail -1 | sed -e 's/^"//' -e 's/"$//' > securitylogic_wallet_password.txt
# Owner key for securitylogicwal wallet
cleos wallet import -n securitylogicwal --private-key 5JpWT4ehouB2FF9aCfdfnZ5AwbQbTtHBAwebRXt94FmjyhXwL4K
# Active key for securitylogicwal wallet
cleos wallet import -n securitylogicwal --private-key 5JD9AGTuTeD5BXZwGQ5AtwBqHK21aHmYnTetHgk1B3pjj7krT8N
# Active key for eosio.token
cleos wallet import -n securitylogicwal --private-key 5JhkMn1vP6omtS4nwzWvZX9a6rjuXmpDY7kiMiXSbHW2XRowG5D
# Active key for smartaccount
cleos wallet import -n securitylogicwal --private-key 5KE2UNPCZX5QepKcLpLXVCLdAw7dBfJFJnuCHhXUf61hPRMtUZg

# * Replace "securitylogicwal" by your own wallet name when you start your own project

# create account for seclogacc with above wallet's public keys
cleos create account eosio seclogacc EOS6PUh9rs7eddJNzqgqDx1QrspSHLRxLMcRdwHZZRL4tpbtvia5B EOS8BCgapgYA2L4LJfCzekzeSr3rzgSTUXRXwNi8bNRoz31D14en9
# * Replace "seclogacc" by your own account name when you start your own project

echo "=== create system accounts ==="
cleos create account eosio eosio.token  ${OWNER_PUBLIC_KEY} ${ACTIVE_PUBLIC_KEY} -p eosio
cleos create account eosio eosio.msig   ${OWNER_PUBLIC_KEY} ${ACTIVE_PUBLIC_KEY} -p eosio
cleos create account eosio eosio.ram    ${OWNER_PUBLIC_KEY} ${ACTIVE_PUBLIC_KEY} -p eosio
cleos create account eosio eosio.ramfee ${OWNER_PUBLIC_KEY} ${ACTIVE_PUBLIC_KEY} -p eosio
cleos create account eosio eosio.stake  ${OWNER_PUBLIC_KEY} ${ACTIVE_PUBLIC_KEY} -p eosio
cleos create account eosio eosio.saving ${OWNER_PUBLIC_KEY} ${ACTIVE_PUBLIC_KEY} -p eosio
cleos create account eosio eosio.bpay   ${OWNER_PUBLIC_KEY} ${ACTIVE_PUBLIC_KEY} -p eosio
cleos create account eosio eosio.names  ${OWNER_PUBLIC_KEY} ${ACTIVE_PUBLIC_KEY} -p eosio
cleos create account eosio eosio.vpay   ${OWNER_PUBLIC_KEY} ${ACTIVE_PUBLIC_KEY} -p eosio
cleos create account eosio eosio.upay   ${OWNER_PUBLIC_KEY} ${ACTIVE_PUBLIC_KEY} -p eosio

echo "=== load eosio.bios, eosio.token, and eosio.msig contracts ==="
deploy_system_contract.sh eosio.bios eosio securitylogicwal $(cat securitylogic_wallet_password.txt)
deploy_system_contract.sh eosio.token eosio.token securitylogicwal $(cat securitylogic_wallet_password.txt)
cleos push action eosio.token create '[ "eosio", "1000000000.0000 EOS"]' -p eosio.token
cleos push action eosio.token issue '[ "eosio", "1000000000.0000 EOS", "init" ]' -p eosio eosio.token
deploy_system_contract.sh eosio.msig eosio.msig securitylogicwal $(cat securitylogic_wallet_password.txt)

# Set the system contract - times out first times, works second time
sleep .5 && cleos set contract eosio ./contracts/eosio.system/ -p eosio
sleep .5

echo 'init system contract'
cleos push action eosio init '["0","4,EOS"]' -p eosio

# Elevate multi-sig privileges
echo 'elevate eosio.msig privileges'
cleos push action eosio setpriv '["eosio.msig", 1]' -p eosio@active

echo "=== create user accounts ==="
# script for create data into blockchain
create_accounts.sh

echo "=== create smartaccount ==="
# smartaccount needs more RAM for deploying contract
cleos system newaccount eosio --transfer smartaccount EOS7XPiPuL3jbgpfS3FFmjtXK62Th9n2WZdvJb6XLygAghfx1W7Nb \
--stake-net "1.0000 EOS" --stake-cpu "1.0000 EOS" --buy-ram-kbytes 138675

echo "=== create accountmaker ==="
cleos system newaccount eosio --transfer accountmaker EOS7XPiPuL3jbgpfS3FFmjtXK62Th9n2WZdvJb6XLygAghfx1W7Nb \
--stake-net "1.0000 EOS" --stake-cpu "1.0000 EOS" --buy-ram-kbytes 138675

echo "=== give eosio.code permission to accountmaker ==="
cleos set account permission accountmaker active \
'{"threshold": 1,"keys": [{"key": "EOS7XPiPuL3jbgpfS3FFmjtXK62Th9n2WZdvJb6XLygAghfx1W7Nb","weight": 1}],"accounts": [{"permission":{"actor":"accountmaker","permission":"eosio.code"},"weight":1}]}' \
owner -p accountmaker

echo "=== deploy smart contract ==="
# $1 smart contract name
# $2 account holder name of the smart contract
# $3 wallet for unlock the account
# $4 password for unlocking the wallet
#deploy_contract.sh seclogic seclogacc securitylogicwal $(cat securitylogic_wallet_password.txt)
deploy_contract.sh chestnut smartaccount securitylogicwal $(cat securitylogic_wallet_password.txt)
deploy_contract.sh accountmaker accountmaker securitylogicwal $(cat securitylogic_wallet_password.txt)

echo "=== give accounts tokens ==="
cleos push action eosio.token transfer '[ "eosio", "daniel", "10000.0000 EOS", "memo"]' -p eosio
cleos push action eosio.token transfer '[ "eosio", "smartaccount", "10000.0000 EOS", "memo"]' -p eosio smartaccount

echo "=== run the smart account contract ==="
run_smart_account.sh
sleep 1
run_accountmaker.sh

echo "=== end of setup blockchain accounts and smart contract ==="
# create a file to indicate the blockchain has been initialized
touch "/mnt/dev/data/initialized"

# put the background nodeos job to foreground for docker run
fg %1
