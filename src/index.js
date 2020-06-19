import mongoose from "mongoose";
import util from "util";
import config from "./config/env";
import app from "./config/express";
require("dotenv").config();
const debug = require("debug")("homein-api:index");


// plugin native promise in mongoose
mongoose.Promise = global.Promise;

// connect to mongo db
mongoose.connect(config.db, {
  keepAlive: true,
  useNewUrlParser: true
});

mongoose.connection.on("error", () => {
  throw new Error(`unable to connect to database: ${config.db}`);
});

// print mongoose logs in dev env
if (config.MONGOOSE_DEBUG) {
  mongoose.set("debug", (collectionName, method, query, doc) => {
    debug(`${collectionName}.${method}`, util.inspect(query, false, 20), doc);
  });
}

// module.parent check is required to support mocha watch
// src: https://github.com/mochajs/mocha/issues/1912
if (!module.parent) {
  // listen on port config.port
  let port = getPort(config.env, process.env.PORT, config.port);

  app.listen(port, () => {
    console.log(`server started on port ${port} (${config.env})`);
  });
}

/**
 * If env is production, use port from process.env if available. Otherwise, use
 * port from config files.
 * @param {string} env Environment type i.e. development or production
 * @param {number} envPort Port from environment variable
 * @param {number} configPort Prot from config file
 */
function getPort(env, envPort, configPort) {
  let port;
  if (env === "production") {
    port = envPort || configPort;
  } else {
    port = configPort;
  }

  return port;
}

export default app;
