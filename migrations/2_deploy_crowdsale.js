const AastToken = artifacts.require("./AastToken.sol");

module.exports = function (deployer) {
    const  name = "Auto Audit Token";
    const  symbol = "AAST";

  deployer.deploy(AastToken,name,symbol);
};
