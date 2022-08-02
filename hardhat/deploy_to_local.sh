#! /bin/bash
set -e

#Parse options
while getopts n:c: option
do 
    case "${option}"
        in
        s)script=${OPTARG};;
        n)network=${OPTARG};;
    esac
done

#Start a headless terminal 

#deploy the smart contract
npx hardhat run --network localhost scripts/deploy.js

