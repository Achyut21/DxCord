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

    const transaction = await Dappcord.connect(deployer).createChannel("general",tokens(1))
    await transaction.wait()
  })

  describe("Deployment",function(){

  })

  describe("Creating Channels", () => {
    it('Returns Total Channels', async ()=>{
      const result = await Dappcord.totalChannels()
      expect(result).to.be.equal(1)
    })

    it('Returns Channel attributes', async() => {
      const Channel = await Dappcord.getChannel(1)
      expect(Channel.id).to.be.equal(1)
      expect(Channel.name).to.be.equal("general")
      expect(Channel.cost).to.be.equal(tokens(1))
    })
  })
  

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

  describe("Joining Channels", () => {
    const ID = 1
    const AMOUNT = ethers.utils.parseUnits("1", 'ether')

    beforeEach(async () => {
      const transaction = await Dappcord.connect(user).mint(ID, { value: AMOUNT })
      await transaction.wait()
    })

    it('Joins the user', async () => {
      const result = await Dappcord.hasJoined(ID, user.address)
      expect(result).to.be.equal(true)
    })

    it('Increases total supply', async () => {
      const result = await Dappcord.totalSupply()
      expect(result).to.be.equal(ID)
    })

    it('Updates the contract balance', async () => {
      const result = await ethers.provider.getBalance(Dappcord.address)
      expect(result).to.be.equal(AMOUNT)
    })
  })

  describe("Withdrawing", () => {
    const ID = 1
    const AMOUNT = ethers.utils.parseUnits("10", 'ether')
    let balanceBefore

    beforeEach(async () => {
      balanceBefore = await ethers.provider.getBalance(deployer.address)

      let transaction = await Dappcord.connect(user).mint(ID, { value: AMOUNT })
      await transaction.wait()

      transaction = await Dappcord.connect(deployer).withdraw()
      await transaction.wait()
    })

    it('Updates the owner balance', async () => {
      const balanceAfter = await ethers.provider.getBalance(deployer.address)
      expect(balanceAfter).to.be.greaterThan(balanceBefore)
    })

    it('Updates the contract balance', async () => {
      const result = await ethers.provider.getBalance(Dappcord.address)
      expect(result).to.equal(0)
    })
  })

});
