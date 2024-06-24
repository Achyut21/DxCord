const { expect } = require("chai");
const { ethers } = require("hardhat");

const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), 'ether');
}

describe("Dappcord", function () {
  
  let Dappcord;

  
  const NAME = "Dappcord";
  const SYMBOL = "DC";
  
  beforeEach(async () => {
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
  });
});
