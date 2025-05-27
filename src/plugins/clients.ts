import type { FastifyPluginAsync } from "fastify";
import fp from "fastify-plugin";
import Redis from "ioredis";
import { createDbPool } from "../db";
import { createLogger } from "../logger";
import { initTelemetry } from "../telemetry";
import type { Clients } from "../types";

declare module "fastify" {
  interface FastifyInstance {
    clients: Clients;
  }
  interface FastifyRequest {
    clients: Clients;
  }
}

const clientsPlugin: FastifyPluginAsync = async (fastify) => {
  const logger = createLogger(fastify.config.LOG_LEVEL);
  const redis = new Redis(fastify.config.REDIS_URL);
  const db = createDbPool(fastify.config.DATABASE_URL);
  const telemetry = initTelemetry("my-fastify-app");

  fastify.decorate("clients", { redis, db, logger: logger, telemetry });
  fastify.decorateRequest("clients", { getter: () => fastify.clients });
};

export default fp(clientsPlugin, { name: "clients-plugin" });
