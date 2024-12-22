import express, { Application } from "express";
import app from "./app";
import config from "./app/config";
import { Server } from "http";

let server: Server;
const mongoose = require("mongoose");

async function main() {
  try {
    await mongoose.connect(config.DATABASE_URL as string);

    app.listen(config.port, () => {
      console.log(`Blog project app listening on port ${config.port}`);
    });
  } catch (err) {
    console.log(err);
  }
}
main();

process.on("unhandledRejection", () => {
  console.log(`😈 unaHandledRejection is detected , shutting down ...`);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

process.on("uncaughtException", () => {
  console.log(`😈 uncaughtException is detected , shutting down ...`);
  process.exit(1);
});
