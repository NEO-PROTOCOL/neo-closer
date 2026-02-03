#!/usr/bin/env tsx
import {
    MioIdentityManager,
    generatePrivateKey
} from '../src/neo/identity/mio-system.js'
import { NEO_IDENTITY_TEMPLATES } from '../src/neo/identity/registry.js'
import * as fs from 'node:fs/promises'
import * as path from 'node:path'
import chalk from 'chalk'

async function awakenWarrior() {
    const template = NEO_IDENTITY_TEMPLATES.find(t => t.id === 'mio-warrior');

    if (!template) {
        console.error(chalk.red('❌ Template mio-warrior não encontrado no registro!'));
        process.exit(1);
    }

    console.log(chalk.cyan(`
╔════════════════════════════════════════════════════════════╗
║             NEO PROTOCOL - AWAKENING WARRIOR               ║
╚════════════════════════════════════════════════════════════╝
`));

    // 1. Gerar private key
    const privateKey = generatePrivateKey();
    const manager = new MioIdentityManager(privateKey);

    // 2. Criar identidade
    const identity = await manager.createIdentity(
        template.metadata,
        {
            roles: [template.role as string],
            permissions: {
                channels: [...template.permissions.channels],
                skills: [...template.permissions.skills],
                tools: [...template.permissions.tools]
            }
        }
    );

    // 3. Salvar
    const outputDir = path.join(process.cwd(), '.neo-identities');
    await fs.mkdir(outputDir, { recursive: true });

    const filepath = path.join(outputDir, 'mio-warrior.json');
    await fs.writeFile(filepath, JSON.stringify(identity, null, 2), 'utf-8');

    // Adicionar ao .env if not exists
    const envPath = path.join(outputDir, '.env');
    const envLine = `NEO_WARRIOR_PRIVATE_KEY=${privateKey}\n`;

    try {
        await fs.appendFile(envPath, envLine);
    } catch {
        await fs.writeFile(envPath, envLine);
    }

    console.log(chalk.green(`✅ Warrior Awakened!`));
    console.log(chalk.yellow(`   mio-ID: `) + chalk.white(identity.id));
    console.log(chalk.yellow(`   Public Key: `) + chalk.white(identity.publicKey));
    console.log(chalk.gray(`\nIdentidade salva em: .neo-identities/mio-warrior.json`));
    console.log(chalk.gray(`Private Key adicionada ao .neo-identities/.env`));

    console.log(chalk.magenta(`\n⚔️ O momento está marcado. O Warrior agora possui sua própria chave. Ø`));
}

awakenWarrior().catch(console.error);
