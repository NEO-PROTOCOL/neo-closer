# 💳 FlowPay Skills

**Versão:** 1.0.0  
**Status:** ✅ Estrutura criada  
**Camada:** Valor & Token

---

## 📖 Descrição

Skills para interagir com FlowPay Gateway (PIX → $NEOFLW/USDC). Permite iniciar compras, checar status de transações e gerenciar conversões.

---

## 🎯 Casos de Uso

1. **Compra de Tokens**
   - Gerar PIX para compra de $NEOFLW
   - Gerar PIX para compra de USDC
   - Receber QR Code e código PIX copia-e-cola

2. **Status de Transação**
   - Checar status de pagamento PIX
   - Verificar conversão BRL → Crypto
   - Confirmar entrega de tokens

3. **Histórico**
   - Listar transações do usuário
   - Ver histórico de conversões
   - Exportar relatório

---

## 📂 Arquivos

```
skills/flowpay/
├── SKILL.md              # Este arquivo
├── buy.ts                # Iniciar compra PIX
├── status.ts             # Status de transação
└── README.md             # Documentação de uso
```

---

## 🔧 Comandos CLI (Planejados)

```bash
# Compra
moltbot flowpay buy --amount 100 --token NEOFLW --wallet 0x...
moltbot flowpay buy --amount 50 --token USDC

# Status
moltbot flowpay status --tx abc123
moltbot flowpay history --wallet 0x...

# Admin
moltbot flowpay balance --check
moltbot flowpay liquidity --status
```

---

## 🔗 Integração

### Local
- **FlowPay:** `/Users/nettomello/CODIGOS/flowpay/`
- **Framework:** Astro (208 arquivos)

### GitHub
- [flowpay](https://github.com/neomello/flowpay) (repo vazio - código local)

### Notion
- [FlowPay Page](https://www.notion.so/2f78c6e83be0816a9348e927c258ec0b)
- [Projetos Database](https://www.notion.so/2f88c6e83be081709604fba3b7aef592)

---

## 💰 Fluxo de Compra

```
1. Usuário: moltbot flowpay buy --amount 100 --token NEOFLW
   ↓
2. FlowPay Skill gera PIX
   - Cotação atual: R$ 100 = X $NEOFLW
   - QR Code gerado
   - Código copia-e-cola retornado
   ↓
3. Usuário paga PIX via app bancário
   ↓
4. FlowPay recebe webhook de confirmação
   ↓
5. Smart Contract minta $NEOFLW
   ↓
6. Tokens entregues na wallet
   ↓
7. Notificação via Telegram: "✅ Recebido X $NEOFLW!"
```

---

## 🚀 Próximos Passos

1. Implementar `buy.ts` com geração de PIX
2. Integrar com FlowPay local (Astro backend)
3. Adicionar webhook listener para confirmações
4. Criar notificações Telegram
5. Registrar transações no Ledger
6. Atualizar Notion Work Log

---

**Criado em:** 29 Janeiro 2026  
**Node Arquiteto:** Mellø
