// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "./IFactoryERC721.sol";
import "./Pigeon.sol";

contract PigeonFactory is FactoryERC721, Ownable {
    using Strings for string;

    event Transfer(
        address indexed from,
        address indexed to,
        uint256 indexed tokenId
    );

    address public proxyRegistryAddress;
    address public nftAddress;
    string public baseURI = "https://creatures-api.opensea.io/api/factory/";

    /*
     * Enforce the existence of only 125 Pigeon NFTs.
     */
    uint256 PIGEON_SUPPLY = 125;

    /*
     * Three different options for minting Pigeons (basic, premium, and gold).
     */
    uint256 NUM_OPTIONS = 3;
    uint256 SINGLE_PIGEON_OPTION = 0;
    uint256 MULTIPLE_PIGEON_OPTION = 1;
    uint256 ALL_PIGEON_OPTION = 2;
    uint256 NUM_PIGEONS_IN_MULTIPLE_PIGEON_OPTION = 4;

    constructor(address _proxyRegistryAddress, address _nftAddress) {
        proxyRegistryAddress = _proxyRegistryAddress;
        nftAddress = _nftAddress;

        fireTransferEvents(address(0), owner());
    }

    function name() external pure override returns (string memory) {
        return "Pastel Pigeon NFT";
    }

    function symbol() external pure override returns (string memory) {
        return "PSP";
    }

    function supportsFactoryInterface() public pure override returns (bool) {
        return true;
    }

    function numOptions() public view override returns (uint256) {
        return NUM_OPTIONS;
    }

    function transferOwnership(address newOwner) public override onlyOwner {
        address _prevOwner = owner();
        super.transferOwnership(newOwner);
        fireTransferEvents(_prevOwner, newOwner);
    }

    function fireTransferEvents(address _from, address _to) private {
        for (uint256 i = 0; i < NUM_OPTIONS; i++) {
            emit Transfer(_from, _to, i);
        }
    }

    function mint(uint256 _optionId, address _toAddress)
        public
        override
        onlyOwner
    {
        // Must be sent from the owner proxy or owner.
        // ProxyRegistry proxyRegistry = ProxyRegistry(proxyRegistryAddress);
        // assert(
        //     address(proxyRegistry.proxies(owner())) == _msgSender() ||
        //         owner() == _msgSender()
        // );
        require(canMint(_optionId));

        Pigeon pigeon = Pigeon(nftAddress);
        if (_optionId == SINGLE_PIGEON_OPTION) {
            pigeon.mintTo(_toAddress);
        } else if (_optionId == MULTIPLE_PIGEON_OPTION) {
            for (
                uint256 i = 0;
                i < NUM_PIGEONS_IN_MULTIPLE_PIGEON_OPTION;
                i++
            ) {
                pigeon.mintTo(_toAddress);
            }
        } else if (_optionId == ALL_PIGEON_OPTION) {
            uint256 pigeonSupply = pigeon.totalSupply();
            uint256 REST_PIGEONS = PIGEON_SUPPLY - pigeonSupply;

            for (uint256 i = 0; i < REST_PIGEONS; i++) {
                pigeon.mintTo(_toAddress);
            }
        }
    }

    function canMint(uint256 _optionId) public view override returns (bool) {
        if (_optionId >= NUM_OPTIONS) {
            return false;
        }

        Pigeon pigeon = Pigeon(nftAddress);
        uint256 pigeonSupply = pigeon.totalSupply();

        uint256 numItemsAllocated = 0;
        if (_optionId == SINGLE_PIGEON_OPTION) {
            numItemsAllocated = 1;
        } else if (_optionId == MULTIPLE_PIGEON_OPTION) {
            numItemsAllocated = NUM_PIGEONS_IN_MULTIPLE_PIGEON_OPTION;
        }
        return pigeonSupply < (PIGEON_SUPPLY - numItemsAllocated);
    }

    function tokenURI(uint256 _optionId)
        external
        view
        override
        returns (string memory)
    {
        return string(abi.encodePacked(baseURI, Strings.toString(_optionId)));
    }

    /**
     * Hack to get things to work automatically on OpenSea.
     * Use transferFrom so the frontend doesn't have to worry about different method names.
     */
    function transferFrom(
        address,
        address _to,
        uint256 _tokenId
    ) public {
        mint(_tokenId, _to);
    }

    /**
     * Hack to get things to work automatically on OpenSea.
     * Use isApprovedForAll so the frontend doesn't have to worry about different method names.
     */
    function isApprovedForAll(address _owner, address _operator)
        public
        view
        returns (bool)
    {
        if (owner() == _owner && _owner == _operator) {
            return true;
        }

        ProxyRegistry proxyRegistry = ProxyRegistry(proxyRegistryAddress);
        if (
            owner() == _owner &&
            address(proxyRegistry.proxies(_owner)) == _operator
        ) {
            return true;
        }

        return false;
    }

    /**
     * Hack to get things to work automatically on OpenSea.
     * Use isApprovedForAll so the frontend doesn't have to worry about different method names.
     */
    function ownerOf(uint256) public view returns (address _owner) {
        return owner();
    }
}
