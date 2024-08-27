const HealthMonitor = artifacts.require("HealthMonitor");

module.exports = function(deployer) {
  deployer.deploy(HealthMonitor);
};
