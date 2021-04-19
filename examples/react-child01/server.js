const liveServer = require("live-server");
const historyApiFallback = require("connect-history-api-fallback");

const params = {
  port: 8383,
  root: "./dist",
  open: false,
  middleware: [historyApiFallback()],
};

liveServer.start(params);
