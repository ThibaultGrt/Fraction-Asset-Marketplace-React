#! /bin/bash
set -o pipefail -e

# DEploy
npx hardhat --network mumbai  deployParam Unique 3 1 


#Start node
#localchain='npx hardhat node'
#echo $localchain
#! gnome-terminal -- sh -c "bash -c \"${localchain}; exec bash\"" 


#Deploy Fraction Asset Contract
#res=`npx hardhat run --network mumbai scripts/deploy.js`
#Parse the response res
#TODO


#Start front end.

#fe='npm start'
#echo $fe
#eval $fe


