# 🤖 Guia de Uso do Neobot - Protocolo NΞØ

## 📱 Telegram - Envio de Mensagens

### Enviar Mensagem Direta

```bash
pnpm tsx skills/telegram/scripts/telegram.ts \
  --to 8181568281 \
  --message "sua mensagem aqui"
```

**Importante:**
- ✅ Chat ID **SEM aspas** (ex: `8181568281`)
- ✅ Mensagem **COM aspas** (ex: `"olá!"`)

### Descobrir Chat ID de Alguém

```bash
pnpm tsx skills/telegram/scripts/get-chat-id.ts
```

**Como usar:**
1. Rode o comando acima
2. Peça para a pessoa enviar `/start` para o bot
3. O script mostrará o Chat ID dela

**⚠️ Atenção:** Só pode rodar **UM** listener por vez! Se já tiver um rodando, pare-o antes (Ctrl+C).

### Monitorar Mensagens Recebidas

```bash
pnpm tsx skills/telegram/scripts/listen.ts
```

**O que faz:**
- Mostra todas as mensagens recebidas em tempo real
- Exibe nome, username, Chat ID
- Indica se é uma resposta
- Emite um "beep" quando chega mensagem

---

## ⏰ Agendamento de Mensagens

### Agendar uma Mensagem

```bash
pnpm tsx skills/scheduler/scripts/scheduler.ts add \
  --name "Nome da Tarefa" \
  --when "in 15 minutes" \
  --command "pnpm tsx skills/telegram/scripts/telegram.ts --to 8181568281 --message 'texto'"
```

**Formatos de tempo aceitos:**
- `"in 15 minutes"` - Daqui a 15 minutos
- `"in 2 hours"` - Daqui a 2 horas
- `"em 30 minutos"` - Português também funciona
- `"0 9 * * *"` - Cron expression (todo dia às 9h)

### Listar Tarefas Agendadas

```bash
pnpm neobot cron list
```

### Executar Tarefa Manualmente

```bash
pnpm neobot cron run <id-da-tarefa>
```

### Iniciar o Scheduler (Execução Automática)

```bash
pnpm neobot cron start
```

**Nota:** Deixe rodando em background para que as tarefas sejam executadas automaticamente.

---

## 🔑 Configuração Inicial

### Arquivo `.env`

Certifique-se de ter estas variáveis configuradas:

```bash
# Telegram
TELEGRAM_BOT_TOKEN=seu-token-aqui
TELEGRAM_CHAT_ID=seu-chat-id

# Anthropic (Claude AI) - Necessário para agendamento inteligente
ANTHROPIC_API_KEY=sk-ant-sua-chave-aqui
```

**Onde conseguir:**
- **Telegram Bot Token:** [@BotFather](https://t.me/BotFather) no Telegram
- **Anthropic API Key:** [console.anthropic.com](https://console.anthropic.com/settings/keys)

---

## 📋 Chat IDs Conhecidos

| Nome | Username | Chat ID |
|------|----------|---------|
| Netto MELLØ | - | `6582122066` |
| Ana Carolina | @anacarolinamaia | `8181568281` |

---

## 🛠️ Comandos Úteis

### Verificar Status do Sistema

```bash
pnpm neobot health --full
```

### Ver Configuração Atual

```bash
pnpm neobot config show
```

### Ver Ledger (Auditoria)

```bash
pnpm neobot ledger tail 10
```

---

## 💡 Exemplos Práticos

### Exemplo 1: Enviar "Bom dia" todo dia às 9h

```bash
pnpm tsx skills/scheduler/scripts/scheduler.ts add \
  --name "Bom dia para Julia" \
  --when "0 9 * * *" \
  --command "pnpm tsx skills/telegram/scripts/telegram.ts --to 8181568281 --message 'Bom dia! ☀️'"
```

### Exemplo 2: Lembrete em 30 minutos

```bash
pnpm tsx skills/scheduler/scripts/scheduler.ts add \
  --name "Lembrete Reunião" \
  --when "in 30 minutes" \
  --command "pnpm tsx skills/telegram/scripts/telegram.ts --to 6582122066 --message 'Reunião em 30 minutos!'"
```

### Exemplo 3: Sequência de Mensagens

```bash
# Primeira mensagem (agora)
pnpm tsx skills/telegram/scripts/telegram.ts \
  --to 8181568281 \
  --message "Oi! Tudo bem?"

# Segunda mensagem (15 min depois)
pnpm tsx skills/scheduler/scripts/scheduler.ts add \
  --name "Follow-up" \
  --when "in 15 minutes" \
  --command "pnpm tsx skills/telegram/scripts/telegram.ts --to 8181568281 --message 'Vamos sair?'"
```

---

## 🚨 Troubleshooting

### Erro: "Conflict: terminated by other getUpdates request"

**Problema:** Dois listeners tentando rodar ao mesmo tempo.

**Solução:** 
1. Pare todos os processos do bot: `pkill -f "get-chat-id\|listen"`
2. Rode apenas um listener por vez

### Erro: "chat not found"

**Problema:** A pessoa ainda não iniciou conversa com o bot.

**Solução:**
1. Peça para ela procurar o bot no Telegram
2. Ela deve enviar `/start`
3. Depois disso, você pode enviar mensagens

### Erro: "TELEGRAM_BOT_TOKEN not found"

**Problema:** Variável de ambiente não configurada.

**Solução:**
1. Verifique se o arquivo `.env` existe
2. Certifique-se de que `TELEGRAM_BOT_TOKEN` está definido
3. Reinicie o terminal

---

## 🔐 Segurança

- ⚠️ **NUNCA** compartilhe seu `.env` ou faça commit dele no Git
- ⚠️ O `.env` já está no `.gitignore` por segurança
- ⚠️ Tokens e API keys são sensíveis - trate como senhas

---

## 📚 Recursos Adicionais

- **Documentação do Telegram Bot API:** https://core.telegram.org/bots/api
- **Anthropic Console:** https://console.anthropic.com/
- **Cron Expression Generator:** https://crontab.guru/

---

**Última atualização:** 27/01/2026 23:34  
**Versão do Neobot:** v1.0.0-neobot  
**Protocolo:** NΞØ 🛰️
