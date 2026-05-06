# build container
```bash
DOCKER_BUILDKIT=1 docker build --tag ipfinder .
```

# start container
```bash
docker compose watch ipfinder-dev
```

Open http://localhost:5173/ in the browser.

# build the React app
Build on local environment for wrangler (cloudflare recommends to start wrangler local).
```bash
npm run build
```
# serve the React app build
Run locally with `serve`.
```bash
npm run servedist
```
Open https://localhost:8443/ in the browser (self-signed certificate).

# deploy to cloudflare
- github ci/cd pipeline .github/workflows/ci-cd.yml

- manually deploy
```bash
npm run cloudflarelogin
npm run deploy
```

# IDE autocomplete
Install node modules locally.
```bash
npm install
```
The Node runtime stays inside the container.
