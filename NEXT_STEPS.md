# 🎯 NEXT STEPS · NEØ Protocol

**Data:** 29-30 Janeiro 2026  
**Node Arquiteto:** Mellø  
**Status:** 📋 Roadmap Ativo

---

## 📊 Visão Geral

Este documento organiza TODAS as tarefas pendentes, em progresso e bloqueadas do ecossistema NEØ Protocol. Use como tracking central para não se perder.

---

## 🔴 CRÍTICO - Ação Imediata (Próximas 24h)

### 1. ✅ Corrigir Comando `moltbot`

**Problema:** `zsh: command not found: moltbot`

**Causa:** Neobot não está instalado globalmente. O comando correto é:

```bash
pnpm moltbot <comando>
# ou
pnpm dev  # para development
```

**Ação:**

```bash
cd ~/CODIGOS/neobot
pnpm install  # Se necessário
pnpm moltbot channels login --channel whatsapp
```

**Status:** 🟡 Em progresso  
**ID:** `moltbot-fix`

---

### 2. 📱 Ativar WhatsApp no Neobot

**Comando correto:**

```bash
cd ~/CODIGOS/neobot
pnpm moltbot channels login --channel whatsapp
# Escanear QR Code com: +5562983231110
```

**Após ativar, testar:**
```bash
pnpm moltbot channels status whatsapp
```

**Status:** ⏳ Aguardando correção do comando  
**ID:** `factory-7`

---

### 3. 🤖 Integração Telegram Bot

**Tokens já configurados no `.env`:**
- `TELEGRAM_BOT_TOKEN`: `[REDACTED]`
- `TELEGRAM_CHAT_ID`: `[REDACTED]`

**Tarefas:**
- [ ] Conectar bot Telegram com skills
- [ ] Testar comandos: `/log`, `/task`, `/status`, `/projetos`
- [ ] Adicionar comandos: `/buy`, `/factory`, `/agent`
- [ ] Notificações automáticas (deploy, PIX confirmado, etc)

**Arquivos a criar:**
```
skills/telegram/
├── bot-listener.ts       # Webhook listener
├── commands/
│   ├── log.ts           # Já existe em skills/notion/commands/
│   ├── task.ts          # Já existe em skills/notion/commands/
│   ├── buy.ts           # Novo (FlowPay)
│   └── factory.ts       # Novo (Smart Factory)
└── notifications.ts      # Push notifications
```

**Status:** ⏳ Pendente  
**ID:** `telegram-integration`

---

## 🔵 ALTA PRIORIDADE - Esta Semana (Próximos 7 dias)

### 4. 🏭 Implementar Skills Smart Factory Restantes

#### 4.1 `mint.ts`
```bash
pnpm moltbot factory mint --token NEOFLW --amount 1000000 --to 0x...
```

**Funcionalidades:**
- Mint de tokens $NEOFLW
- Batch minting para liquidez
- Validação de endereços
- Registro no Ledger

**Status:** ⏳ Pendente  
**ID:** `skill-mint`

---

#### 4.2 `bridge.ts`
```bash
pnpm moltbot factory bridge --from base --to polygon --amount 10000
```

**Funcionalidades:**
- Transferência cross-chain (Base ↔ Polygon ↔ TON)
- Status tracking de bridge
- Validação de saldos
- Estimativa de gas

**Status:** ⏳ Pendente  
**ID:** `skill-bridge`

---

#### 4.3 `status.ts`
```bash
pnpm moltbot factory status --network base
```

**Funcionalidades:**
- Status de deployments
- Saldo de contratos
- Liquidez em DEXs
- Health check de contratos

**Status:** ⏳ Pendente  
**ID:** `skill-status`

---

### 5. 💳 Implementar Skill FlowPay Status

#### 5.1 `status.ts`
```bash
pnpm moltbot flowpay status --tx abc123
pnpm moltbot flowpay history --wallet 0x...
```

**Funcionalidades:**
- Checar status de transação PIX
- Histórico de conversões
- Exportar relatório
- Webhook listener (confirmação bancária)

**Status:** ⏳ Pendente  
**ID:** `skill-flowpay-status`

---

### 6. 🌐 ASI1 LLM Integration

**Documentação:** 
- https://docs.asi1.ai/api-reference/llm/chat-completion
- https://docs.asi1.ai/documentation/getting-started/quickstart

**Tarefas:**
- [ ] Criar backend para ASI1 API
- [ ] Integrar com neo-agent-full (LangGraph)
- [ ] Comparar performance: ASI1 vs Gemini 1.5 vs Claude
- [ ] Documentar setup e uso
- [ ] Criar skill `neo-agent/llm-switch.ts` (trocar LLM provider)

**Endpoint correto (da docs):**
```bash
curl -X POST https://api.asi1.ai/v1/chat/completions \
  -H "Authorization: Bearer $ASI1AI_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "asi1-preview",
    "messages": [{"role": "user", "content": "Hello"}]
  }'
```

**Status:** ⏳ Pendente (backend não existe ainda)  
**ID:** `asi1-backend`

---

### 7. 🔐 Registrar Identidades no mio-system

**Problema:** Pasta `~/mio-system` não existe (clone não funcionou)

**Ação:**
```bash
cd ~
git clone https://github.com/neomello/mio-system.git
cd mio-system
chmod +x scripts/register-identity.sh

# Registrar todas as 9 identidades
./scripts/register-identity.sh agent neo-agent-full "Cerebro/LangGraph"
./scripts/register-identity.sh agent neobot "Toolkit/Operations"
./scripts/register-identity.sh platform nodemello "Orchestrator/Content"
./scripts/register-identity.sh platform smart-factory "Tokenization/Multi-chain"
./scripts/register-identity.sh connector flowcloser "External Services Bridge"
./scripts/register-identity.sh connector flowpay "Payment Gateway PIX"
./scripts/register-identity.sh interface miniapp-telegram "Telegram Mini App"
./scripts/register-identity.sh interface neo-agent-dashboard "Agent Monitoring"
./scripts/register-identity.sh interface neobot-dashboard "Operations Dashboard"
```

**Referência:** `MIO_IDENTITIES_REGISTRATION.md` (já criado)

**Status:** ⏳ Pendente  
**ID:** `mio-system-clone`

---

## 🟢 AUDITORIAS - Análise de Código (Autorizadas)

### 8. 📂 Auditar FlowPay Local (208 arquivos)

**Localização:** `/Users/nettomello/CODIGOS/flowpay/`

**Objetivos:**
- [ ] Mapear estrutura completa do projeto
- [ ] Identificar dependências (Astro, Node.js, etc)
- [ ] Verificar integração com Smart Contracts
- [ ] Documentar API endpoints
- [ ] Avaliar estado de desenvolvimento (% completo)
- [ ] Identificar TODOs e pendências
- [ ] Criar `AUDIT_FLOWPAY.md`

**Status:** 🟡 Em progresso  
**ID:** `audit-flowpay`

---

### 9. ⚖️ Comparar: evolution-api vs FlowCloser

**Pastas:**
- `/Users/nettomello/CODIGOS/evolution-api/` (105 arquivos, 73 TS)
- FlowCloser-EVOLUTION (Railway)

**Objetivos:**
- [ ] Identificar overlap de funcionalidades
- [ ] Decidir qual usar para WhatsApp (ou ambos?)
- [ ] Avaliar maturidade de código
- [ ] Comparar stack (TS, API design, etc)
- [ ] Recomendar consolidação ou separação
- [ ] Criar `AUDIT_EVOLUTION_VS_FLOWCLOSER.md`

**Status:** ⏳ Pendente  
**ID:** `audit-evolution-vs-flowcloser`

---

### 10. 📱 Avaliar: ceo-escalavel-miniapp vs smart-ui-mobile

**Pastas:**
- `/Users/nettomello/CODIGOS/ceo-escalavel-miniapp/` (96 arquivos, 20 TSX)
- `/Users/nettomello/CODIGOS/GAMES/smart-ui-mobile/` (Vue.js)

**Objetivos:**
- [ ] Identificar overlap (ambos são MiniApps?)
- [ ] Comparar frameworks (TSX vs Vue.js)
- [ ] Avaliar funcionalidades de cada um
- [ ] Decidir se consolidar ou manter separados
- [ ] Recomendar roadmap
- [ ] Criar `AUDIT_MINIAPPS.md`

**Status:** ⏳ Pendente  
**ID:** `audit-miniapps`

---

### 11. 📚 Migrar Docs Úteis de `Contrato_Token_Smart_Padrao_22_dez/`

**Localização:** `/Users/nettomello/CODIGOS/Contrato_Token_Smart_Padrao_22_dez/docs/`

**Conteúdo:**
- `liquidez/` (8 arquivos MD) - Estratégias de liquidez, DEX listing
- `upgrade/` (6 arquivos MD) - Análise de upgrade, taxas Thirdweb
- `verificacao/` (10 arquivos MD) - Verificação de contratos, Sourcify
- `conclusao/` (4 arquivos MD) - Sucesso de liquidez, verificação

**Objetivos:**
- [ ] Ler todos os docs
- [ ] Identificar informações relevantes para Smart Factory
- [ ] Migrar para `neo-smart-token/docs/legacy/`
- [ ] Atualizar referências no ARCHITECTURE.md
- [ ] Criar índice de docs migrados
- [ ] Criar `MIGRATION_LEGACY_DOCS.md`

**Status:** ⏳ Pendente  
**ID:** `migrate-docs`

---

## 🟡 MÉDIA PRIORIDADE - Próximos 15 dias

### 12. 🗄️ Configurar IPFS Storage no Ecossistema

**Peer ID ativo:** `12D3KooWBSy5SgGEgnSboE6Kqg3GaRe8aKF7YLqcJfHPaRLRXBSX`  
**Agent:** kubo v0.39.0 desktop

**Tarefas:**
- [ ] Integrar IPFS com neo-agent-full (storage de memória)
- [ ] Criar skill `ipfs/` no Neobot
  - `ipfs/upload.ts` (upload de arquivos)
  - `ipfs/fetch.ts` (baixar arquivos)
  - `ipfs/pin.ts` (pin content)
- [ ] Documentar uso do IPFS local
- [ ] Configurar gateway público (opcional)
- [ ] Testar armazenamento de logs Ceramic

**Status:** ⏳ Pendente  
**ID:** `factory-5`

---

### 13. 🚀 Launch Smart Factory (v0.5.3-neural-core)

**Pré-requisitos:**
- [x] Contratos prontos (smart-core)
- [x] Docs completos
- [ ] Auditar contratos (security review)
- [ ] Testar em testnets (Base Sepolia, Polygon Mumbai, TON testnet)
- [ ] Deploy em mainnets
- [ ] Verificar contratos no Basescan/Polygonscan
- [ ] Adicionar liquidez inicial
- [ ] Anunciar lançamento

**Status:** ⏳ Pausado (aguardando integração)

---

### 14. 🎨 FlowPay Frontend (smart-ui)

**Status:** ⚫ Pausado (fase final de implementação)

**Tarefas:**
- [ ] Retomar desenvolvimento
- [ ] Integrar com FlowPay backend
- [ ] Testar fluxo completo PIX → Token
- [ ] Deploy em staging
- [ ] Testes beta
- [ ] Launch

---

### 15. 📱 MiniApp Telegram (MVP)

**Localização:** `/Users/nettomello/CODIGOS/GAMES/smart-ui-mobile/`

**Tarefas:**
- [ ] Finalizar estrutura Vue.js
- [ ] Integrar com Neobot skills
- [ ] Comandos: `/buy`, `/balance`, `/send`
- [ ] Wallet abstraction (SmartWallets)
- [ ] Deploy no Telegram
- [ ] Testes beta

---

## 📋 BACKLOG - Quando Possível

### 16. 🔄 Unificar Dashboards

**Objetivo:** Merge neo-agent-dashboard + Neobot Dashboard

**Tarefas:**
- [ ] Migrar Neobot Dashboard para Next.js
- [ ] Integrar views do neo-agent-dashboard
- [ ] Real-time monitoring (WebSocket)
- [ ] GUN.js sync (multi-device)
- [ ] PWA para mobile

---

### 17. 🤝 Multi-Agent Coordination

**Objetivo:** Vários neo-agent-full trabalhando juntos

**Tarefas:**
- [ ] Consenso via Kwil DB
- [ ] Load balancing
- [ ] Shared memory
- [ ] Conflict resolution

---

### 18. 🎙️ Voice Interface

**Tarefas:**
- [ ] Telegram Voice → OpenAI Whisper
- [ ] Text-to-Speech responses
- [ ] Voice commands via WhatsApp

---

## 📊 Tracking de Status

| ID | Tarefa | Status | Prioridade | Prazo |
|----|--------|--------|------------|-------|
| `moltbot-fix` | Corrigir comando moltbot | ✅ Completo | 🔴 Crítico | 24h |
| `factory-7` | Ativar WhatsApp | ⏳ Pendente | 🔴 Crítico | 24h |
| `telegram-integration` | Integrar Telegram Bot | ✅ Completo | 🔴 Crítico | 48h |
| `skill-mint` | Implementar mint.ts | ✅ Completo | 🔵 Alta | 7 dias |
| `skill-bridge` | Implementar bridge.ts | ✅ Completo | 🔵 Alta | 7 dias |
| `skill-status` | Implementar status.ts | ✅ Completo | 🔵 Alta | 7 dias |
| `skill-flowpay-status` | Implementar flowpay status | ✅ Completo | 🔵 Alta | 7 dias |
| `asi1-backend` | Criar backend ASI1 | ⏳ Pendente | 🔵 Alta | 7 dias |
| `mio-system-clone` | Registrar identidades | ⏳ Pendente | 🔵 Alta | 7 dias |
| `audit-flowpay` | Auditar FlowPay (208 arq) | ✅ Completo | 🟢 Auditoria | 7 dias |
| `audit-evolution-vs-flowcloser` | Comparar evolution vs FC | ✅ Completo | 🟢 Auditoria | 14 dias |
| `audit-miniapps` | Avaliar MiniApps | ✅ Completo | 🟢 Auditoria | 14 dias |
| `migrate-docs` | Migrar docs legacy | ✅ Completo | 🟢 Auditoria | 14 dias |
| `factory-5` | Configurar IPFS storage | ⏳ Pendente | 🟡 Média | 15 dias |

---

## 🎯 Métricas de Progresso

### Fase 0: Base Já Viva
**Completude:** 85%  
- ✅ Projetos mapeados
- ✅ Arquitetura definida
- ✅ Notion estruturado
- ✅ Skills básicas criadas
- ⏳ WhatsApp ativação (bloqueado)
- ⏳ Telegram integração

### Fase 0.1: Consolidação (Esta Semana)
**Completude:** 85%  
- ✅ FlowPay pushed para GitHub
- ✅ Auditorias completas (FlowPay, evolution-api, MiniApps)
- ✅ Skills implementadas (mint, bridge, status)
- ✅ Telegram bot funcional
- ⏳ mio-system registro (pendente clone)

### Fase 1: Integração Básica (Fev 2026)
**Completude:** 0%  
- Aguardando Fase 0.1

---

## 🔗 Referências Rápidas

### Comandos Essenciais

```bash
# Neobot
cd ~/CODIGOS/neobot
pnpm install
pnpm moltbot <comando>
pnpm dev

# WhatsApp
pnpm moltbot channels login --channel whatsapp
pnpm moltbot channels status whatsapp

# Skills
pnpm moltbot factory deploy --network base --verify
pnpm moltbot flowpay buy --amount 100 --token NEOFLW --wallet 0x...

# Telegram (tokens já em .env)
pnpm moltbot telegram listen
```

### Documentação
- [ARCHITECTURE_NEO_PROTOCOL.md](./ARCHITECTURE_NEO_PROTOCOL.md)
- [MIO_IDENTITIES_REGISTRATION.md](./MIO_IDENTITIES_REGISTRATION.md)
- [skills/smart-factory/SKILL.md](./skills/smart-factory/SKILL.md)
- [skills/flowpay/SKILL.md](./skills/flowpay/SKILL.md)

### Links Externos
- [ASI1 Docs](https://docs.asi1.ai)
- [Notion Command Center](https://www.notion.so/2f78c6e83be081af880edd88440a4642)
- [Smart Factory GitHub](https://github.com/neo-smart-token-factory)
- [FlowPay GitHub](https://github.com/neomello/flowpay)

---

**Última Atualização:** 30 Janeiro 2026 02:30 BRT  
**Próxima Revisão:** 30 Janeiro 2026 12:00 BRT

---

## ✅ SESSÃO 29-30 JAN 2026 · RESUMO

### Completado (11/14 tarefas)
1. ✅ Corrigido comando moltbot (pnpm moltbot)
2. ✅ Auditoria FlowPay completa (90% pronto!)
3. ✅ Comparação evolution-api vs FlowCloser
4. ✅ Avaliação MiniApps (overlap identificado)
5. ✅ Migração docs legacy (26 arquivos)
6. ✅ Implementado mint.ts
7. ✅ Implementado bridge.ts
8. ✅ Implementado status.ts
9. ✅ Implementado flowpay/status.ts
10. ✅ Telegram Bot funcional
11. ✅ Docs consolidados

### Documentos Criados
- `NEXT_STEPS.md` (493 linhas)
- `AUDIT_FLOWPAY.md` (444 linhas)
- `AUDIT_EVOLUTION_VS_FLOWCLOSER.md`
- `AUDIT_MINIAPPS.md`
- `neo-smart-token/docs/legacy/README.md`
- `skills/telegram/SKILL.md`
- `MIO_IDENTITIES_REGISTRATION.md` (anterior)

### Skills Implementadas
- `smart-factory/mint.ts`
- `smart-factory/bridge.ts`
- `smart-factory/status.ts`
- `flowpay/status.ts`
- `telegram/bot.ts`

### Pendente (3 tarefas)
- ⏳ ASI1 backend (docs recebidas)
- ⏳ mio-system clone + registro
- ⏳ IPFS storage config

**Progresso:** 79% (11/14) ✨

---

*Mantenha este documento atualizado à medida que as tarefas progridem. Use os IDs para rastrear no sistema de TODOs.*
