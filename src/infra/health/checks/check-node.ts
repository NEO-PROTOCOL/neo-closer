import type { HealthCheckResult } from "../types.js";
import os from "node:os";

export async function checkNodeStatus(): Promise<HealthCheckResult> {
  return {
    key: "node_runtime",
    status: "ok",
    summary: `Node ${process.version} on ${process.platform}`,
    details: {
      version: process.version,
      platform: process.platform,
      arch: process.arch,
      uptime: process.uptime(),
      memory_usage: process.memoryUsage(),
    },
  };
}
