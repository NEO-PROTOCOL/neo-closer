import type { GlobalHealthReport, HealthStatus } from "./types.js";
import { checkNodeStatus } from "./checks/check-node.js";
import { checkRuntimeConfigStatus } from "./checks/check-runtime-config.js";
import { checkLedgerIntegrity } from "./checks/check-ledger-integrity.js";
import { checkSkillsStatus } from "./checks/check-skills.js";
import { checkChannelsStatus } from "./checks/check-channels.js";
import { checkSchedulerStatus } from "./checks/check-scheduler.js";

export async function runHealthCheck(
  options: { sinceHours?: number } = {},
): Promise<GlobalHealthReport> {
  const checks = await Promise.all([
    checkNodeStatus(),
    checkRuntimeConfigStatus(),
    checkLedgerIntegrity(),
    checkSkillsStatus(options.sinceHours ?? 24),
    checkChannelsStatus(),
    checkSchedulerStatus(),
  ]);

  let overallStatus: HealthStatus = "ok";
  if (checks.some((c) => c.status === "fail")) {
    overallStatus = "fail";
  } else if (checks.some((c) => c.status === "warn")) {
    overallStatus = "warn";
  }

  return {
    ts: new Date().toISOString(),
    overall_status: overallStatus,
    checks,
  };
}
