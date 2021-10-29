import { ethers } from 'ethers'
import { SignMessageDto } from '@/dtos/blockchain'

export default class BlockchainServer {
  private bankContractAddress: string = process.env.BANK_CONTRACT as string
  private privateKey: string = process.env.PRIVATE_KEY as string

  public async signMessage(messageData: SignMessageDto) {
    const provider = new ethers.providers.JsonRpcProvider("https://data-seed-prebsc-1-s1.binance.org:8545");
    const signer = new ethers.Wallet(this.privateKey, provider);

    const message = ethers.utils.solidityKeccak256(
      ["address", "uint256", "uint256", "address"],
      [messageData.recipientAddress, messageData.amount, messageData.nonce, this.bankContractAddress]
    );
    const signature = await signer.signMessage(ethers.utils.arrayify(message));
    return signature;
  }
}