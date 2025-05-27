import type { FastifyPluginAsync } from "fastify";
import fp from "fastify-plugin";
import { createUserRepository } from "../repositories/userRepository";
import type { Clients, Repositories } from "../types";

declare module "fastify" {
  interface FastifyInstance {
    repositories: Repositories;
  }
  interface FastifyRequest {
    repositories: Repositories;
  }
}

const repositoriesPlugin: FastifyPluginAsync = async (fastify) => {
  const { db, redis } = fastify.clients as Clients;

  const userRepo = createUserRepository({ db, redis });

  const repos: Repositories = { userRepo };
  fastify.decorate("repositories", repos);
  fastify.decorateRequest("repositories", { getter: () => repos });
};

export default fp(repositoriesPlugin, { name: "repositories-plugin" });
