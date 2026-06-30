import server from "./server.js";
import env from "./config/env.js";
import prisma from "./config/prisma.js";

const PORT = env.PORT || 3000;

async function start() {
  try {
    await prisma.$connect();

    console.log("✅ Database connected");

    server.listen(PORT, () => {
      console.log(`🚀 Server started on port ${PORT}`);
    });
  } catch (err) {
    console.error("❌ Failed to connect to database:", err);
    process.exit(1);
  }
}

process.on("SIGINT", async () => {
  await prisma.$disconnect();
  process.exit(0);
});

process.on("SIGTERM", async () => {
  await prisma.$disconnect();
  process.exit(0);
});

start();
