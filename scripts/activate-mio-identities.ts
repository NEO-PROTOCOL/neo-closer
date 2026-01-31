#!/usr/bin/env node --import tsx
/**
 * Ativa Identidades mio-system
 * 
 * Carrega private keys do .neo-identities/.env e cria identidades ativas
 */

import { config } from "dotenv";
import { createMioIdentityManager } from "../src/neo/identity/mio-system.js";
import * as fs from "node:fs/promises";
import * as path from "node:path";

// Carrega .env do projeto
config();

// Carrega .env das identidades
const identitiesEnvPath = path.join(process.cwd(), ".neo-identities", ".env");
try {
  const identitiesEnv = await fs.readFile(identitiesEnvPath, "utf-8");
  for (const line of identitiesEnv.split("\n")) {
    if (line.trim() && !line.startsWith("#")) {
      const [key, ...valueParts] = line.split("=");
      if (key && valueParts.length > 0) {
        process.env[key.trim()] = valueParts.join("=").trim();
      }
    }
  }
} catch (error) {
  console.error(`❌ Failed to load .neo-identities/.env: ${error}`);
  process.exit(1);
}

const IDENTITIES_CONFIG = [
  {
    key: "NEO_CORE_PRIVATE_KEY",
    name: "NEO Core System",
    bio: "Sistema principal do protocolo NEO. Gerencia inicialização, health checks e coordenação geral.",
    roles: ["system", "core"],
    permissions: { channels: ["*"], skills: ["*"], tools: ["*"] },
  },
  {
    key: "NEO_GATEWAY_PRIVATE_KEY",
    name: "NEO Gateway",
    bio: "Gerenciador de canais, roteamento e sessões. Interface principal entre usuários e o protocolo.",
    roles: ["gateway", "manager"],
    permissions: { channels: ["*"], skills: ["*"], tools: ["routing", "sessions", "websocket"] },
  },
  {
    key: "NEO_SKILLS_PRIVATE_KEY",
    name: "NEO Skills Manager",
    bio: "Gerenciador do registro descentralizado de skills (IPFS). Publica, instala e verifica skills.",
    roles: ["skills", "registry"],
    permissions: { channels: [], skills: ["*"], tools: ["ipfs", "read", "write"] },
  },
  {
    key: "NEO_FACTORY_PRIVATE_KEY",
    name: "Smart Factory Manager",
    bio: "Gerenciador de contratos inteligentes na Flow Blockchain. Deploy, mint e verificação de NFTs.",
    roles: ["factory", "blockchain"],
    permissions: { channels: ["telegram", "whatsapp"], skills: ["smart-factory"], tools: ["blockchain", "deploy", "mint", "read"] },
  },
  {
    key: "NEO_FLOWPAY_PRIVATE_KEY",
    name: "FlowPay Manager",
    bio: "Sistema de pagamentos e gestão de tokens Flow. Compra, venda e transferências.",
    roles: ["flowpay", "payment"],
    permissions: { channels: ["telegram", "whatsapp"], skills: ["flowpay"], tools: ["blockchain", "read", "tokens", "transactions"] },
  },
  {
    key: "NEO_ASI1_PRIVATE_KEY",
    name: "ASI1 LLM Manager",
    bio: "Gerenciador do modelo ASI1 LLM local. Processamento de linguagem natural e geração de texto.",
    roles: ["asi1", "llm"],
    permissions: { channels: [], skills: ["asi1-llm"], tools: ["read", "llm", "generate"] },
  },
  {
    key: "NEO_TELEGRAM_PRIVATE_KEY",
    name: "Telegram Bot",
    bio: "Bot do Telegram para comunicação e interação com usuários.",
    roles: ["telegram", "channel"],
    permissions: { channels: ["telegram"], skills: ["telegram"], tools: ["read", "write", "send"] },
  },
  {
    key: "NEO_WHATSAPP_PRIVATE_KEY",
    name: "WhatsApp Gateway",
    bio: "Gateway do WhatsApp para comunicação e interação com usuários.",
    roles: ["whatsapp", "channel"],
    permissions: { channels: ["whatsapp"], skills: ["whatsapp"], tools: ["read", "write", "send"] },
  },
  {
    key: "NEO_IPFS_PRIVATE_KEY",
    name: "IPFS Node Manager",
    bio: "Gerenciador do nó IPFS local. Armazenamento descentralizado e pinning.",
    roles: ["ipfs", "storage"],
    permissions: { channels: [], skills: ["ipfs"], tools: ["ipfs", "read", "write", "pin"] },
  },
];

async function main() {
  console.log(`
╔════════════════════════════════════════════════════════════╗
║     NEO PROTOCOL - ATIVAR IDENTIDADES MIO-SYSTEM          ║
╚════════════════════════════════════════════════════════════╝
`);

  const activated: Array<{ id: string; name: string; publicKey: string }> = [];
  const failed: Array<{ key: string; error: string }> = [];

  for (const config of IDENTITIES_CONFIG) {
    const privateKey = process.env[config.key];
    
    if (!privateKey) {
      failed.push({ key: config.key, error: "Private key not found" });
      continue;
    }

    try {
      const manager = createMioIdentityManager(privateKey);
      const identity = await manager.createIdentity(
        {
          name: config.name,
          bio: config.bio,
        },
        {
          roles: config.roles,
          permissions: config.permissions,
        }
      );

      const isValid = await manager.verifyIdentity(identity);
      
      if (!isValid) {
        failed.push({ key: config.key, error: "Verification failed" });
        continue;
      }

      activated.push({
        id: identity.id,
        name: identity.metadata.name,
        publicKey: identity.publicKey,
      });

      console.log(`✅ ${config.name}`);
      console.log(`   mio-ID: ${identity.id}`);
      console.log(`   Public Key: ${identity.publicKey}`);
      console.log(`   Roles: ${identity.roles.join(", ")}`);
      console.log("");
    } catch (error: any) {
      failed.push({ key: config.key, error: error.message });
    }
  }

  console.log("=".repeat(64));
  console.log(`✅ Ativadas: ${activated.length}/9`);
  console.log(`❌ Falhas: ${failed.length}/9`);
  console.log("=".repeat(64));

  if (failed.length > 0) {
    console.log("\n⚠️  Falhas:");
    failed.forEach((f) => console.log(`   ${f.key}: ${f.error}`));
  }

  if (activated.length === 9) {
    console.log("\n🎉 Todas as identidades ativadas com sucesso!");
    console.log("\n📋 Próximos passos:");
    console.log("   - Usar identidades em skills publicadas");
    console.log("   - Assinar skills com mio-skills identity");
    console.log("   - Implementar verificação de assinatura");
  }
}

main().catch(console.error);
