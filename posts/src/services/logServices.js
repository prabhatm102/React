import Raven from "raven-js";

function init() {
  Raven.config(
    "https://45886df21c8046fca6d4d876f5cfd95d@o1092776.ingest.sentry.io/6111581",
    { release: "1-0-0", environment: "development-test" }
  ).install();
}

function log(error) {
  Raven.captureException(error);
}

const logger = {
  init: init,
  log: log,
};

export default logger;
