#!/usr/bin/env tsx

/**
 * 🏭 Smart Factory - Deploy Skill
 * 
 * Deploy contratos inteligentes (EVM/TON) via Neobot CLI
 * 
 * Uso:
 *   moltbot factory deploy --network base --token NEOFLW
 *   moltbot factory deploy --network ton --jetton NeoJetton
 * 
 * @version 1.0.0
 * @author Mellø (NEØ Protocol)
 */

import { execSync } from 'child_process';
import path from 'path';

interface DeployOptions {
  network: 'base' | 'polygon' | 'ton';
  contract?: string;
  verify?: boolean;
}

/**
 * Path para smart-core local
 */
const SMART_CORE_PATH = '/Users/nettomello/CODIGOS/neo-smart-token/smart-core';

/**
 * Deploy contract na rede especificada
 */
async function deploy(options: DeployOptions): Promise<void> {
  console.log(`🏭 Deploying to ${options.network}...`);

  try {
    // Verificar se smart-core existe
    const coreExists = execSync(`test -d ${SMART_CORE_PATH} && echo "yes" || echo "no"`)
      .toString()
      .trim();

    if (coreExists !== 'yes') {
      throw new Error(`smart-core not found at ${SMART_CORE_PATH}`);
    }

    // Executar deploy baseado na rede
    let command: string;

    if (options.network === 'ton') {
      // Deploy TON Jetton via Tact
      command = `cd ${SMART_CORE_PATH} && npm run deploy:ton`;
    } else {
      // Deploy EVM via Hardhat
      command = `cd ${SMART_CORE_PATH} && npx hardhat run scripts/deployV2.js --network ${options.network}`;
    }

    console.log(`📦 Executing: ${command}`);
    const output = execSync(command, { encoding: 'utf-8' });
    console.log(output);

    // Se verificar flag estiver ativa
    if (options.verify && options.network !== 'ton') {
      console.log('✅ Verifying contract on block explorer...');
      const verifyCommand = `cd ${SMART_CORE_PATH} && npx hardhat verify --network ${options.network}`;
      execSync(verifyCommand, { encoding: 'utf-8' });
    }

    console.log('🎉 Deploy completed successfully!');

    // TODO: Registrar no Neobot Ledger
    // TODO: Notificar via Telegram
    // TODO: Atualizar Notion Database

  } catch (error) {
    console.error('❌ Deploy failed:', error);
    throw error;
  }
}

/**
 * CLI Entry Point
 */
if (require.main === module) {
  const args = process.argv.slice(2);
  const network = args.find((arg) => arg.startsWith('--network='))?.split('=')[1] as DeployOptions['network'];
  const verify = args.includes('--verify');

  if (!network) {
    console.error('Usage: moltbot factory deploy --network=<base|polygon|ton> [--verify]');
    process.exit(1);
  }

  deploy({ network, verify }).catch((err) => {
    console.error(err);
    process.exit(1);
  });
}

export { deploy };
