import type { FastifyPluginAsync } from "fastify";
import fp from "fastify-plugin";

const usersRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.get<{ Params: { id: string } }>("/:id", async (request, reply) => {
    if (!request.services) {
      return reply.code(500).send({ error: "Services not initialized" });
    }
    const { userService } = request.services;
    const user = await userService.getUser(request.params.id);
    if (!user) {
      return reply.code(404).send({ error: "Not found" });
    }
    reply.send(user);
  });
};

export default fp(usersRoutes, { name: "users-routes" });
