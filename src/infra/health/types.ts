export type HealthStatus = "ok" | "warn" | "fail";

export interface HealthCheckResult {
  key: string;
  status: HealthStatus;
  summary: string;
  details?: Record<string, any>;
  recommendation?: string;
}

export interface GlobalHealthReport {
  ts: string;
  overall_status: HealthStatus;
  checks: HealthCheckResult[];
}
