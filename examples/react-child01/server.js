const liveServer = require("live-server");
const historyApiFallback = require("connect-history-api-fallback");

const params = {
  port: 8282,
  root: "./dist",
  open: false,
  middleware: [historyApiFallback()],
};

liveServer.start(params);
