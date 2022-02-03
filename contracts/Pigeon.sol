// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./ERC721Tradable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title Pigeon
 * Pigeon - a contract for my non-fungible Pigeons.
 */
contract Pigeon is ERC721Tradable {
    constructor(address _proxyRegistryAddress)
        ERC721Tradable("Pigeon", "PSP", _proxyRegistryAddress)
    {}

    function baseTokenURI() public pure override returns (string memory) {
        return "https://creatures-api.opensea.io/api/creature/";
    }
}
