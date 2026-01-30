#!/usr/bin/env node
/**
 * @file status.ts
 * @description Check FlowPay transaction status
 * @usage pnpm moltbot flowpay status --tx abc123
 */

import axios from 'axios';

interface StatusOptions {
  tx?: string; // Transaction ID
  wallet?: string; // Check all transactions for wallet
  recent?: boolean; // Recent transactions (last 24h)
  export?: string; // Export format (json, csv)
}

interface PIXTransaction {
  txId: string;
  status: 'pending' | 'confirmed' | 'completed' | 'failed';
  amount: number; // BRL
  token: 'NEOFLW' | 'USDC';
  estimatedTokens: number;
  actualTokens?: number;
  wallet?: string;
  pixCode: string;
  createdAt: Date;
  confirmedAt?: Date;
  completedAt?: Date;
  expiresAt: Date;
}

const FLOWPAY_API = 'https://flowpaypix.netlify.app/.netlify/functions';
const LOCAL_API = 'http://localhost:8888/.netlify/functions'; // For dev

async function status(options: StatusOptions): Promise<void> {
  console.log('💳 FlowPay · Transaction Status');
  console.log('──────────────────────────────');
  console.log('');

  // Check specific transaction
  if (options.tx) {
    await checkTransaction(options.tx);
    return;
  }

  // Check wallet history
  if (options.wallet) {
    await checkWalletHistory(options.wallet, options.recent);
    return;
  }

  // Show recent transactions
  if (options.recent) {
    await checkRecentTransactions();
    return;
  }

  console.error('❌ Please provide --tx, --wallet, or --recent');
  console.log('Run with --help for usage');
  process.exit(1);
}

async function checkTransaction(txId: string): Promise<void> {
  console.log(`📋 Transaction: ${txId}`);
  console.log('');

  try {
    // Try production API first
    let response;
    try {
      response = await axios.get(`${FLOWPAY_API}/pix-orders`, {
        params: { txId },
        timeout: 5000,
      });
    } catch {
      // Fallback to local API
      console.log('⚠️  Production API unavailable, trying local...');
      response = await axios.get(`${LOCAL_API}/pix-orders`, {
        params: { txId },
        timeout: 5000,
      });
    }

    const tx: PIXTransaction = response.data;

    // Status emoji
    const statusEmoji = {
      pending: '⏳',
      confirmed: '✅',
      completed: '🎉',
      failed: '❌',
    }[tx.status];

    console.log(`${statusEmoji} Status: ${tx.status.toUpperCase()}`);
    console.log('');
    console.log('📊 Details:');
    console.log(`   Amount: R$ ${tx.amount.toFixed(2)}`);
    console.log(`   Token: ${tx.token}`);
    console.log(`   Estimated: ${tx.estimatedTokens.toLocaleString()} ${tx.token}`);
    if (tx.actualTokens) {
      console.log(`   Delivered: ${tx.actualTokens.toLocaleString()} ${tx.token}`);
    }
    if (tx.wallet) {
      console.log(`   Wallet: ${tx.wallet}`);
    }
    console.log('');
    console.log('⏰ Timeline:');
    console.log(`   Created: ${new Date(tx.createdAt).toLocaleString()}`);
    if (tx.confirmedAt) {
      console.log(`   Confirmed: ${new Date(tx.confirmedAt).toLocaleString()}`);
    }
    if (tx.completedAt) {
      console.log(`   Completed: ${new Date(tx.completedAt).toLocaleString()}`);
    }
    if (tx.status === 'pending') {
      console.log(`   Expires: ${new Date(tx.expiresAt).toLocaleString()}`);
      const remaining = Math.floor(
        (new Date(tx.expiresAt).getTime() - Date.now()) / 1000 / 60
      );
      console.log(`   ⏱️  ${remaining} minutes remaining`);
    }
    console.log('');

    if (tx.status === 'pending') {
      console.log('💡 Waiting for PIX payment confirmation...');
      console.log(`   PIX Code: ${tx.pixCode.substring(0, 40)}...`);
    } else if (tx.status === 'confirmed') {
      console.log('💡 Payment confirmed! Tokens being minted...');
    } else if (tx.status === 'completed') {
      console.log('✅ Transaction complete! Check your wallet.');
    } else if (tx.status === 'failed') {
      console.log('❌ Transaction failed. Contact support.');
    }
  } catch (error: any) {
    if (error.response?.status === 404) {
      console.error('❌ Transaction not found');
    } else {
      console.error('❌ Error checking status:', error.message);
    }
    process.exit(1);
  }
}

async function checkWalletHistory(
  wallet: string,
  recent?: boolean
): Promise<void> {
  console.log(`📂 Wallet History: ${wallet.substring(0, 10)}...`);
  console.log('');

  try {
    let response;
    try {
      response = await axios.get(`${FLOWPAY_API}/pix-orders`, {
        params: { wallet, recent },
        timeout: 5000,
      });
    } catch {
      response = await axios.get(`${LOCAL_API}/pix-orders`, {
        params: { wallet, recent },
        timeout: 5000,
      });
    }

    const transactions: PIXTransaction[] = response.data;

    if (transactions.length === 0) {
      console.log('📭 No transactions found');
      return;
    }

    console.log(`📊 Found ${transactions.length} transaction(s)`);
    console.log('');

    // Summary
    const totalBRL = transactions.reduce((sum, tx) => sum + tx.amount, 0);
    const totalTokens = transactions.reduce(
      (sum, tx) => sum + (tx.actualTokens || tx.estimatedTokens),
      0
    );

    transactions.forEach((tx, i) => {
      const statusEmoji = {
        pending: '⏳',
        confirmed: '✅',
        completed: '🎉',
        failed: '❌',
      }[tx.status];

      console.log(`${i + 1}. ${statusEmoji} ${tx.txId}`);
      console.log(`   R$ ${tx.amount.toFixed(2)} → ${tx.estimatedTokens} ${tx.token}`);
      console.log(`   ${new Date(tx.createdAt).toLocaleString()}`);
      console.log('');
    });

    console.log('💰 Summary:');
    console.log(`   Total Spent: R$ ${totalBRL.toFixed(2)}`);
    console.log(`   Total Tokens: ${totalTokens.toLocaleString()}`);
  } catch (error: any) {
    console.error('❌ Error fetching history:', error.message);
    process.exit(1);
  }
}

async function checkRecentTransactions(): Promise<void> {
  console.log('📊 Recent Transactions (24h)');
  console.log('');

  try {
    let response;
    try {
      response = await axios.get(`${FLOWPAY_API}/pix-orders`, {
        params: { recent: true },
        timeout: 5000,
      });
    } catch {
      response = await axios.get(`${LOCAL_API}/pix-orders`, {
        params: { recent: true },
        timeout: 5000,
      });
    }

    const transactions: PIXTransaction[] = response.data;

    if (transactions.length === 0) {
      console.log('📭 No recent transactions');
      return;
    }

    console.log(`📊 Found ${transactions.length} transaction(s)`);
    console.log('');

    transactions.forEach((tx, i) => {
      const statusEmoji = {
        pending: '⏳',
        confirmed: '✅',
        completed: '🎉',
        failed: '❌',
      }[tx.status];

      console.log(`${i + 1}. ${statusEmoji} ${tx.txId.substring(0, 16)}...`);
      console.log(`   R$ ${tx.amount} → ${tx.estimatedTokens} ${tx.token}`);
      if (tx.wallet) {
        console.log(`   Wallet: ${tx.wallet.substring(0, 10)}...`);
      }
      console.log(`   ${new Date(tx.createdAt).toLocaleString()}`);
      console.log('');
    });
  } catch (error: any) {
    console.error('❌ Error fetching recent:', error.message);
    process.exit(1);
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
      case '--tx':
        options.tx = next;
        i++;
        break;
      case '--wallet':
        options.wallet = next;
        i++;
        break;
      case '--recent':
        options.recent = true;
        break;
      case '--export':
        options.export = next;
        i++;
        break;
      case '--help':
        console.log(`
Usage: pnpm moltbot flowpay status [options]

Options:
  --tx <id>            Check specific transaction by ID
  --wallet <address>   Check all transactions for wallet
  --recent             Show recent transactions (last 24h)
  --export <format>    Export data (json, csv) [TODO]
  --help               Show this help

Examples:
  pnpm moltbot flowpay status --tx TX-1706123456789
  pnpm moltbot flowpay status --wallet 0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb
  pnpm moltbot flowpay status --recent
  pnpm moltbot flowpay status --wallet 0x... --export json
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
