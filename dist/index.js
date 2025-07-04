// server/index.ts
import express from "express";
import { createServer as createServer2 } from "http";

// server/routes.ts
import { createServer } from "http";

// server/storage-simple.ts
var SimpleMemStorage = class {
  async getHealth() {
    return { status: "ok", message: "Simple storage running" };
  }
};
var simpleStorage = new SimpleMemStorage();

// server/routes.ts
async function registerRoutes(app2) {
  app2.get("/api/health", async (req, res) => {
    const health = await simpleStorage.getHealth();
    res.json(health);
  });
  const server2 = createServer(app2);
  return server2;
}

// server/index.ts
import path from "path";
import fs from "fs";
var app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "healthy",
    timestamp: (/* @__PURE__ */ new Date()).toISOString(),
    port: process.env.PORT || 5e3
  });
});
var server = createServer2(app);
async function initializeApp() {
  try {
    console.log("Initializing application...");
    console.log("Registering API routes...");
    await registerRoutes(app);
    console.log("API routes registered");
    console.log("Setting up static file serving...");
    app.use(express.static("client"));
    app.get("*", (req, res) => {
      const indexPath = path.resolve("client", "index.html");
      if (fs.existsSync(indexPath)) {
        res.sendFile(indexPath);
      } else {
        res.status(200).send(`
          <!DOCTYPE html>
          <html lang="en">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Inkwell Academy Labs</title>
            <script src="https://cdn.tailwindcss.com"></script>
          </head>
          <body class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            <div class="container mx-auto px-4 py-16">
              <div class="text-center mb-12">
                <h1 class="text-5xl font-bold text-blue-600 mb-4">Inkwell Academy Labs</h1>
                <p class="text-xl text-gray-700 mb-2">South African Multi-Subject Learning Platform</p>
                <p class="text-sm text-gray-600">Aligned with CAPS Curriculum \u2022 Grades 7-12</p>
              </div>
              <div class="text-center">
                <p class="text-gray-600 mb-4">Server is running successfully</p>
                <div class="inline-flex items-center px-4 py-2 bg-green-100 rounded-full text-green-700 text-sm">
                  <span class="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  System Online - Ready for Learning
                </div>
              </div>
            </div>
          </body>
          </html>
        `);
      }
    });
    console.log("Application initialized successfully");
  } catch (error) {
    console.error("Failed to initialize application:", error);
    console.error("Stack trace:", error.stack);
    process.exit(1);
  }
}
var PORT = parseInt(process.env.PORT || "5000", 10);
initializeApp().then(() => {
  server.listen(PORT, "0.0.0.0", () => {
    console.log(`\u{1F680} Server running on port ${PORT}`);
    console.log(`\u{1F310} Application ready at http://0.0.0.0:${PORT}`);
    console.log(`\u2705 Server is accepting connections`);
  });
}).catch((error) => {
  console.error("\u274C Failed to initialize application:", error);
  process.exit(1);
});
server.on("error", (err) => {
  console.error("\u274C Server error:", err);
  process.exit(1);
});
server.on("listening", () => {
  console.log(`\u{1F3AF} Server successfully bound to port ${PORT}`);
});
