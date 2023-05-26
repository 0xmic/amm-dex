// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require('hardhat')

async function main() {
  const Token = await hre.ethers.getContractFactory('Token')
  const AMM = await hre.ethers.getContractFactory('AMM')

  // Deploy Token 1 - Crypto Token (CT)
  let ct = await Token.deploy('Crypto Token', 'CT', 1000000) // 1 million tokens
  await ct.deployed()
  console.log(`Crypto Token deployed to: ${ct.address}\n`)

  // Deploy Token 2 - USD Token (USD)
  let usd = await Token.deploy('USD Token', 'USD', 1000000) // 1 million tokens
  await usd.deployed()
  console.log(`USD Token deployed to: ${usd.address}\n`)

  // Deploy AMM
  let amm = await AMM.deploy(ct.address, usd.address)
  await amm.deployed()
  console.log(`AMM deployed to: ${amm.address}\n`)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})