<!-- markdownlint-disable MD003 MD007 MD022 MD023 MD025 MD029 MD032 MD033 MD034 MD041 -->
```
░█▀█░█▀▀░█▀█░░░█▀█░█▀▄░█▀█░▀█▀░█▀█░█▀▀░█▀█░█░░
░█░█░█▀▀░█░█░░░█▀▀░█▀▄░█░█░░█░░█░█░█░░░█░█░█░░
░▀░▀░▀▀▀░▀▀▀░░░▀░░░▀░▀░▀▀▀░░▀░░▀▀▀░▀▀▀░▀▀▀░▀▀▀

```text
========================================================================
[####] Built on Moltbot ............................................ OK
[####] Web3 · Decentralized · Self-hosted .......................... OK
========================================================================
```

<p align="center">
  <img src="docs/assets/neobot-logo.png" alt="NEØ Protocol" width="400">
</p>

<p align="center">
  <a href="https://github.com/neomello/neobot/actions"><img src="https://img.shields.io/github/actions/workflow/status/neomello/neobot/ci.yml?branch=main&style=for-the-badge" alt="CI"></a>
  <a href="https://github.com/neomello/neobot/releases"><img src="https://img.shields.io/github/v/release/neomello/neobot?include_prereleases&style=for-the-badge" alt="Release"></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge" alt="MIT"></a>
  <a href="https://files.lighthouse.storage/?referBy=cf37bdc80bcf4ff2bd162671c3f6b3fa"><img src="https://img.shields.io/badge/Powered%20by-Lighthouse%20Storage-00D9FF?style=for-the-badge&logo=ipfs&logoColor=white" alt="Lighthouse Storage"></a>
</p>

```text
========================================================================
                         WHAT IS NEØ PROTOCOL?
========================================================================
```

NEØ.BOT is a decentralized AI assistant control plane that runs on
your infrastructure, with your rules, following Web3 principles.
A code managed by the NEØ protocol.

Born from Moltbot's industrial-grade foundation. Hybrid architecture:

```text
┌────────────────────────────────────────────────────────────────┐
│ ▓▓▓ STACK                                                      │
├────────────────────────────────────────────────────────────────┤
│ └─ 40% OpenClaw Core  → Gateway, channels, agent runtime       │
│ └─ 60% NEØ Layer    → IPFS, Web3 identity, self-hosted         │
└────────────────────────────────────────────────────────────────┘
```

Why it matters: traditional assistants lock you into centralized
platforms. NEØ gives you self-sovereignty, decentralization,
transparency, resilience, and privacy.

```text
========================================================================
                      RECOGNITION & FOUNDATION
========================================================================
```

We recognize Moltbot and Peter Steinberger for building the most
sophisticated AI assistant control plane. NEØ extends that foundation.

> "Moltbot gave us the engine. NEØ Protocol is breaking the speed
> limits."

```text
┌────────────────────────────────────────────────────────────────┐
│ ▓▓▓ FROM OPENCLAW/MOLTBOT                                      │
├────────────────────────────────────────────────────────────────┤
│ └─ Gateway (WebSocket), multi-channel (WhatsApp, Telegram, etc)│
│ └─ Pi agent runtime, security-first, health & Ledger           │
└────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────┐
│ ▓▓▓ NEØ ADDS                                                   │
├────────────────────────────────────────────────────────────────┤
│ └─ IPFS Skills Registry, mio-system Identity                   │
│ └─ Web3 Extensions (PubSub, Nostr, signer), NEØ Dashboard      │
│ └─ Lighthouse Storage (perpetual IPFS storage)                 │
└────────────────────────────────────────────────────────────────┘
```

```text
========================================================================
                    STORAGE PARTNERSHIP
========================================================================
```

NEØ Protocol uses **Lighthouse Storage** for decentralized, perpetual
IPFS storage. Lighthouse provides censorship-resistant, permanent storage
for our Skills Registry and content.

<a href="https://files.lighthouse.storage/?referBy=cf37bdc80bcf4ff2bd162671c3f6b3fa">
  <img src="https://img.shields.io/badge/Lighthouse%20Storage-Partner-00D9FF?style=flat-square&logo=ipfs&logoColor=white" alt="Lighthouse Storage Partner">
</a>

**Partner Code:** `cf37bdc80bcf4ff2bd162671c3f6b3fa`  
**Learn more:** [Lighthouse Storage](https://files.lighthouse.storage/?referBy=cf37bdc80bcf4ff2bd162671c3f6b3fa)

```text
========================================================================
                         CORE FEATURES (RESUMO)
========================================================================
```

- IPFS Skills Registry (content-addressed, verifiable, censorship-
  resistant) — Powered by [Lighthouse Storage](https://files.lighthouse.storage/?referBy=cf37bdc80bcf4ff2bd162671c3f6b3fa)
- mio-system Identity (9 core identities, Web3 signatures)
- Gateway Extensions (IPFS PubSub, Nostr, Web3 Signer)
- Moltbot Core (stable): channels, agent runtime, security, Ledger

Setup e comandos: ver [SETUP.md](SETUP.md).

```text
========================================================================
                    WHAT MAKES NEØ DIFFERENT?
========================================================================
```

- Hosting: your infrastructure (no vendor lock-in)
- Skills: IPFS decentralized (vs centralized)
- Identity: Web3 signatures (vs OAuth/API keys)
- Data: you own it; censorship-resistant; multi-node; open-source

Vision: decentralized AI mesh, federated learning, blockchain
integration, NFT-based skills, DAO governance. Phase 1 in progress.

```text
========================================================================
                      ARCHITECTURE OVERVIEW
========================================================================
```

```mermaid
graph TB
    subgraph NEOBOT["NEOBOT - OpenClaw Fork - Orchestrator"]
        CORE[Core: Gateway + Routing + Sessions]
        SKILLS[NEO Skills Manager]
        CLI[CLI Interface]
        LEDGER[Ledger/Audit Trail]
    end

    subgraph ACTIVE_SKILLS["Active Skills - Managed by NEO Skills Manager"]
        FC_SKILL[FlowCloser Skills]
        NOTION_SKILL[Notion Integration]
        WA_SKILL[WhatsApp Bot]
        TG_SKILL[Telegram Bot]
    end

    subgraph FLOWCLOSER["FLOWCLOSER - Lead Qualification System"]
        FC_AGENT[FlowCloser Agent]
        FC_INSTA[Instagram DM]
        FC_WA[WhatsApp API]
        FC_DB[SQLite + IPFS Storage]
    end

    subgraph REVENUE_CRITICAL["Revenue Critical - Generates Revenue"]
        FLOWPAY[FlowPay: PIX to Crypto Gateway]
        FLOWOFF[FlowOFF Agency: Client Acquisition]
        FACTORY[Smart Factory: Tokenization FaaS]
    end

    subgraph PRODUCTS["Monetizable Products"]
        WOD[WOD X PRO: Fitness + Blockchain]
        FLUXX[FLUXX DAO: Governance Platform]
    end

    subgraph BACKEND_FUTURE["Future - Sovereign Backend"]
        AGENT_FULL[AGENT-FULL: Sovereign Entity]
        KWIL[Kwil DB: Decentralized Memory]
        IPFS_STORE[IPFS/Storacha Storage]
    end

    subgraph PRODUCTIVITY["Mental Organization"]
        NOTION[Notion: Idea Capture]
        CONTENT[Content Machine Local]
    end

    %% Main Flow
    CORE --> SKILLS
    SKILLS --> ACTIVE_SKILLS
    
    %% FlowCloser connects to Neobot via Skills
    FC_SKILL -.->|HTTP API| FLOWCLOSER
    FC_INSTA --> FC_AGENT
    FC_WA --> FC_AGENT
    FC_AGENT --> FC_DB
    
    %% Revenue Flow - The Loop
    FLOWOFF -->|Qualified Leads| FLOWCLOSER
    FLOWCLOSER -->|Lead to Client| FLOWOFF
    FLOWOFF -->|Client Payment| FLOWPAY
    FLOWPAY -->|Unlock Access| FACTORY
    FLOWPAY -->|Unlock Access| WOD
    FLOWPAY -->|Unlock Access| FLUXX
    
    %% Factory creates tokens for products
    FACTORY -->|Create Contracts| WOD
    FACTORY -->|Create Contracts| FLUXX
    
    %% Productivity
    NOTION_SKILL -.->|Organize| NOTION
    NOTION -->|Structured Plan| FLOWOFF
    
    %% Active skills connect channels
    WA_SKILL -.-> FC_WA
    TG_SKILL -.-> TG_BOT[Telegram Bot]
    
    %% Future backend - not priority now
    AGENT_FULL -.->|Future Memory| KWIL
    AGENT_FULL -.->|Future Storage| IPFS_STORE
    
    %% Ledger records everything
    ACTIVE_SKILLS --> LEDGER
    
    classDef critical fill:#dc2626,stroke:#991b1b,stroke-width:3px,color:#fff
    classDef active fill:#16a34a,stroke:#15803d,stroke-width:2px,color:#fff
    classDef revenue fill:#ea580c,stroke:#c2410c,stroke-width:3px,color:#fff
    classDef future fill:#2563eb,stroke:#1e40af,stroke-width:2px,color:#fff,stroke-dasharray: 5 5
    classDef productivity fill:#9333ea,stroke:#7e22ce,stroke-width:2px,color:#fff
    
    class CORE critical
    class ACTIVE_SKILLS,FLOWCLOSER active
    class FLOWPAY,FLOWOFF,FACTORY revenue
    class AGENT_FULL,KWIL,IPFS_STORE future
    class NOTION,CONTENT productivity
```

```text
========================================================================
                         DOCUMENTATION
========================================================================
```

- **[SETUP.md](SETUP.md)** — Clone, install, comandos, contribuir
- **[ARCHITECTURE_NEO_PROTOCOL.md](ARCHITECTURE_NEO_PROTOCOL.md)** — Arquitetura completa
- **[NEXT_STEPS_V2.md](NEXT_STEPS_V2.md)** — Roadmap 8 semanas
- **[markdown-neo](.cursor/standards/markdown-neo.md)** — Padrão de escrita para docs

Upstream: <https://docs.molt.bot>

```text
========================================================================
                    COMMUNITY & ROADMAP (RESUMO)
========================================================================
```

- Twitter/X: @neoprotocol | Telegram: @neoprotocol
- Email: neo@neoprotocol.space | Site: neoprotocol.space (em breve)

Roadmap: Phase 1.0 IN PROGRESS (Foundation, Extensions, Docs, Release
v1.0.0). Detalhes em [NEXT_STEPS_V2.md](NEXT_STEPS_V2.md).

```text
========================================================================
                         LICENSE & DISCLAIMER
========================================================================
```

- Moltbot Core (src/): MIT (upstream)
- NEØ Layer (neo/, skills/, dashboard/): MIT

NEØ Protocol is in active development. Phase 1.0 expected completion
Feb 2026. Some features experimental. Production use at your own risk
until v1.0.0.

```text
========================================================================
                           CALL TO ACTION
========================================================================
```

Star the repo · Read [SETUP.md](SETUP.md) to run locally · Check
[ARCHITECTURE_NEO_PROTOCOL.md](ARCHITECTURE_NEO_PROTOCOL.md) · Join
community for updates.

```

```text
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│       █                                                         │
│   ▄███     NΞØ MELLØ                                            │
│  █  █ █    Core Architect · NΞØ Protocol                        │
│  █ █  █    neo@neoprotocol.space                                │
│   ███▀                                                          │
│  █                                                              │
│     "Code is law. Expand until chaos becomes protocol."         │
│                                                                 │
│     Security by design. Exploits find no refuge here.           │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```