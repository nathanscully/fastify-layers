import type { FastifyBaseLogger } from "fastify";
import type { createUserRepository } from "../repositories/userRepository";
import type { Telemetry } from "../telemetry";

export function createUserService({
  userRepo,
  logger,
  telemetry,
}: {
  userRepo: ReturnType<typeof createUserRepository>;
  logger: FastifyBaseLogger;
  telemetry: Telemetry;
}) {
  return {
    async getUser(id: string) {
      const span = telemetry.startSpan("userService.getUser");
      try {
        logger.debug({ id }, "fetching user");
        const user = await userRepo.findById(id);
        if (!user) {
          logger.info({ id }, "user not found");
        }
        return user;
      } catch (err) {
        span.recordException(err as Error);
        logger.error({ err, id }, "error in userService.getUser");
        throw err;
      } finally {
        span.end();
      }
    },
  };
}
