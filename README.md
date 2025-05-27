# Fastify Layers

A modern Fastify application with a layered architecture, built with TypeScript, Nix, and pnpm.

## Prerequisites

- [Nix](https://nixos.org/download.html)
- [direnv](https://direnv.net/docs/installation.html)
- [pnpm](https://pnpm.io/installation) (will be installed via nix)

## Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd fastify-layers
```

2. Allow direnv to use the project's `.envrc`:
```bash
direnv allow
```

3. Install dependencies:
```bash
pnpm install
```

4. Create a `.env` file based on `.env.example`:
```bash
cp .env.example .env
```

5. Update the `.env` file with your configuration:
```env
REDIS_URL=redis://localhost:6379
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/myapp
LOG_LEVEL=info
PORT=3000
```

## Development

Start the development server:
```bash
pnpm dev
```

The server will be available at `http://localhost:3000`.

## Project Structure

```
src/
├── plugins/     # Fastify plugins
├── routes/      # API routes
├── services/    # Business logic
├── repositories/# Data access layer
├── db/         # Database configuration
├── logger/     # Logging configuration
└── telemetry/  # Telemetry setup
```

## Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm test` - Run tests
- `pnpm lint` - Run linter
- `pnpm format` - Format code

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| REDIS_URL | Redis connection URL | redis://localhost:6379 |
| DATABASE_URL | PostgreSQL connection URL | - |
| LOG_LEVEL | Logging level | info |
| PORT | Server port | 3000 |

## License

ISC 