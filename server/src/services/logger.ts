export function logProgress(step: string, data?: any) {
  console.log(`[${new Date().toISOString()}] ${step}`, data || "");
}
