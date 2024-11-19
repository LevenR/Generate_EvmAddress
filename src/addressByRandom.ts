import { ethers } from 'ethers';
import path from 'path';
import * as fs from 'fs';

interface WalletInfo {
    privateKey: string;
    address: string;
}

async function generateWallets(count: number) {
    const wallets: WalletInfo[] = [];
    const addresses: string[] = [];
    
    console.log('start to generate evm address...');
    
    for (let i = 0; i < count; i++) {
        const wallet = ethers.Wallet.createRandom();
        
        const privateKey = wallet.privateKey;
        const address = wallet.address;
        
        wallets.push({
            privateKey: privateKey,
            address: address
        });
        
        addresses.push(address);
        
        if ((i + 1) % 1000 === 0) {
            console.log(`already generate ${i + 1} addresses...`);
        }
    }

    const outputDir = 'output';
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir);
    }
    
    fs.writeFileSync(
        path.join(outputDir, 'walletsByRandom.json'),
        JSON.stringify(wallets, null, 2)
    );
    
    fs.writeFileSync(
        path.join(outputDir, 'addressesByRandom.json'),
        JSON.stringify(addresses, null, 2)
    );
    
    console.log('Done!');
}

generateWallets(5000).catch(console.error);