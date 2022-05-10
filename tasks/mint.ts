import { task } from "hardhat/config";

task("mint", "Mint a new token")
  .addParam('nft', "The address of the nft contract")
  .addParam('address', "The address that will get the nft")
  .setAction(async (taskArgs, hre) => {
    const nftAddress = taskArgs.nft;
    const address = taskArgs.address;
    const nftContractFactory = await hre.ethers.getContractFactory('NftContract');
    const nftContract = nftContractFactory.attach(nftAddress);
    await nftContract.mint(address);

    console.log("Done");
  });