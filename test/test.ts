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
    expect(await nftContract.getMintedTokensAmount()).equal(0);
  });

  it("should set new baseTokenUri", async function () {
    expect(await nftContract.getBaseTokenUri()).equal("ipfs://QmPLRr5WWHmv6B5gaapAqL9onc1sKSkAny7dE6ng2pHWGA/");
    const newUri: string = "123";
    await nftContract.setBaseTokenUri(newUri);
    expect(await nftContract.getBaseTokenUri()).equal(newUri);
  });

  it("should mint a new token", async function () {
    await nftContract.mint(owner.getAddress());
  });

  it("should return a tokenUri", async function () {
    const tokenId: number = 1;
    const baseTokenUri: string = await nftContract.getBaseTokenUri();
    const expectedUri: string = baseTokenUri + tokenId + ".json";
    expect(await nftContract.tokenURI(tokenId)).equal(expectedUri);
  });

  it("should throw an exception if the maximum amount of tokens is reached", async function () {
    const address: string = await owner.getAddress();
    expect(await nftContract.getMintedTokensAmount()).equal(0);
    await nftContract.mint(address);
    await nftContract.mint(address);
    await nftContract.mint(address);
    await nftContract.mint(address);
    await nftContract.mint(address);
    await nftContract.mint(address);
    await nftContract.mint(address);
    await nftContract.mint(address);
    await nftContract.mint(address);
    await nftContract.mint(address);
    await nftContract.mint(address);

    try {
      expect(await nftContract.mint(address)
      ).to.throw();
    } catch (error: unknown) {
      expect(error instanceof Error ? error.message : "").to.have.string("Reached max tokens, cannnot mint any more");
    }
  });


});