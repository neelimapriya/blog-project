import express,{ Application } from "express";
import app from "./app";
import config from "./app/config";

const mongoose = require('mongoose');


async function main() {
  await mongoose.connect(config.DATABASE_URL);
  app.listen(config.port, () => {
    console.log(`Blog Project listening on port ${config.port}`)
  })
}

