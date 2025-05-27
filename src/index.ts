import fastifyEnv from "@fastify/env";
import Fastify from "fastify";
import clientsPlugin from "./plugins/clients";
import repositoriesPlugin from "./plugins/repositories";
import servicesPlugin from "./plugins/services";
import usersRoutes from "./routes/users";

const envSchema = {
  type: "object",
  required: ["REDIS_URL", "DATABASE_URL"],
  properties: {
    REDIS_URL: {
      type: "string",
      default: "redis://localhost:6379",
    },
    DATABASE_URL: {
      type: "string",
    },
    LOG_LEVEL: {
      type: "string",
      default: "info",
    },
    PORT: {
      type: "string",
      default: "3000",
    },
  },
};

async function main() {
  const app = Fastify({
    logger: true,
  });

  // Register env plugin first
  await app.register(fastifyEnv, {
    schema: envSchema,
    dotenv: true,
  });

  // Register other plugins
  await app.register(clientsPlugin);
  await app.register(repositoriesPlugin);
  await app.register(servicesPlugin);
  await app.register(usersRoutes, { prefix: "/users" });

  const port = Number.parseInt(app.config.PORT, 10);
  await app.listen({ port, host: "0.0.0.0" });
  app.log.info(`Server listening on port ${port}`);
}

main().catch((err) => {
  console.error("Startup error:", err);
  process.exit(1);
});
