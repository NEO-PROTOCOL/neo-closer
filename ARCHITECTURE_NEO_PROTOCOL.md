# 🏗️ NEØ PROTOCOL · Arquitetura Unificada

**Versão:** 2.0  
**Data:** 29 Janeiro 2026  
**Status:** 🟢 Definição Estratégica Completa

---

## 📖 Índice

1. [Visão Geral](#visão-geral)
2. [Filosofia do Protocolo](#filosofia-do-protocolo)
3. [Arquitetura em 5 Camadas](#arquitetura-em-5-camadas)
4. [Mapeamento de Repositórios](#mapeamento-de-repositórios)
5. [Fluxos de Integração](#fluxos-de-integração)
6. [Stack Tecnológica](#stack-tecnológica)
7. [Decisões Arquiteturais](#decisões-arquiteturais)
8. [Roadmap de Implementação](#roadmap-de-implementação)

---

## 🎯 Visão Geral

O **NEØ Protocol** é um ecossistema modular de agentes autônomos, conectividade descentralizada e governança de conteúdo. Ele integra 5 projetos complementares em uma arquitetura coesa que vai desde conectividade básica até inteligência soberana.

### Objetivo Central

> **"Construir um sistema autônomo que possa pensar (neo-agent), agir (neobot), conectar (flowcloser), orquestrar (nodemello), e visualizar (dashboard) - com memória permanente e identidade soberana."**

---

## 🧠 Filosofia do Protocolo

### Princípios Fundamentais

1. **Modularidade**: Cada componente é independente mas interoperável
2. **Soberania**: Memória descentralizada, identidade própria (DID), zero censura
3. **Antifragilidade**: Se uma camada falha, as outras continuam operando
4. **Web3 Native**: Kwil, Ceramic, IPFS, GUN.js como base
5. **Transparência**: Ledger auditável de todas as ações

### Inspiração

- **"Se o processo morre, a memória deve permanecer"** → Ceramic + IPFS
- **"Agentes não são fantasmas"** → Identidade persistente via DID
- **"Nós orquestramos sistemas, não criamos conteúdo"** → State machines

---

## 🏗️ Arquitetura em 5 Camadas

```
┌─────────────────────────────────────────────────────────────────────┐
│                     CAMADA 5: INTERFACE                              │
│  ┌───────────────────────┐         ┌──────────────────────┐          │
│  │  neo-agent-dashboard  │◄───────►│  Neobot Dashboard    │          │
│  │  (Next.js)            │         │  (iOS-style UI)      │          │
│  │  Monitoring & Control │         │  Glassmorphic Bento  │          │
│  └───────────────────────┘         └──────────────────────┘          │
│         │                                     │                      │
│         └──────────────┬──────────────────────┘                      │
└────────────────────────┼────────────────────────────────────────────┘
                         │
┌────────────────────────┼────────────────────────────────────────────┐
│              CAMADA 4: ORQUESTRAÇÃO                                  │
│  ┌──────────────────────▼───────────────────────────────┐            │
│  │         neoflowoff-nodemello.run                     │            │
│  │         Content Engine + State Machine               │            │
│  │  ┌──────────────────────────────────────────────┐    │            │
│  │  │ • Content Contracts (Editorial Intent)       │    │            │
│  │  │ • State Machine: DRAFT → WAITING_HUMAN →     │    │            │
│  │  │                  APPROVED → SCHEDULED →      │    │            │
│  │  │                  POSTED → ARCHIVED           │    │            │
│  │  │ • Multi-platform Publishing (X, Instagram)   │    │            │
│  │  │ • Asset Management (Images + Prompts)        │    │            │
│  │  └──────────────────────────────────────────────┘    │            │
│  └──────────────────────────────────────────────────────┘            │
└────────────────────────┬────────────────────────────────────────────┘
                         │
┌────────────────────────┼────────────────────────────────────────────┐
│           CAMADA 3: AGENTE AUTÔNOMO (CÉREBRO)                        │
│  ┌──────────────────────▼───────────────────────────────┐            │
│  │              neo-agent-full                          │            │
│  │          Sovereign Entity Architecture               │            │
│  │  ┌──────────────────────────────────────────────┐    │            │
│  │  │ 🧠 THE BRAIN                                 │    │            │
│  │  │   • LangGraph ReAct (Cognitive Reasoning)    │   │            │
│  │  │   • Gemini 1.5 (LLM)                         │   │            │
│  │  │   • Tool Use & Planning                      │   │            │
│  │  │                                               │   │            │
│  │  │ 💾 THE MEMORY                                 │   │            │
│  │  │   • Kwil DB (Decentralized SQL - Warm)       │   │            │
│  │  │   • GUN DB (P2P Real-time Sync - Hot)        │   │            │
│  │  │   • IPFS (Permanent Storage - Cold)          │   │            │
│  │  │                                               │   │            │
│  │  │ 🔐 THE SOUL                                   │   │            │
│  │  │   • Ceramic Network (DID)                    │   │            │
│  │  │   • Verifiable Identity                      │   │            │
│  │  │   • Immutable Logs                           │   │            │
│  │  │                                               │   │            │
│  │  │ 🤲 THE HANDS                                  │   │            │
│  │  │   • MCP (Model Context Protocol)             │   │            │
│  │  │   • Read: GitHub, Web (Brave), Docs          │   │            │
│  │  │   • Write: Twitter, DB, Decentralized Logs   │   │            │
│  │  └──────────────────────────────────────────────┘   │            │
│  └──────────────────────────────────────────────────────┘            │
└────────────────────────┬────────────────────────────────────────────┘
                         │
┌────────────────────────┼────────────────────────────────────────────┐
│         CAMADA 2: TOOLKIT OPERACIONAL (MÃOS)                         │
│  ┌──────────────────────▼───────────────────────────────┐            │
│  │                    Neobot                            │            │
│  │          CLI Toolkit + Skills System                 │            │
│  │  ┌──────────────────────────────────────────────┐   │            │
│  │  │ ⚡ SKILLS SYSTEM (Extensível)                 │   │            │
│  │  │   • reminders/ (Lembretes)                   │   │            │
│  │  │   • notion/ (Integração Notion)              │   │            │
│  │  │   • telegram/ (Bot Telegram)                 │   │            │
│  │  │   • ai/ (Claude, Gemini)                     │   │            │
│  │  │   • github/ (Git operations)                 │   │            │
│  │  │   • 70+ skills disponíveis                   │   │            │
│  │  │                                               │   │            │
│  │  │ 🏥 INFRASTRUCTURE                             │   │            │
│  │  │   • Health checks                            │   │            │
│  │  │   • Ledger/Audit (actor + channel)           │   │            │
│  │  │   • Scheduler (cron jobs)                    │   │            │
│  │  │   • Runner (background tasks)                │   │            │
│  │  │                                               │   │            │
│  │  │ 🌉 GATEWAY                                    │   │            │
│  │  │   • MCP Server                               │   │            │
│  │  │   • Tools Invocation                         │   │            │
│  │  │   • Protocol Bridge                          │   │            │
│  │  └──────────────────────────────────────────────┘   │            │
│  └──────────────────────────────────────────────────────┘            │
└────────────────────────┬────────────────────────────────────────────┘
                         │
┌────────────────────────┼────────────────────────────────────────────┐
│           CAMADA 1: CONECTIVIDADE (CANAIS)                           │
│  ┌──────────────────────▼───────────────────────────────┐            │
│  │  ┌──────────────────┐         ┌──────────────────┐   │            │
│  │  │ FlowCloser-      │◄───────►│ Telegram         │   │            │
│  │  │ EVOLUTION        │         │ (Neobot Skills)  │   │            │
│  │  │                  │         │                  │   │            │
│  │  │ • WhatsApp API   │         │ • Bot Commands   │   │            │
│  │  │ • Baileys        │         │ • Notifications  │   │            │
│  │  │ • Business API   │         │ • Interactions   │   │            │
│  │  └──────────────────┘         └──────────────────┘   │            │
│  │         │                              │              │            │
│  │         ├──────────────────────────────┘              │            │
│  │         │                                             │            │
│  │         ▼                                             │            │
│  │  ┌─────────────────────────────────────────────┐     │            │
│  │  │ EXTERNAL INTEGRATIONS                       │     │            │
│  │  │  • Typebot (Conversational Bots)            │     │            │
│  │  │  • Chatwoot (Customer Service)              │     │            │
│  │  │  • Dify AI (Trigger Management)             │     │            │
│  │  │  • OpenAI (Audio-to-Text)                   │     │            │
│  │  └─────────────────────────────────────────────┘     │            │
│  │                                                       │            │
│  │  ┌─────────────────────────────────────────────┐     │            │
│  │  │ WEB3 CONNECTIVITY                           │     │            │
│  │  │  • Kwil DB (Decentralized SQL)              │     │            │
│  │  │  • Ceramic (DID + Logs)                     │     │            │
│  │  │  • The Graph (Indexing)                     │     │            │
│  │  │  • Gun.js (P2P Sync)                        │     │            │
│  │  │  • IPFS (Distributed Storage)               │     │            │
│  │  │    - Peer ID: 12D3KooWBSy5SgGEgnSboE6Kqg...│     │            │
│  │  │    - Agent: kubo v0.39.0 desktop           │     │            │
│  │  └─────────────────────────────────────────────┘     │            │
│  └───────────────────────────────────────────────────────┘            │
└──────────────────────────────────────────────────────────────────────┘
```

### Camada Valor & Token (Transversal)

```
┌──────────────────────────────────────────────────────────────────────┐
│ 🔶 VALOR & TOKEN LAYER                                               │
│  ┌───────────────────────────────────────────────────────────────┐   │
│  │  NEØ SMART FACTORY (Neural Core V2)                          │   │
│  │  ┌─────────────────────────────────────────────────────────┐ │   │
│  │  │ smart-core                                              │ │   │
│  │  │  • NeoTokenV2 (ERC20Permit, Gasless, Bridgeable)       │ │   │
│  │  │  • NeoSmartFactory (ERC20/721/Vesting/Rewards)         │ │   │
│  │  │  • TON Jetton (Tact - TEP-74 compliant)                │ │   │
│  │  │  • Circuit Breaker (Guardian Role)                      │ │   │
│  │  │  • Manual Bridge (Base ↔ Polygon ↔ TON)                │ │   │
│  │  │  Redes: Base, Polygon, TON                             │ │   │
│  │  └─────────────────────────────────────────────────────────┘ │   │
│  │  ┌─────────────────────────────────────────────────────────┐ │   │
│  │  │ FlowPay Gateway                                         │ │   │
│  │  │  • PIX → $NEOFLW (Base L2)                             │ │   │
│  │  │  • PIX → USDC (Base L2)                                │ │   │
│  │  │  • Webhook confirmação bancária                         │ │   │
│  │  │  • KYC flow (opcional)                                  │ │   │
│  │  │  • Smart contract integration                           │ │   │
│  │  │  Local: /Users/nettomello/CODIGOS/flowpay/            │ │   │
│  │  └─────────────────────────────────────────────────────────┘ │   │
│  │  ┌─────────────────────────────────────────────────────────┐ │   │
│  │  │ MiniApp Telegram                                        │ │   │
│  │  │  • Compra de $NEOFLW via PIX                           │ │   │
│  │  │  • Wallet abstraction (SmartWallets)                    │ │   │
│  │  │  • Rewards & Loyalty distribution                       │ │   │
│  │  │  • SDR automation via WhatsApp                          │ │   │
│  │  │  Local: /Users/nettomello/CODIGOS/GAMES/smart-ui-mobile/ │ │ │
│  │  └─────────────────────────────────────────────────────────┘ │   │
│  └───────────────────────────────────────────────────────────────┘   │
│                                                                       │
│  Token: $NEOFLW / $Ne/SNT                                            │
│  • Symbol: NEOFLW                                                     │
│  • Type: Utility + Governance                                         │
│  • Networks: Base (primary), Polygon, TON                             │
│  • Use cases: Payments, Staking, DAO governance, Cross-chain bridge  │
└──────────────────────────────────────────────────────────────────────┘
```

---

## 🗂️ Mapeamento de Repositórios

### Tabela de Projetos

| Repositório | Camada | Função | Stack Principal | Status |
|-------------|--------|--------|-----------------|--------|
| **FlowCloser-EVOLUTION** | 1 - Conectividade | External Services Bridge (Typebot, Chatwoot, Dify, OpenAI) | Baileys, Evolution API, Web3 | 🟢 Ativo (Railway) |
| **Neobot** | 2 - Toolkit | Skills operacionais, CLI, automações, WhatsApp nativo (Baileys) | TypeScript, Skills, MCP Server | 🟢 Ativo |
| **neo-agent-full** | 3 - Cérebro | Raciocínio, memória soberana, identidade | LangGraph, Kwil, Ceramic, IPFS, GUN | 🟢 Ativo |
| **neoflowoff-nodemello.run** | 4 - Orquestração | Content State Machine, governança editorial | Node.js, State Machines, Contracts | 🟢 Ativo |
| **neo-agent-dashboard** | 5 - Interface | Monitoramento e controle | Next.js, React | 🟡 Em desenvolvimento |
| **Neobot Dashboard** | 5 - Interface | Dashboard operacional iOS-style | HTML, CSS, JS (Glassmorphic) | 🟢 Ativo |
| **NEØ Smart Factory (5 repos)** | Valor & Token | Tokenização multi-chain, contratos inteligentes | Solidity, Tact, Hardhat, TON | 🟡 Pré-lançamento |
| └─ **smart-core** | - | Contratos (ERC20, ERC721, Jetton, Bridge) | Solidity, Tact (TON) | 🟢 v0.5.3 |
| └─ **smart-ui** | - | Frontend de vendas $NEOFLW | Vue.js, Vite | ⚫ Pausado |
| └─ **smart-ui-landing** | - | Landing page para tráfego pago | React, Vite, Tailwind | ⚫ Pausado |
| └─ **smart-cli** | - | CLI para deploy/mint/bridge | Node.js, Commander | 🟢 Ativo |
| └─ **docs** | - | Documentação completa + Manifesto | Markdown, Slides (PDF) | 🟢 Ativo |
| **FlowPay** | Valor & Token | Gateway PIX → $NEOFLW/USDC (Base L2) | Astro, Node.js, Smart Contracts | 🟡 Em desenvolvimento |
| **MiniApp (Telegram)** | Interface | MiniApp Telegram para Smart Factory | Vue.js, Telegram SDK | 🟡 Estrutura básica |
| **mio-system** | Camada 0 | Sistema de identidades para multi-agent coordination | Shell scripts, Markdown | 🟢 Ativo |

### Dependências entre Projetos

```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│  neo-agent-dashboard ──┐                                │
│                        ├──► neo-agent-full              │
│  Neobot Dashboard ─────┘                                │
│                                    │                    │
│                                    ▼                    │
│  neoflowoff-nodemello.run ────► Neobot                  │
│                                    │                    │
│                                    ▼                    │
│  FlowCloser-EVOLUTION ────────► Telegram (Neobot)      │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

## 🔄 Fluxos de Integração

### Fluxo 1: Criação de Conteúdo Autônomo

```
1. neo-agent-full (LangGraph) decide criar um post
   │
   ├──► Consulta memória (Kwil DB)
   ├──► Raciocina sobre contexto
   └──► Gera rascunho de texto
   │
2. Envia para neoflowoff-nodemello.run
   │
   ├──► State: DRAFT
   ├──► Valida contra Content Contract
   └──► State: WAITING_HUMAN
   │
3. Humano aprova via CLI ou Dashboard
   │
   ├──► npm run content:approve
   └──► State: APPROVED
   │
4. Agenda publicação
   │
   ├──► State: SCHEDULED
   ├──► Gera imagem (via prompt AI)
   └──► State: READY
   │
5. Publica via FlowCloser ou APIs diretas
   │
   ├──► WhatsApp (FlowCloser)
   ├──► Twitter (X API)
   ├──► Instagram (Meta API)
   └──► State: POSTED
   │
6. Registra resultado em Ceramic + IPFS
   │
   ├──► Snapshot permanente
   ├──► Atualiza DID logs
   └──► Synca com GUN DB
```

### Fluxo 2: Comando via Telegram

```
Usuário: /log NodeMello "Finalizei integração"
   │
   ├──► Telegram Bot (Neobot skill)
   │      │
   │      ├──► Autentica usuário
   │      └──► Valida comando
   │
   ├──► Neobot CLI (src/cli/)
   │      │
   │      ├──► Skill: notion/commands/log.ts
   │      ├──► Ledger: Registra (actor: user, channel: telegram)
   │      └──► Valida projeto existe
   │
   ├──► Notion MCP
   │      │
   │      └──► notion-create-pages
   │
   └──► Resposta ao Telegram
          ├──► "✅ Work Log criado!"
          └──► Link do Notion
```

### Fluxo 3: Decisão Estratégica com IA

```
Situação: "Decidir entre ASi1 vs LangChain para neo-one"
   │
1. Usuário consulta Dashboard
   │
   ├──► Dashboard lista decisão pendente
   └──► "🤖 Escolher engine de agentes (Prazo: 15 Fev)"
   │
2. Usuário pede análise ao neo-agent-full
   │
   ├──► Dashboard → neo-agent-full API
   │      │
   │      ├──► LangGraph ReAct Planning
   │      ├──► Consulta: GitHub, Docs, Memória
   │      └──► Reasoning: Prós/Contras
   │
   └──► Retorna análise estruturada
   │
3. Humano decide e registra no Notion
   │
   ├──► Neobot CLI: notion update
   ├──► Status: ⏳ Pendente → ✅ Decidido
   └──► Opção escolhida documentada
   │
4. neo-agent-full persiste decisão
   │
   ├──► Kwil DB (queryable)
   ├──► Ceramic (immutable log)
   └──► IPFS (snapshot)
```

---

## 🛠️ Stack Tecnológica

### Por Camada

| Camada | Tecnologias |
|--------|-------------|
| **5 - Interface** | Next.js, React, TypeScript, Vue.js (MiniApp), Glassmorphic CSS, iOS Design |
| **4 - Orquestração** | Node.js, State Machines, JSON Contracts, Cron, Metamodels |
| **3 - Cérebro** | LangGraph, Gemini 1.5, Claude, ASI1 (opcional), Kwil, Ceramic, IPFS, GUN.js, MCP |
| **2 - Toolkit** | TypeScript, Node.js, Skills (70+), CLI, Express, Telegram Bot, WhatsApp (Baileys nativo) |
| **1 - Conectividade** | Baileys (Neobot WhatsApp), Evolution API (FlowCloser), Telegram grammY, Web3 Stack |
| **Valor & Token** | Solidity, Tact (TON), Hardhat, Astro (FlowPay), OpenZeppelin, Circuit Breaker |
| **0 - Identidade** | Shell scripts, Git-based documentation, Markdown (mio-system) |

### Stack Web3 (Transversal)

- **Identidade:** Ceramic DID
- **Storage:** IPFS (Storacha/w3up) - **Node ativo local** (kubo v0.39.0)
  - **Peer ID:** `12D3KooWBSy5SgGEgnSboE6Kqg3GaRe8aKF7YLqcJfHPaRLRXBSX`
- **Database:** Kwil (Decentralized SQL)
- **Real-time:** GUN.js (P2P Graph)
- **Indexing:** The Graph
- **Smart Contracts:** Base (L2), Polygon, TON
- **Tokens:** $NEOFLW (ERC20Permit, TEP-74 Jetton)

---

## 🎯 Decisões Arquiteturais

### 1. Por que 5 Camadas?

**Separação de Responsabilidades:**
- Cada camada pode falhar sem derrubar o sistema completo
- Modularidade permite evolução independente
- Facilita onboarding de novos devs (cada um pode focar em uma camada)

### 2. neo-agent-full vs. Neobot: Clarificação

| Aspecto | neo-agent-full | Neobot |
|---------|----------------|--------|
| **Propósito** | Cérebro (raciocínio complexo) | Mãos (execução operacional) |
| **Decisões** | Autônomas (LangGraph ReAct) | Baseadas em regras (Skills) |
| **Memória** | Descentralizada (Kwil, IPFS, Ceramic) | Local + Ledger |
| **Identidade** | DID (Ceramic) | N/A (usa DID do agente) |
| **Uso** | "Decidir qual conteúdo criar" | "Executar: postar, lembrar, notificar" |

**Integração:**
- Neobot **chama** neo-agent-full quando precisa de "decisão inteligente"
- neo-agent-full **usa** Neobot skills para executar ações

### 3. neoflowoff-nodemello.run: Orquestrador ou Skill?

**Decisão: Orquestrador Standalone (Camada 4)**

**Razões:**
1. State Machine é complexa demais para ser uma skill
2. Content Contracts são metamodelos que precisam de engine própria
3. Governança editorial requer UI dedicada (npm run content:approve)
4. Pode orquestrar múltiplos agentes (neo-agent-full + outros)

**Integração:**
- neo-agent-full gera conteúdo → envia para NodeMello
- NodeMello gerencia estado → publica via FlowCloser/APIs
- Neobot pode ter skill "content-status" que consulta NodeMello

### 4. FlowCloser: Dentro ou Fora?

**Decisão: Camada 1 (Conectividade)**

**Razões:**
1. FlowCloser é **ponte de conectividade**, não toolkit
2. Faz mais sentido ao lado de Telegram como "canais de comunicação"
3. Já tem stack web3 própria (Kwil, Ceramic, The Graph, Gun.js)

**Nota:** FlowCloser pode ser **opcional** se o foco for só Telegram

### 5. Dashboards: Um ou Dois?

**Decisão: Manter 2 Dashboards Especializados (Por Ora)**

**Razões:**
1. **neo-agent-dashboard** → Focado em monitorar **neo-agent-full** (memória, DID, IPFS)
2. **Neobot Dashboard** → Focado em **operações diárias** (skills, health, automações)

**Roadmap Futuro:** Unificar em um único dashboard modular

---

## 🚀 Roadmap de Implementação

### Fase 0: Base Já Viva (AGORA - Jan 2026)

✅ **Status Atual:**

- [x] FlowCloser-EVOLUTION ativo no Railway (External Services Bridge)
- [x] Neobot operacional (70+ skills, WhatsApp nativo via Baileys)
- [x] neoflowoff-nodemello.run funcionando (Content State Machine)
- [x] neo-agent-full com stack web3 (LangGraph, Kwil, Ceramic, GUN, IPFS)
- [x] Neobot Dashboard funcional (Glassmorphic iOS-style)
- [x] NEØ Smart Factory v0.5.3-neural-core (contratos prontos)
  - [x] smart-core (EVM: Solidity + TON: Tact)
  - [x] smart-cli (deploy automation)
  - [x] docs (Manifesto, Architecture, Protocol Evolution 2026)
- [x] FlowPay local (208 arquivos Astro, aguardando integração bancária)
- [x] MiniApp Telegram (estrutura básica Vue.js)
- [x] IPFS node ativo local (Peer ID: 12D3KooWBSy5SgGEgnSboE6Kqg3GaRe8aKF7YLqcJfHPaRLRXBSX)
- [x] mio-system (identity registry para multi-agent coordination)
- [x] Notion Command Center (5 camadas, UCs mapeados, Smart Factory documentada)

### Fase 0.1: Consolidação (Próximos 7 dias - Fev 2026)

**Objetivo:** Ativar componentes essenciais e auditar estrutura local

- [ ] **Ativar WhatsApp no Neobot**
  - Executar: `moltbot channels login --channel whatsapp`
  - Número: +5562983231110
  - Testar comandos: `/log`, `/task`, `/status`, `/projetos`

- [ ] **Validar ASI1 API**
  - Obter documentação e endpoint correto
  - Testar integração com neo-agent-full
  - Comparar performance vs Gemini 1.5

- [ ] **Auditar pastas locais**
  - FlowPay (208 arquivos) → Documentar estrutura e dependências
  - evolution-api vs FlowCloser → Decidir qual usar
  - ceo-escalavel-miniapp vs smart-ui-mobile → Consolidar ou separar
  - Contrato_Token_Smart_Padrao_22_dez → Migrar docs úteis para smart-factory

- [ ] **Registrar identidades no mio-system**
  - neo-agent-full (agent/cerebro)
  - Neobot (agent/toolkit)
  - NodeMello (platform/orchestrator)
  - FlowCloser (connector/whatsapp)
  - Smart Factory (platform/tokenization)

### Fase 1: Integração Básica (Fev 2026)

**Objetivo:** Conectar neo-agent-full com Neobot

- [ ] **Task 1.1:** Criar skill `neo-agent/` no Neobot
  - `skills/neo-agent/query.ts` (consultar memória)
  - `skills/neo-agent/decide.ts` (pedir decisão)
  - `skills/neo-agent/persist.ts` (salvar no Kwil/Ceramic)

- [ ] **Task 1.2:** Criar skills `smart-factory/` no Neobot
  - `skills/smart-factory/deploy.ts` (deploy contratos)
  - `skills/smart-factory/mint.ts` (mint tokens)
  - `skills/smart-factory/bridge.ts` (cross-chain bridge)
  - `skills/smart-factory/status.ts` (check deployments)

- [ ] **Task 1.3:** Criar skills `flowpay/` no Neobot
  - `skills/flowpay/buy.ts` (iniciar compra PIX)
  - `skills/flowpay/status.ts` (checar transação)

- [ ] **Task 1.4:** neo-agent-full expor API REST
  - `POST /agent/reason` (LangGraph ReAct)
  - `GET /agent/memory/{query}` (Kwil query)
  - `POST /agent/log` (Ceramic append)

- [ ] **Task 1.5:** Neobot CLI comandos de integração
  - `moltbot agent query "Qual o status do NodeMello?"`
  - `moltbot agent decide "Qual LLM usar?"`
  - `moltbot factory deploy --network base`
  - `moltbot flowpay buy --amount 100 --token NEOFLW`

### Fase 2: Orquestração de Conteúdo (Mar 2026)

**Objetivo:** NodeMello.run integrado com neo-agent-full

- [ ] **Task 2.1:** neo-agent-full gera content drafts
  - LangGraph cria plano de conteúdo
  - Envia para NodeMello via API

- [ ] **Task 2.2:** NodeMello State Machine
  - Recebe drafts do agente
  - Workflow: DRAFT → WAITING_HUMAN → APPROVED → POSTED

- [ ] **Task 2.3:** Publicação multi-canal
  - NodeMello → FlowCloser (WhatsApp)
  - NodeMello → Twitter API (X)
  - NodeMello → Instagram API

### Fase 3: Dashboard Unificado (Abr 2026)

**Objetivo:** Interface única de monitoramento

- [ ] **Task 3.1:** Merge dos dashboards
  - Migrar Neobot Dashboard para Next.js
  - Integrar views do neo-agent-dashboard

- [ ] **Task 3.2:** Real-time monitoring
  - WebSocket para updates ao vivo
  - GUN.js sync para multi-device

- [ ] **Task 3.3:** Mobile-first design
  - iOS-style mantido
  - PWA para uso em mobile

### Fase 4: Autonomia Completa (Mai 2026)

**Objetivo:** Agente totalmente autônomo

- [ ] **Task 4.1:** Loop autônomo
  - neo-agent-full decide quando criar conteúdo
  - NodeMello aprova automaticamente (se score alto)
  - Publica sem intervenção humana

- [ ] **Task 4.2:** Self-healing
  - Health checks automáticos
  - Restart automático de componentes

- [ ] **Task 4.3:** Multi-agent coordination
  - Vários neo-agent-full trabalhando juntos
  - Consenso via Kwil DB

### Fase 5: Expansão (Jun 2026+)

- [ ] Instagram/Messenger via FlowCloser
- [ ] Integração completa com Notion (via MCP)
- [ ] Voice interface (Telegram Voice → OpenAI Whisper)
- [ ] Mobile apps (iOS/Android)

---

## 📁 Estrutura Local do Projeto

### Localização dos Repos

| Projeto | Caminho Local | Status |
|---------|---------------|--------|
| **Neobot** | `/Users/nettomello/CODIGOS/neobot/` | ✅ Ativo (repo atual) |
| **FlowPay** | `/Users/nettomello/CODIGOS/flowpay/` | ✅ 208 arquivos (Astro) |
| **neo-smart-token** | `/Users/nettomello/CODIGOS/neo-smart-token/` | ✅ Estrutura completa |
| └─ smart-core | `/Users/nettomello/CODIGOS/neo-smart-token/smart-core/` | ✅ Contratos + deploy |
| └─ smart-cli | `/Users/nettomello/CODIGOS/neo-smart-token/smart-cli/` | ✅ CLI tools |
| └─ smart-ui-landing | `/Users/nettomello/CODIGOS/neo-smart-token/smart-ui-landing/` | ✅ Landing page |
| └─ docs | `/Users/nettomello/CODIGOS/neo-smart-token/docs/` | ✅ 60 arquivos MD + slides PDF |
| **MiniApp Telegram** | `/Users/nettomello/CODIGOS/GAMES/smart-ui-mobile/` | ✅ Vue.js structure |
| **FlowCloser** | Evolution API (Railway) | ✅ Deploy remoto |
| **mio-system** | [github.com/neomello/mio-system](https://github.com/neomello/mio-system) | ✅ Identity registry |

### Projetos Auxiliares (Para Auditoria)

| Pasta | Descrição | Arquivos | Ação Necessária |
|-------|-----------|----------|-----------------|
| `evolution-api/` | WhatsApp API alternativa | 105 (73 TS) | 🔍 Avaliar vs FlowCloser |
| `neo-ig-cli/` | Instagram CLI automation | 75+ | 🔍 Integrar com NodeMello? |
| `Contrato_Token_Smart_Padrao_22_dez/` | Token ERC20 legacy | Docs extensos | 📦 Migrar docs úteis |
| `ceo-escalavel-miniapp/` | MiniApp antigo | 96 (20 TSX) | 🔍 Overlap com smart-ui-mobile? |
| `blockchain/` | Estudos e referências | 241 arquivos | 📚 Manter como ref |
| `mcp-server-0.11.0/` | Blockscout MCP server | Python | ✅ Funcional |

---

## 📊 Métricas de Sucesso

### KPIs por Camada

| Camada | Métrica | Target |
|--------|---------|--------|
| **1 - Conectividade** | Mensagens processadas/dia | 1000+ |
| **2 - Toolkit** | Skills executadas/dia | 50+ |
| **3 - Cérebro** | Decisões autônomas/semana | 10+ |
| **4 - Orquestração** | Posts aprovados/semana | 20+ |
| **5 - Interface** | Tempo médio de resposta | <500ms |

### KPIs Gerais

- **Uptime:** >99%
- **Latência P95:** <1s
- **Storage (IPFS):** Crescimento controlado <10GB/mês
- **DID logs:** 100% das ações críticas registradas

---

## 🔐 Segurança e Governança

### Ledger/Audit Trail

Toda ação crítica é registrada em 3 camadas:

1. **Local (Neobot):** `src/infra/ledger.ts`
   - Actor (user, cron, agent)
   - Channel (cli, telegram, api)
   - Timestamp + payload

2. **Descentralizado (Kwil DB):**
   - SQL queryable
   - Replicado em múltiplos nós

3. **Imutável (Ceramic):**
   - DID-signed logs
   - Verificável por terceiros

### Controle de Acesso

```typescript
// Exemplo: Apenas agente pode aprovar conteúdo automaticamente
if (actor === 'agent' && confidence_score > 0.9) {
  state = 'APPROVED';
} else {
  state = 'WAITING_HUMAN';
}
```

---

## 🧪 Testes e Validação

### Estratégia de Testes

| Tipo | Ferramenta | Coverage Target |
|------|------------|-----------------|
| Unit | Vitest | >70% |
| Integration | Playwright | Fluxos críticos |
| E2E | Cypress | User journeys |
| Load | k6 | 100 req/s |

### Ambientes

- **Local:** Docker Compose (todos os serviços)
- **Staging:** Testnet (Kwil, Ceramic)
- **Production:** Mainnet (custos reais)

---

## 📚 Documentação Adicional

### Por Projeto

- **FlowCloser-EVOLUTION:** Ver `COMO-USAR-WHATSAPP.md`
- **Neobot:** Ver `ARCHITECTURE.md` (atual)
- **neo-agent-full:** Ver `docs/SETUP.md`
- **neoflowoff-nodemello.run:** Ver `README.md`
- **neo-agent-dashboard:** Ver `README.md`

### Guias de Integração

- `INTEGRATION_GUIDE_NEO_AGENT.md` (a criar)
- `INTEGRATION_GUIDE_NODEMELLO.md` (a criar)
- `INTEGRATION_GUIDE_FLOWCLOSER.md` (a criar)

---

## 🤝 Contribuindo

### Onde Contribuir?

- **Camada 1:** Se você trabalha com APIs de messaging (WhatsApp, Telegram)
- **Camada 2:** Se você cria skills/tools operacionais
- **Camada 3:** Se você entende LLMs, web3, ou distributed systems
- **Camada 4:** Se você trabalha com state machines ou CMS
- **Camada 5:** Se você é frontend dev (Next.js, React)

### Princípios de Contribuição

1. **Modularidade:** Cada PR deve ser uma unidade isolada
2. **Testes:** Coverage >70% para código crítico
3. **Docs:** Atualizar este documento se mudar arquitetura
4. **Ledger:** Toda ação deve ser auditável

---

## 🔮 Visão de Longo Prazo (2027+)

### NEØ Protocol como Protocolo Aberto

1. **Spec Pública:** Qualquer um pode implementar um "NEØ-compatible agent"
2. **Multi-Agent Network:** Agentes de diferentes pessoas se comunicando via Ceramic
3. **Marketplace de Skills:** Neobot skills como plugins pagos
4. **DAO Governance:** Decisões do protocolo via token holders

### "Agentes Soberanos"

> **"No futuro, cada pessoa terá seu próprio agente NEØ, com memória permanente e identidade verificável, que pode negociar e agir em seu nome 24/7."**

---

## 📞 Contato e Suporte

- **Email:** neo@neoprotocol.space
- **X (Twitter):** @node_mello
- **Instagram:** @neoprotocol.eth
- **Ethereum:** neomello.eth
- **Notion:** [NEØ Command Center](https://www.notion.so/2f78c6e83be081af880edd88440a4642)

---

**Última Atualização:** 29 Janeiro 2026  
**Versão:** 2.0  
**Status:** 🟢 Documentação Completa

---

*"Expand until silence becomes structure."* — NEØ Protocol
