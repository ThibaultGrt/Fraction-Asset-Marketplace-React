// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;



interface IFractionAsset {
    /**
    *
    *  
    */
    event BuyFractions(address user, uint when);

    function  buyFractions(uint share) external payable;
    function  balanceOf(address user) external view returns(uint);

}
