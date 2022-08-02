#! /bin/bash
set -o pipefail -e


#Start node
localchain='npx hardhat node'
echo $localchain
! gnome-terminal -- sh -c "bash -c \"${localchain}; exec bash\"" 


#Deploy Fraction Asset Contract
res=`npx hardhat run --network mumbai scripts/deploy.js`
#Parse the response res
#TODO


#Start front end.

fe='npm start'
echo $fe
eval $fe


