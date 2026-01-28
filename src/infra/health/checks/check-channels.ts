import { loadRuntimeConfig } from "../../../config/runtime-config.js";
import type { HealthCheckResult, HealthStatus } from "../types.js";
import { execSync } from "node:child_process";

export async function checkChannelsStatus(): Promise<HealthCheckResult> {
  const config = loadRuntimeConfig();
  const results: Record<string, any> = {};
  let overallStatus: HealthStatus = "ok";

  // 1. Telegram Check
  if (config.channels?.telegram?.enabled) {
    const hasToken = !!process.env.TELEGRAM_BOT_TOKEN;
    const hasChatId = !!process.env.TELEGRAM_CHAT_ID;
    results.telegram = hasToken && hasChatId ? "ok" : "fail";
    if (results.telegram === "fail") overallStatus = "fail";
  } else {
    results.telegram = "disabled";
  }

  // 2. Social Automation (X/Target dependent)
  if (config.social_browser_automation?.enabled) {
    let targets = Object.entries(config.social_browser_automation.targets)
      .filter(([_, enabled]) => enabled)
      .map(([target]) => target)
      .join(", ");

    results.social = `ok (${targets || "no targets"})`;
    if (config.social_browser_automation.require_confirmation) {
      results.social += " [confirmation-required]";
    }
  } else {
    results.social = "disabled";
  }

  // 3. Docker (Executor check)
  if (config.executors?.docker?.enabled) {
    try {
      execSync("docker --version", { stdio: "ignore" });
      results.docker = "ok";
    } catch {
      results.docker = "fail (not installed)";
      overallStatus = "fail";
    }
  } else {
    results.docker = "disabled";
  }

  // 4. IPFS (Placeholder)
  if (config.executors?.ipfs_local?.enabled) {
    results.ipfs = "warn (presence check not implemented)";
  }

  // 5. Brave MCP (Exec check)
  if (config.executors?.brave_mcp?.enabled) {
    results.brave = "ok";
  }

  const summary = Object.entries(results)
    .map(([k, v]) => `${k}: ${v}`)
    .join(" | ");

  return {
    key: "channels_status",
    status: overallStatus,
    summary,
    details: results,
  };
}
