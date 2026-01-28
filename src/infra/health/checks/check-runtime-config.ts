import { loadRuntimeConfig } from "../../../config/runtime-config.js";
import type { HealthCheckResult } from "../types.js";

export async function checkRuntimeConfigStatus(): Promise<HealthCheckResult> {
  try {
    const config = loadRuntimeConfig();
    return {
      key: "runtime_config",
      status: "ok",
      summary: "Runtime configuration loaded successfully.",
      details: {
        version: (config as any).version,
        governance: (config as any).governance_mode,
      },
    };
  } catch (error: any) {
    return {
      key: "runtime_config",
      status: "fail",
      summary: `Failed to load runtime config: ${error.message}`,
      recommendation: "Check config/neobot.runtime.json for JSON syntax errors.",
    };
  }
}
