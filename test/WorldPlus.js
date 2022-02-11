const { expect } = require("chai");
var FixedSupply = artifacts.require('./WorldPlus')
const BigNumber = require('bignumber.js')
const truffleAssert = require('truffle-assertions')

function BN2Str(BN) { return ((new BigNumber(BN)).toFixed()) }
function getBN(BN) { return (new BigNumber(BN)) }

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

var mintable; var fixedSupply;
var acc0; var acc0; var acc2;
const one = 10**18

before(async function() {
  accounts = await ethers.getSigners();
  acc0 = await accounts[0].getAddress()
  acc1 = await accounts[1].getAddress()
  acc2 = await accounts[2].getAddress()

  mintable = await Mintable.new();
  fixedSupply = await FixedSupply.new();
})

describe("Deploy", function() {
  it("Should deploy", async function() {
    expect(await fixedSupply.name()).to.equal("Token Digital Coin");
    expect(await fixedSupply.symbol()).to.equal("WPL");
    expect(BN2Str(await fixedSupply.decimals())).to.equal('18');
    expect(BN2Str(await fixedSupply.totalSupply())).to.equal(BN2Str(250000000000 * one));
  });
});

describe("WorldPlus be a valid ERC-20", function() {

  it("Should transfer", async function() {
    await fixedSupply.transfer(acc1, "1000", {from:acc0})
    expect(BN2Str(await fixedSupply.balanceOf(acc1))).to.equal('1000');
  });
  it("Should transfer From", async function() {
    await fixedSupply.approve(acc1, "1000", {from:acc0}) 
    expect(BN2Str(await fixedSupply.allowance(acc0, acc1))).to.equal('1000');
    await fixedSupply.transferFrom(acc0, acc1, "1000", {from:acc1})
    expect(BN2Str(await fixedSupply.balanceOf(acc1))).to.equal('2000');
  });
  it("Should burn", async function() {
    await fixedSupply.burn("500", {from:acc1})
    expect(BN2Str(await fixedSupply.balanceOf(acc1))).to.equal('1500');
    expect(BN2Str(await fixedSupply.totalSupply())).to.equal(BN2Str('24999999999999999999999999500'));

  });
  it("Should burn from", async function() {
    await fixedSupply.approve(acc2, "500", {from:acc1}) 
    expect(BN2Str(await fixedSupply.allowance(acc1, acc2))).to.equal('500');
    await fixedSupply.burnFrom(acc1, "500", {from:acc2})
    expect(BN2Str(await fixedSupply.balanceOf(acc1))).to.equal('1000');
    expect(BN2Str(await fixedSupply.totalSupply())).to.equal(BN2Str('24999999999999999999999999000'));

  });
});



