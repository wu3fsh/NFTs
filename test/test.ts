import { ethers } from "hardhat";
import { Contract, ContractFactory, Signer } from "ethers";
import { expect } from "chai";

describe("Nft", function () {
  let owner: Signer;
  let addresses: Signer[];
  let nftContractFactory: ContractFactory;
  let nftContract: Contract;

  beforeEach(async function () {
    [owner, ...addresses] = await ethers.getSigners();
    nftContractFactory = await ethers.getContractFactory('NftContract');
    nftContract = await nftContractFactory.deploy();
  });

  it("should create a nft contact with default settings", async function () {
    expect(await nftContract.getBaseTokenUri()).equal("ipfs://QmPLRr5WWHmv6B5gaapAqL9onc1sKSkAny7dE6ng2pHWGA/");
    expect(await nftContract.getMaxAllowedTokensAmount()).equal(10);
  });

  it("should set new baseTokenUri", async function () {
    expect(await nftContract.getBaseTokenUri()).equal("ipfs://QmPLRr5WWHmv6B5gaapAqL9onc1sKSkAny7dE6ng2pHWGA/");
    const newUri: string = "123";
    await nftContract.setBaseTokenUri(newUri);
    expect(await nftContract.getBaseTokenUri()).equal(newUri);
  });

  it("should mint a new token", async function () {
    await nftContract.mint(owner.getAddress(), 1);
  });

  it("should return a tokenUri", async function () {
    const tokenId: number = 1;
    const baseTokenUri: string = await nftContract.getBaseTokenUri();
    const expectedUri: string = baseTokenUri + tokenId + ".json";
    expect(await nftContract.tokenURI(tokenId)).equal(expectedUri);
  });

  it("should throw an exception if tokenId out of the allowable range", async function () {
    const address: string = await owner.getAddress();

    try {
      expect(await nftContract.mint(address, 11)
      ).to.throw();
    } catch (error: unknown) {
      expect(error instanceof Error ? error.message : "").to.have.string("TokenId should be in the range from 1 to 10");
    }
  });


});