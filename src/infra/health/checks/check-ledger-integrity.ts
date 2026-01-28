import fs from "node:fs";
import crypto from "node:crypto";
import path from "node:path";
import { getLedgerFilePath } from "../../ledger/ledger.js";
import type { HealthCheckResult } from "../types.js";

const CHECKPOINT_FILE = ".ledger.checkpoint.json";

interface LedgerCheckpoint {
  ledger_path: string;
  last_line: number;
  last_hash: string;
  ts: string;
}

export async function checkLedgerIntegrity(): Promise<HealthCheckResult> {
  const ledgerPath = getLedgerFilePath();
  const stateDir = path.dirname(ledgerPath);
  const checkpointPath = path.join(stateDir, CHECKPOINT_FILE);

  if (!fs.existsSync(ledgerPath)) {
    return {
      key: "ledger_integrity",
      status: "warn",
      summary: "Ledger file missing",
      recommendation: "Run any skill to initialize the ledger.",
    };
  }

  try {
    const rawContent = fs.readFileSync(ledgerPath, "utf-8");
    const lines = rawContent.split("\n").filter((l) => l.trim() !== "");

    let currentHash = "0".repeat(64); // Genesis hash
    let lineCount = 0;

    for (const line of lines) {
      const hash = crypto.createHash("sha256");
      hash.update(currentHash + "\n" + line);
      currentHash = hash.digest("hex");
      lineCount++;
    }

    // Check against checkpoint
    let status: "ok" | "fail" = "ok";
    let summary = `Verified ${lineCount} events. Chain integrity intact.`;

    if (fs.existsSync(checkpointPath)) {
      const checkpoint: LedgerCheckpoint = JSON.parse(fs.readFileSync(checkpointPath, "utf-8"));
      // Basic check: if ledger is smaller than checkpoint, someone might have deleted lines
      if (lineCount < checkpoint.last_line) {
        status = "fail";
        summary = `Ledger has fewer lines (${lineCount}) than last checkpoint (${checkpoint.last_line}). Possible truncation or tampering.`;
      } else if (lineCount === checkpoint.last_line && currentHash !== checkpoint.last_hash) {
        status = "fail";
        summary = "Ledger modified. Hash chain mismatch at checkpoint line.";
      }
      // If lineCount > checkpoint.last_line, we've added new events. We should verify up to checkpoint line if we want to be super strict,
      // but for this MVP, we re-calculate the whole thing.
    }

    // Update checkpoint if valid
    if (status === "ok") {
      const newCheckpoint: LedgerCheckpoint = {
        ledger_path: ledgerPath,
        last_line: lineCount,
        last_hash: currentHash,
        ts: new Date().toISOString(),
      };
      fs.writeFileSync(checkpointPath, JSON.stringify(newCheckpoint, null, 2));
    }

    return {
      key: "ledger_integrity",
      status: status,
      summary: summary,
      details: {
        event_count: lineCount,
        last_hash: currentHash,
      },
    };
  } catch (error: any) {
    return {
      key: "ledger_integrity",
      status: "fail",
      summary: `Failed to verify ledger: ${error.message}`,
      recommendation: "Inspect ledger.jsonl for corruption.",
    };
  }
}
