import { ethers, network } from "hardhat";

async function main() {
  let contractAddress = "0xF79Af883f329929676cCdA3F7a9d2a7C4947f4a3";

  const [meOwner] = await ethers.getSigners();

  const myContract = await ethers.getContract("ENS", contractAddress);

  setTimeout(async () => {
    const addressResult = await myContract.connect(meOwner)["getValue(string,string)"](domain, value);

    console.log(`O address de ${domain} / ${value} é: ${addressResult}`);

  }, 50_000);

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
