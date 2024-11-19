// src/index.ts
import path from 'path';
import { WalletGenerator } from './walletGenerator';
import fs from 'fs';

async function main() {
  
  const generator = new WalletGenerator();
  
  const mnemonic = generator.getMnemonic();
  console.log('Generated mnemonic:', mnemonic);
  
  console.log('Generating 5000 wallets...');
  const wallets = await generator.generateWallets(5000);
  
  const walletsOutput = {
    mnemonic,
    wallets: wallets.map(w => ({
      address: w.address,
      privateKey: w.privateKey,
      index: w.index
    }))
  };

  const addresses = wallets.map(w => w.address);
  const addressOutput = {
    addresses: addresses
  };

  const outputDir = 'output';
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
  }

  fs.writeFileSync(
    path.join(outputDir, 'walletsByMnemonic.json'),
    JSON.stringify(walletsOutput, null, 2)
  );
  
  fs.writeFileSync(
    path.join(outputDir, 'addressesByMnemonic.json'),
    JSON.stringify(addressOutput, null, 2)
  );
  
  console.log('Wallets generated and saved to wallets.json');
  console.log(`Total wallets generated: ${wallets.length}`);
}

main().catch(console.error);