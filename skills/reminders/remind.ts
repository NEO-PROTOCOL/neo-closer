#!/usr/bin/env node

/**
 * Sistema de Lembretes Pessoais via Telegram
 * Uso: pnpm tsx skills/reminders/remind.ts "texto do lembrete" "quando"
 */

import { execSync } from "node:child_process";
import process from "node:process";

const TELEGRAM_SCRIPT = "skills/telegram/scripts/telegram.ts";
const SCHEDULER_SCRIPT = "skills/scheduler/scripts/scheduler.ts";

// Seu Chat ID (Netto)
const MY_CHAT_ID = process.env.MY_TELEGRAM_CHAT_ID || "6582122066";

function main() {
    const args = process.argv.slice(2);

    if (args.length < 2) {
        console.log(`
📅 Sistema de Lembretes Pessoais

Uso:
  pnpm tsx skills/reminders/remind.ts "texto do lembrete" "quando"

Exemplos:
  pnpm tsx skills/reminders/remind.ts "Ligar para o dentista" "in 2 hours"
  pnpm tsx skills/reminders/remind.ts "Reunião importante" "tomorrow at 9am"
  pnpm tsx skills/reminders/remind.ts "Academia" "in 30 minutes"
  pnpm tsx skills/reminders/remind.ts "Tomar remédio" "0 20 * * *"

Formatos de tempo:
  - "in X minutes/hours/days"
  - "tomorrow at HH:mm"
  - "0 9 * * *" (cron: todo dia às 9h)
  - "em X minutos" (português também funciona)
    `);
        process.exit(1);
    }

    const reminderText = args[0];
    const when = args[1];

    // Criar nome da tarefa baseado no texto
    const taskName = `Lembrete: ${reminderText.slice(0, 30)}${reminderText.length > 30 ? "..." : ""}`;

    // Criar o comando que será executado
    const command = `pnpm tsx ${TELEGRAM_SCRIPT} --to ${MY_CHAT_ID} --message "🔔 LEMBRETE: ${reminderText}"`;

    // Agendar o lembrete
    console.log(`📅 Agendando lembrete...`);
    console.log(`📝 "${reminderText}"`);
    console.log(`⏰ Para: ${when}\n`);

    try {
        const result = execSync(
            `pnpm tsx ${SCHEDULER_SCRIPT} add --name "${taskName}" --when "${when}" --command "${command}"`,
            { encoding: "utf-8", stdio: "inherit" }
        );

        console.log(`\n✅ Lembrete agendado com sucesso!`);
        console.log(`💡 Você receberá uma mensagem no Telegram quando chegar a hora.`);
    } catch (error) {
        console.error(`\n❌ Erro ao agendar lembrete:`, error);
        process.exit(1);
    }
}

main();
