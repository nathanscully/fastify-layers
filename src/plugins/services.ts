import type { FastifyPluginAsync } from "fastify";
import fp from "fastify-plugin";
import { createUserService } from "../services/userService";
import type { Clients, Repositories, Services } from "../types";

declare module "fastify" {
  interface FastifyInstance {
    services: Services;
  }
  interface FastifyRequest {
    services: Services;
  }
}

const servicesPlugin: FastifyPluginAsync = async (fastify) => {
  const clients = fastify.clients as Clients;
  const repos = fastify.repositories as Repositories;

  const userService = createUserService({
    userRepo: repos.userRepo,
    logger: clients.logger,
    telemetry: clients.telemetry,
  });

  const services: Services = { userService };
  fastify.decorate("services", services);
  fastify.decorateRequest("services", { getter: () => services });
};

export default fp(servicesPlugin, { name: "services-plugin" });
