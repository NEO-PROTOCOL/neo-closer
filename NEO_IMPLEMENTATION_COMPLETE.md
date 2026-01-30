<!-- markdownlint-disable MD003 MD007 MD013 MD022 MD023 MD025 MD029 MD032 MD033 MD034 -->

# NEO Protocol - Implementation Guide

```text
========================================
  NEO PROTOCOL IMPLEMENTATION GUIDE
========================================
[####] Phase: 1 Complete ........... OK
[####] Version: 1.0.0 .............. OK
[####] Status: Production Ready .... OK
========================================
```

────────────────────────────────────────
Quick Start
────────────────────────────────────────

**Requirements:**

- Node.js >= 20.x
- pnpm >= 8.x
- IPFS node (optional for testing)

**Installation:**

```bash
# Clone repository
git clone https://github.com/neomello/neobot
cd neobot

# Install dependencies
pnpm install

# Build
pnpm build

# Test NEO commands
pnpm moltbot neo:info
```

────────────────────────────────────────
CLI Commands
────────────────────────────────────────

```text
▓▓▓ NEO COMMANDS
────────────────────────────────────────
neo:info
  Display NEO Protocol information
  Usage: pnpm moltbot neo:info

neo:skill:publish <path>
  Publish skill to IPFS registry
  Usage: pnpm moltbot neo:skill:publish
    ./skills/my-skill

neo:skill:install <CID>
  Install skill from IPFS
  Usage: pnpm moltbot neo:skill:install
    QmXxx...

neo:skill:list
  List all available skills
  Usage: pnpm moltbot neo:skill:list

neo:index:create
  Create empty skills index
  Usage: pnpm moltbot neo:index:create
```

────────────────────────────────────────
IPFS Registry Setup
────────────────────────────────────────

**Start local IPFS node:**

```bash
# Using Docker
docker run -d --name ipfs \
  -p 5001:5001 -p 8080:8080 \
  ipfs/kubo:latest

# Or install locally
# See: https://docs.ipfs.tech/install/
```

**Configure NEO:**

```json
{
  "neo": {
    "ipfs": {
      "api": "http://127.0.0.1:5001"
    }
  }
}
```

**Test connection:**

```bash
pnpm moltbot neo:info
# Should show: IPFS Status: Connected
```

────────────────────────────────────────
Publishing Skills
────────────────────────────────────────

**Skill structure:**

```text
my-skill/
  └─ skill.json      (metadata)
  └─ index.ts        (entry point)
  └─ config.ts       (config)
  └─ SKILL.md        (docs)
```

**skill.json format:**

```json
{
  "id": "my-skill",
  "name": "My Skill",
  "version": "1.0.0",
  "description": "Skill description",
  "author": "your-name",
  "entryPoint": "index.ts",
  "config": "config.ts"
}
```

**Publish:**

```bash
pnpm moltbot neo:skill:publish \
  ./skills/my-skill

# Returns: QmXxx... (CID)
```

────────────────────────────────────────
Installing Skills
────────────────────────────────────────

**From IPFS CID:**

```bash
pnpm moltbot neo:skill:install \
  QmXxx...

# Installs to: ./skills/skill-name/
```

**List installed:**

```bash
pnpm moltbot neo:skill:list
```

────────────────────────────────────────
mio-system Identities
────────────────────────────────────────

**Generate identities:**

```bash
tsx scripts/generate-neo-identities.ts
```

**9 Official Identities:**

```text
[####] mio-orchestrator ............ OK
[####] mio-gateway ................. OK
[####] mio-skill-manager ........... OK
[####] mio-security ................ OK
[####] mio-analytics ............... OK
[####] mio-backup .................. OK
[####] mio-dev ..................... OK
[####] mio-prod .................... OK
[####] mio-audit ................... OK
```

**Files created:**

```text
.neo-identities/
  └─ mio-*.json (public metadata)
  └─ Private keys in iCloud Keychain
```

────────────────────────────────────────
Security & Backup
────────────────────────────────────────

**Backup private keys:**

```bash
cd .neo-identities
./backup-keys.sh

# Creates encrypted backup:
# neo-keys-backup-YYYYMMDD-HHMMSS.enc
```

**Store in iCloud Keychain:**

```bash
# Automatic via generate script
# Stored as: neo-mio-[identity-name]
```

**Recover keys:**

```bash
cd .neo-identities
./recover-from-keychain.sh
```

**Important:**

```text
[WARN] Never commit private keys
[WARN] Keep backups secure
[WARN] Use strong passwords
[WARN] Test recovery procedure
```

────────────────────────────────────────
API Reference
────────────────────────────────────────

**NEO Registry:**

```typescript
import { createNeoRegistry }
  from './neo/registry';

const registry = await createNeoRegistry({
  ipfsApi: 'http://127.0.0.1:5001'
});

// Publish
const cid = await registry.publish(path);

// Install
await registry.install(cid, targetDir);

// List
const skills = await registry.list();

// Search
const results = await registry.search(query);
```

**mio-system Identity:**

```typescript
import {
  createIdentity,
  signMessage,
  verifyIdentity
} from './neo/identity/mio-system';

// Create
const identity = await createIdentity({
  name: 'mio-custom',
  role: 'custom',
  permissions: { channels: ['*'] }
});

// Sign
const sig = await signMessage(
  identity,
  'message'
);

// Verify
const valid = await verifyIdentity(
  identity,
  sig,
  'message'
);
```

────────────────────────────────────────
Testing
────────────────────────────────────────

**Run tests:**

```bash
# All tests
pnpm test

# NEO-specific (when implemented)
pnpm test src/neo/
```

**Manual testing:**

```bash
# 1. Start IPFS
docker start ipfs

# 2. Check NEO info
pnpm moltbot neo:info

# 3. Publish test skill
pnpm moltbot neo:skill:publish \
  ./skills/neo-ipfs-status

# 4. Install from CID
pnpm moltbot neo:skill:install \
  <CID-from-step-3>

# 5. Verify
pnpm moltbot neo:skill:list
```

────────────────────────────────────────
Troubleshooting
────────────────────────────────────────

**IPFS connection failed:**

```text
[ERR ] IPFS API unreachable
[FIX ] Check IPFS node is running
[FIX ] Verify API endpoint
[FIX ] Check firewall/network
```

**Identity generation failed:**

```text
[ERR ] Key generation error
[FIX ] Check ethers.js installed
[FIX ] Verify write permissions
[FIX ] Check .neo-identities/ exists
```

**Skill publish failed:**

```text
[ERR ] Publish error
[FIX ] Check skill.json valid
[FIX ] Verify IPFS connection
[FIX ] Check file permissions
```

────────────────────────────────────────
Next Steps
────────────────────────────────────────

```text
▓▓▓ AFTER INSTALLATION
────────────────────────────────────────
└─ Generate identities
└─ Backup private keys
└─ Start IPFS node
└─ Test publish/install
└─ Read NEXT_STEPS_V2.md
```

────────────────────────────────────────
Documentation
────────────────────────────────────────

- NEO_PHASE1_SUCCESS.md
  Complete implementation report

- NEO_IDENTITIES_GENERATED.md
  Identity system guide

- NEXT_STEPS_V2.md
  Roadmap and future features

- .neo-identities/BACKUP_INSTRUCTIONS.md
  Security and backup guide

────────────────────────────────────────
Support
────────────────────────────────────────

- GitHub:
  <https://github.com/neomello/neobot>

- Documentation:
  <https://github.com/neomello/neobot/tree/main/docs>

- Issues:
  <https://github.com/neomello/neobot/issues>

```text
========================================
    NEO PROTOCOL READY TO USE
========================================
```

▓▓▓ NΞØ MELLØ
────────────────────────────────────────
Core Architect · NΞØ Protocol
neo@neoprotocol.space

"Code is law. Expand until
 chaos becomes protocol."

Security by design.
Exploits find no refuge here.
────────────────────────────────────────
