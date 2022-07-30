// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Import this file to use console.log
import "hardhat/console.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
//import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "./IFractionAsset.sol";

contract FractionAsset is IFractionAsset {

    using Strings for uint256;    
    using SafeMath for uint256;

    address payable public owner;
    string public name;
    uint256 public shares;
    uint256 public totalOwnedShares;
    mapping( address => uint ) public shareOwners;
    uint256 public sharePrice;

    constructor(string memory _name,uint _shares, uint _assetPrice) {
        require( _shares>1,"Not enough fracitons.");
        require( bytes(_name).length>0,"Asset name should be set.");
        require( _assetPrice > 0,"Price should be set." );
        name = _name;
        shares = _shares;
        sharePrice = _assetPrice/_shares;
        owner = payable(msg.sender);
    }

    function buyFractions(uint _shares) public payable override{
        require(_shares.add(totalOwnedShares)<=shares,"Not enough fractions available.");
        require(msg.value >= (_shares.mul(sharePrice)),"Not enough ethers.");

        // Withdraw pattern would be prefered.
        (bool success,) = owner.call{value: msg.value}("");
        require(success,"Ether transfer failed.");

        // update the total number of owned shares
        totalOwnedShares += _shares;
        // update the mapping of owned shared per owner
        shareOwners[msg.sender] += _shares;

        emit BuyFractions(msg.sender,_shares);
        
    }

    function balanceOf(address _user)external view returns(uint){
        return shareOwners[_user];
    }
}
