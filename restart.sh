#!/usr/bin/env bash

# force remove the perivous container if any
# create a clean data folder in eosio_docker to preserve block data
echo "=== setup/reset data for eosio_docker ==="
docker stop eosio_securitylogic_container || true && docker rm --force eosio_securitylogic_container || true
rm -rf "./eosio_docker/data"
mkdir -p "./eosio_docker/data"

# # start blockchain and put in background
./start_eosio_docker.sh

# # start frontend react app
# ./start_frontend.sh

