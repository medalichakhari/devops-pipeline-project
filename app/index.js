const express = require('express');
const { register, metricsMiddleware } = require('./metrics');

const app = express();
const PORT = process.env.PORT || 3000;

// Apply metrics middleware to all routes
app.use(metricsMiddleware);

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Cloud-Native Pipeline Demo!',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

// Prometheus metrics endpoint
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
