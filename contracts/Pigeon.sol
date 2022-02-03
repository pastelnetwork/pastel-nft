// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./ERC721Tradable.sol";
import "openzeppelin-solidity/contracts/ownership/Ownable.sol";

/**
 * @title Pigeon
 * Pigeon - a contract for my non-fungible Pigeons.
 */
contract Pigeon is TradeableERC721Token {
    constructor(address _proxyRegistryAddress)
        public
        TradeableERC721Token("Pigeon", "PSP", _proxyRegistryAddress)
    {}

    function baseTokenURI() public view returns (string memory) {
        return "https://opensea-creatures-api.herokuapp.com/api/creature/";
    }
}
