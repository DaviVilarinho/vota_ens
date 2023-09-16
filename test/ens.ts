import {
  time,
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("VotaENS", function () {
  async function deployOneYearLockFixture() {
    const [owner, otherAccount] = await ethers.getSigners();

    const VotaENS = await ethers.getContractFactory("VotaENS");
    const votaENS = await VotaENS.deploy();

    return { votaENS: votaENS, owner: owner, otherAccount: otherAccount };
  }

  describe("Deployment", function () {
    it("Deve fazer deploy", async function () {
      const ens = await loadFixture(deployOneYearLockFixture);
    });

    it("Deve conseguir registrar e votar", async function () {
      const ens = await loadFixture(deployOneYearLockFixture);

      await ens.votaENS.connect(ens.owner).registerENS("0xe0C4B3043233aedCF30041B4C9a902c80bb5318c");
      expect(await ens.votaENS.connect(ens.owner).getVotos("0xe0C4B3043233aedCF30041B4C9a902c80bb5318c")).to.be.equal(0);
      await ens.votaENS.connect(ens.owner).vote("0xe0C4B3043233aedCF30041B4C9a902c80bb5318c");
      expect(await ens.votaENS.connect(ens.owner).getVotos("0xe0C4B3043233aedCF30041B4C9a902c80bb5318c")).to.be.equal(1);
    });

    it("Não permitir voto de cabresto", async function () {
      const ens = await loadFixture(deployOneYearLockFixture);

      await ens.votaENS.connect(ens.owner).registerENS("0xe0C4B3043233aedCF30041B4C9a902c80bb5318c");
      expect(await ens.votaENS.connect(ens.owner).getVotos("0xe0C4B3043233aedCF30041B4C9a902c80bb5318c")).to.be.equal(0);
      await ens.votaENS.connect(ens.owner).vote("0xe0C4B3043233aedCF30041B4C9a902c80bb5318c");
      await ens.votaENS.connect(ens.owner).vote("0xe0C4B3043233aedCF30041B4C9a902c80bb5318c");
      expect(await ens.votaENS.connect(ens.owner).getVotos("0xe0C4B3043233aedCF30041B4C9a902c80bb5318c")).to.be.equal(1);
    });

    it("Achar vencedor", async function () {
      const ens = await loadFixture(deployOneYearLockFixture);

      await ens.votaENS.connect(ens.owner).registerENS("0xe0C4B3043233aedCF30041B4C9a902c80bb5318c");
      expect(await ens.votaENS.connect(ens.owner).getVotos("0xe0C4B3043233aedCF30041B4C9a902c80bb5318c")).to.be.equal(0);
      await ens.votaENS.connect(ens.owner).vote("0xe0C4B3043233aedCF30041B4C9a902c80bb5318c");
      expect(await ens.votaENS.connect(ens.owner).getVotos("0xe0C4B3043233aedCF30041B4C9a902c80bb5318c")).to.be.equal(1);
      expect(await ens.votaENS.connect(ens.owner).getWinner()).to.be.equal("0xe0C4B3043233aedCF30041B4C9a902c80bb5318c");
    });
  });
});
