import { ethers, BigNumber } from 'ethers'
import BankABI from '@/data/abi/Bank.json'
import UserService from "./user";
import { logger } from '@/utils/logger';

export default class BlockchainBackgroundService {
  private bankContractAddress: string = process.env.BANK_CONTRACT as string
  private userService = new UserService()
  private initialized = false

  public initialize() {
    if (!this.initialized) {
      this.initialized = true
      this.initializeListener()
    }
  }

  public initializeListener() {
    const provider = new ethers.providers.JsonRpcProvider("https://data-seed-prebsc-1-s1.binance.org:8545");
    const contract = new ethers.Contract(this.bankContractAddress, BankABI, provider);

    contract.on("Deposit", async (from, amount: BigNumber) => {
      logger.debug("Bank contract on Deposit")
      const foundUser = await this.userService.findUserByAddress(from)
      const balance = BigNumber.from(foundUser.balance)

      const newBalance = amount.add(balance)

      if (!newBalance.eq(balance)) {
        await this.userService.updateUser(foundUser.address, {
          balance: newBalance.toString()
        })
      }
    })
  }
}