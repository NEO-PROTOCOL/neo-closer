#!/usr/bin/env node
/**
 * @file status.ts
 * @description Check NEØ Smart Factory deployment status
 * @usage pnpm moltbot factory status --network base
 */

import { execSync } from 'child_process';
import path from 'path';

interface StatusOptions {
  network?: 'base' | 'polygon' | 'ton' | 'all';
  detailed?: boolean;
}

const SMART_CORE_PATH = '/Users/nettomello/CODIGOS/neo-smart-token/smart-core';

// Known contract addresses (update after deployments)
const CONTRACTS: Record<string, Record<string, string>> = {
  base: {
    token: '0x...', // Update with actual address
    factory: '0x...',
  },
  polygon: {
    token: '0x...',
    factory: '0x...',
  },
  ton: {
    jetton_master: 'EQ...', // Update with actual address
  },
};

async function status(options: StatusOptions): Promise<void> {
  console.log('📊 NEØ Smart Factory · Status');
  console.log('────────────────────────────');
  console.log('');

  const network = options.network || 'all';

  // Check if smart-core exists
  try {
    execSync(`test -d ${SMART_CORE_PATH}`, { stdio: 'ignore' });
  } catch {
    throw new Error(`❌ Smart Factory not found at: ${SMART_CORE_PATH}`);
  }

  // Status for all networks
  if (network === 'all') {
    console.log('🌐 Multi-Chain Status');
    console.log('');
    
    for (const net of ['base', 'polygon', 'ton']) {
      await checkNetwork(net as 'base' | 'polygon' | 'ton', options.detailed);
      console.log('');
    }
    return;
  }

  // Status for specific network
  await checkNetwork(network, options.detailed);
}

async function checkNetwork(
  network: 'base' | 'polygon' | 'ton',
  detailed?: boolean
): Promise<void> {
  const emoji = network === 'base' ? '🔵' : network === 'polygon' ? '🟣' : '🔷';
  console.log(`${emoji} ${network.toUpperCase()}`);
  console.log('─'.repeat(40));

  if (network === 'ton') {
    await checkTON(detailed);
    return;
  }

  // EVM Networks (Base, Polygon)
  try {
    const command = `cd ${SMART_CORE_PATH} && npx hardhat run scripts/status.js --network ${network}`;
    const output = execSync(command, {
      stdio: 'pipe',
      encoding: 'utf-8',
    });

    console.log(output);

    if (detailed) {
      // Get additional info
      const balanceCmd = `cd ${SMART_CORE_PATH} && npx hardhat run scripts/checkBalance.js --network ${network}`;
      const balanceOutput = execSync(balanceCmd, {
        stdio: 'pipe',
        encoding: 'utf-8',
      });
      console.log(balanceOutput);

      // Check liquidity
      const liquidityCmd = `cd ${SMART_CORE_PATH} && npx hardhat run scripts/checkLiquidity.js --network ${network}`;
      try {
        const liquidityOutput = execSync(liquidityCmd, {
          stdio: 'pipe',
          encoding: 'utf-8',
        });
        console.log(liquidityOutput);
      } catch {
        console.log('⚠️  No liquidity pools found');
      }
    }
  } catch (error: any) {
    console.log(`❌ Not deployed or error checking status`);
    console.log(`💡 Deploy: pnpm moltbot factory deploy --network ${network}`);
  }
}

async function checkTON(detailed?: boolean): Promise<void> {
  console.log('🔷 TON Blockchain');
  console.log('');

  const jettonMaster = CONTRACTS.ton.jetton_master;

  if (!jettonMaster || jettonMaster === 'EQ...') {
    console.log('❌ Not deployed');
    console.log('💡 Deploy: pnpm moltbot factory deploy --network ton');
    return;
  }

  console.log(`✅ Deployed`);
  console.log(`   Jetton Master: ${jettonMaster}`);
  console.log('');

  if (detailed) {
    console.log('📖 Check on TON explorers:');
    console.log(`   https://tonscan.org/jetton/${jettonMaster}`);
    console.log(`   https://tonviewer.com/${jettonMaster}`);
    console.log('');
    console.log('💡 Use ton-connect or TON SDK for detailed queries');
  }
}

// CLI entry point
if (require.main === module) {
  const args = process.argv.slice(2);
  
  // Parse arguments
  const options: StatusOptions = {};

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    const next = args[i + 1];

    switch (arg) {
      case '--network':
        options.network = next as 'base' | 'polygon' | 'ton' | 'all';
        i++;
        break;
      case '--detailed':
      case '-d':
        options.detailed = true;
        break;
      case '--help':
        console.log(`
Usage: pnpm moltbot factory status [options]

Options:
  --network <network>  Network to check (base, polygon, ton, all) (default: all)
  --detailed, -d       Show detailed information (balances, liquidity)
  --help               Show this help

Examples:
  pnpm moltbot factory status
  pnpm moltbot factory status --network base
  pnpm moltbot factory status --network base --detailed
  pnpm moltbot factory status --network all -d
        `);
        process.exit(0);
    }
  }

  // Run status check
  status(options).catch((error) => {
    console.error('❌ Error:', error.message);
    process.exit(1);
  });
}

export { status, StatusOptions };
