# Poker Hand Generator

## Starting the Poker Hand Generator

To start Svelte frontend and Node backend server on localhost:

````bash
# Run following commands to build docker and start server
pnpm poker

```bash
# Remove docker containers and stop server
pnpm poker:down

````

## e2e - testing frontend with Cypress

Make sure you have Docker containers running

```bash

# Go inside frontend and install
cd svelte-frontend && pnpm install

# Start Cypress
pnpm cypress open

Select if you want to test in browser or in Electron

Run all tests


```

## Jest - testing endpoints in Node/Express

```bash

# Go inside backend and install
cd backend && pnpm install

# Start tests
pnpm test


```
