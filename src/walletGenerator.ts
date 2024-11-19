import { ethers } from 'ethers';
import * as bip39 from 'bip39';
import { WalletInfo } from './type';

export class WalletGenerator {
  private mnemonic: string;
  
  constructor(mnemonic?: string) {
    this.mnemonic = mnemonic || bip39.generateMnemonic();
  }

  getMnemonic(): string {
    return this.mnemonic;
  }

  async generateWallets(count: number): Promise<WalletInfo[]> {
    const wallets: WalletInfo[] = [];
    
    for (let i = 0; i < count; i++) {
      const path = `m/44'/60'/0'/0/${i}`;
      const wallet = ethers.HDNodeWallet.fromPhrase(this.mnemonic, path);
      
      wallets.push({
        address: wallet.address,
        privateKey: wallet.privateKey,
        index: i
      });
    }

    return wallets;
  }

  async generateAddressesOnly(count: number): Promise<string[]> {
    const wallets = await this.generateWallets(count);
    return wallets.map(wallet => wallet.address);
  }
}