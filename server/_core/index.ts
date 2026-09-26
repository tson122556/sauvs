import "dotenv/config";
import express from "express";
import { createServer } from "http";
import net from "net";
import path from "path";
import fs from "fs";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { registerOAuthRoutes } from "./oauth";
import { appRouter } from "../routers";
import { createContext } from "./context";
import { serveStatic, setupVite } from "./vite";
import { handleLogin, handleRegister, handleForgotPassword } from "./loginApi";

function isPortAvailable(port: number): Promise<boolean> {
  return new Promise(resolve => {
    const server = net.createServer();
    server.listen(port, () => {
      server.close(() => resolve(true));
    });
    server.on("error", () => resolve(false));
  });
}

async function findAvailablePort(startPort: number = 3000): Promise<number> {
  for (let port = startPort; port < startPort + 20; port++) {
    if (await isPortAvailable(port)) {
      return port;
    }
  }
  throw new Error(`No available port found starting from ${startPort}`);
}

async function startServer() {
  const app = express();
  const server = createServer(app);
  // Configure body parser with larger size limit for file uploads
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));
  
  // 独立的登录页面路由 - 绕过 Manus 平台限制
  app.get('/login', (req, res) => {
    try {
      const loginHtmlPath = path.join(__dirname, '../login.html');
      const loginHtml = fs.readFileSync(loginHtmlPath, 'utf-8');
      res.set('Content-Type', 'text/html; charset=utf-8');
      res.set('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0');
      res.set('Pragma', 'no-cache');
      res.set('Expires', '0');
      res.send(loginHtml);
    } catch (error) {
      console.error('Failed to serve login page:', error);
      res.status(500).send('Error loading login page');
    }
  });

  app.get('/zh/login', (req, res) => {
    try {
      const loginHtmlPath = path.join(__dirname, '../login.html');
      const loginHtml = fs.readFileSync(loginHtmlPath, 'utf-8');
      res.set('Content-Type', 'text/html; charset=utf-8');
      res.set('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0');
      res.set('Pragma', 'no-cache');
      res.set('Expires', '0');
      res.send(loginHtml);
    } catch (error) {
      console.error('Failed to serve login page:', error);
      res.status(500).send('Error loading login page');
    }
  });

  app.get('/en/login', (req, res) => {
    try {
      const loginHtmlPath = path.join(__dirname, '../login.html');
      const loginHtml = fs.readFileSync(loginHtmlPath, 'utf-8');
      res.set('Content-Type', 'text/html; charset=utf-8');
      res.set('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0');
      res.set('Pragma', 'no-cache');
      res.set('Expires', '0');
      res.send(loginHtml);
    } catch (error) {
      console.error('Failed to serve login page:', error);
      res.status(500).send('Error loading login page');
    }
  });

  // Login API endpoint
  app.post('/api/auth/login', handleLogin);
  app.post('/api/auth/register', handleRegister);
  app.post('/api/auth/forgot-password', handleForgotPassword);
  
  // OAuth callback under /api/oauth/callback
  registerOAuthRoutes(app);
  // tRPC API
  app.use(
    "/api/trpc",
    createExpressMiddleware({
      router: appRouter,
      createContext,
    })
  );
  // development mode uses Vite, production mode uses static files
  if (process.env.NODE_ENV === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  const preferredPort = parseInt(process.env.PORT || "3000");
  const port = await findAvailablePort(preferredPort);

  if (port !== preferredPort) {
    console.log(`Port ${preferredPort} is busy, using port ${port} instead`);
  }

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
