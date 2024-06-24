const { ethers } = require("hardhat")
const { expect } = require("chai")

const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), 'ether')
}

describe("Dappcord", function () {
  describe("Deployment", function(){
    it("Sets the name", async() => {
      const Dappcord = await ethers.getContractFactory("Dappcord")
      Dappcord = await Dappcord.deploy("Dappcord","DC")
      let result = await Dappcord.name()
      expect(result).to.equal("Dappcord")
    })

    it("Sets the symbol", async() => {
      const Dappcord = await ethers.getContractFactory("Dappcord")
      Dappcord = await Dappcord.deploy("Dappcord","DC")
      let result = await Dappcord.symbol()
      expect(result).to.equal("DC")
    })
  })
})
