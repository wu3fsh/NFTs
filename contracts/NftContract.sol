//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract NftContract is ERC721 {
    uint8 constant _maxTokensAmount = 10;
    uint8 _counter;
    string _tokenBaseUri;

    constructor() ERC721("NftToken", "nft") {
        _counter = 0;
        _tokenBaseUri = "ipfs://QmPLRr5WWHmv6B5gaapAqL9onc1sKSkAny7dE6ng2pHWGA/";
    }

    function mint(address to) external {
        require(
            _counter <= _maxTokensAmount,
            "Reached max tokens, cannnot mint any more"
        );
        _safeMint(to, ++_counter);
    }

    function setBaseTokenUri(string memory tokenBaseUri) public {
        _tokenBaseUri = tokenBaseUri;
    }

    function getBaseTokenUri() public view returns (string memory) {
        return _tokenBaseUri;
    }

    function getMaxAllowedTokensAmount() public pure returns (uint8) {
        return _maxTokensAmount;
    }

    function getMintedTokensAmount() public view returns (uint8) {
        return _counter;
    }

    function tokenURI(uint256 tokenId)
        public
        view
        virtual
        override
        returns (string memory)
    {
        return
            string(
                abi.encodePacked(
                    getBaseTokenUri(),
                    Strings.toString(tokenId),
                    ".json"
                )
            );
    }
}
