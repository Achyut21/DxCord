const { expect } = require("chai");
const { ethers } = require("hardhat");

const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), 'ether');
}

describe("Dappcord", function () {
  
  let Dappcord;
  let deployer, user
  
  const NAME = "Dappcord";
  const SYMBOL = "DC";
  
  beforeEach(async () => {

    [deployer, user] = await ethers.getSigners()

    const DappcordFactory = await ethers.getContractFactory("Dappcord");
    Dappcord = await DappcordFactory.deploy(NAME, SYMBOL);
    await Dappcord.deployed();
  });

  describe("Deployment", function () {
    it("Sets the name", async () => {
      let result = await Dappcord.name();
      expect(result).to.equal(NAME);
    });

    it("Sets the symbol", async () => {
      let result = await Dappcord.symbol();
      expect(result).to.equal(SYMBOL);
    });

    it("Sets the owner", async () => {
      const result = await Dappcord.owner()
      expect(result).to.equal(deployer.address)
    })
  });
});
