// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./ERC721Tradable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title Pigeon
 * Pigeon - a contract for my non-fungible Pigeons.
 */
contract Pigeon is ERC721Tradable {
    string public baseUri = "";

    constructor(address _proxyRegistryAddress)
        ERC721Tradable("Pigeon", "PSP", _proxyRegistryAddress)
    {}

    function baseTokenURI() public view override returns (string memory) {
        return baseUri;
    }

    function setBaseTokenURI(string memory _baseUri) public {
        baseUri = _baseUri;
    }
}
