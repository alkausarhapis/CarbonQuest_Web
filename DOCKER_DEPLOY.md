# CarbonQuest Web - Docker Deployment

## Prerequisites

- Docker & Docker Compose installed
- Cloudflare account with Zero Trust access

## Setup Cloudflare Tunnel

1. **Login to Cloudflare Zero Trust Dashboard**

   - Go to https://one.dash.cloudflare.com
   - Navigate to **Networks** > **Tunnels**

2. **Create a new tunnel**

   - Click "Create a tunnel"
   - Choose "Cloudflared" connector
   - Name your tunnel (e.g., `carbonquest-web`)
   - Copy the tunnel token

3. **Configure the tunnel**
   - Add a public hostname (e.g., `carbonquest.yourdomain.com`)
   - Set service to: `http://carbonquest-web:80`
   - Save the configuration

## Environment Setup

1. Copy the example environment file:

   ```bash
   cp .env.example .env
   ```

2. Edit `.env` and add your Cloudflare Tunnel token:
   ```
   CLOUDFLARE_TUNNEL_TOKEN=your_actual_token_here
   ```

## Running the Application

### Start the containers:

```bash
docker-compose up -d --build
```

### View logs:

```bash
# All services
docker-compose logs -f

# Only web app
docker-compose logs -f carbonquest-web

# Only cloudflared
docker-compose logs -f cloudflared
```

### Stop the containers:

```bash
docker-compose down
```

### Rebuild after changes:

```bash
docker-compose up -d --build
```

## Local Development (without Cloudflare)

If you want to run only the web app locally without tunneling:

```bash
docker build -t carbonquest-web .
docker run -p 8080:80 carbonquest-web
```

Then access: http://localhost:8080

## Troubleshooting

### Tunnel not connecting

- Verify the tunnel token is correct
- Check Cloudflare dashboard for tunnel status
- View cloudflared logs: `docker-compose logs cloudflared`

### Build fails

- Ensure all dependencies are in package.json
- Check for TypeScript/ESLint errors locally first
- Run `npm run build` locally to test

### 502 Bad Gateway

- Ensure carbonquest-web container is running
- Check nginx logs: `docker-compose logs carbonquest-web`
- Verify the service URL in Cloudflare tunnel config matches `http://carbonquest-web:80`
