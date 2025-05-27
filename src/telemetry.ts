import { type Span, trace } from "@opentelemetry/api";

export interface Telemetry {
  startSpan(name: string): Span;
}

export function initTelemetry(serviceName: string): Telemetry {
  const tracer = trace.getTracer(serviceName);
  return {
    startSpan: (name) => tracer.startSpan(name),
  };
}
