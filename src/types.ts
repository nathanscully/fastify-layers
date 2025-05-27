import type { Pool } from "pg";
import type { createUserRepository } from "./repositories/userRepository";
import type { createUserService } from "./services/userService";
import "@fastify/env";
import type { FastifyBaseLogger } from "fastify";
import type Redis from "ioredis";
import type { Telemetry } from "./telemetry";

declare module "fastify" {
  interface FastifyInstance {
    config: {
      REDIS_URL: string;
      DATABASE_URL: string;
      LOG_LEVEL: string;
      PORT: string;
    };
  }
}

declare module "@fastify/env" {
  interface FastifyEnvSchema {
    type: "object";
    required: string[];
    properties: {
      REDIS_URL: {
        type: "string";
        default: string;
      };
      DATABASE_URL: {
        type: "string";
      };
      LOG_LEVEL: {
        type: "string";
        default: string;
      };
      PORT: {
        type: "string";
        default: string;
      };
    };
  }
}

export interface Clients {
  redis: Redis;
  db: Pool;
  logger: FastifyBaseLogger;
  telemetry: Telemetry;
}

export interface Repositories {
  userRepo: ReturnType<typeof createUserRepository>;
  // …other repos
}

export interface Services {
  userService: ReturnType<typeof createUserService>;
  // …other services
}
