import { ethers, BigNumber } from 'ethers';
import BankABI from '@/data/abi/Bank.json';

const contractAddress = "0x3D56E0Bd3a9ed7b04c19E482578813E8033600Da"; //Bank SC address
const privateKey = "0xa2e2a5aa15a975a583bcc4ce5f2ea3bce81307b999635af3955e190cda4f500e";
export const signMessage = async (recipientAddress: string, amount: BigNumber, nonce: number) => {
  const provider = new ethers.providers.JsonRpcProvider("https://data-seed-prebsc-1-s1.binance.org:8545");
  const signer = new ethers.Wallet(privateKey, provider);

  const message = ethers.utils.solidityKeccak256(
    ["address", "uint256", "uint256", "address"],
    [recipientAddress, amount, nonce, contractAddress]
  );
  const signature = await signer.signMessage(ethers.utils.arrayify(message));
  return signature;
}

// signMessage("0xcC1dc9Ba47293B285732538C7aCC0fCd8Db0e69e",ethers.utils.parseEther("30"),310);

export const listenerEvent = async () => {
  const provider = new ethers.providers.JsonRpcProvider("https://data-seed-prebsc-1-s1.binance.org:8545");
  const contract = new ethers.Contract(contractAddress, BankABI, provider);

  contract.on("Deposit", (from, amount) => {
    console.log("from", from);
    console.log("amount", amount);
  })

}
listenerEvent();
