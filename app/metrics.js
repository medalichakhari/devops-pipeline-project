const promClient = require("prom-client");

const register = new promClient.Registry();

promClient.collectDefaultMetrics({ register });

const httpRequestCounter = new promClient.Counter({
  name: "http_requests_total",
  help: "Total number of HTTP requests",
  labelNames: ["method", "route", "status_code"],
  registers: [register],
});

const httpRequestDuration = new promClient.Histogram({
  name: "http_request_duration_seconds",
  help: "Duration of HTTP requests in seconds",
  labelNames: ["method", "route", "status_code"],
  registers: [register],
});

const activeConnections = new promClient.Gauge({
  name: "active_connections",
  help: "Number of active connections",
  registers: [register],
});

const metricsMiddleware = (req, res, next) => {
  if (req.path === "/metrics") {
    return next();
  }

  const start = Date.now();
  activeConnections.inc();

  res.on("finish", () => {
    const duration = (Date.now() - start) / 1000;
    const route = req.route ? req.route.path : req.path;

    httpRequestCounter.inc({
      method: req.method,
      route: route,
      status_code: res.statusCode,
    });

    httpRequestDuration.observe(
      {
        method: req.method,
        route: route,
        status_code: res.statusCode,
      },
      duration
    );

    activeConnections.dec();
  });

  next();
};

module.exports = {
  register,
  metricsMiddleware,
};
