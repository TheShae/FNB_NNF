const express = require('express');
const cors = require('cors');
const authMiddleware = require('./middleware/auth');

const healthRoutes = require('./routes/health');
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');
const eventRoutes = require('./routes/events');
const syncRoutes = require('./routes/sync');
const offerRoutes = require('./routes/offers');
const repaymentRoutes = require('./routes/repayments');

const app = express();

app.use(cors());
app.use(express.json());
app.use(authMiddleware);

app.use('/api/v1/health', healthRoutes);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/products', productRoutes);
app.use('/api/v1/events', eventRoutes);
app.use('/api/v1/sync', syncRoutes);
app.use('/api/v1/offers', offerRoutes);
app.use('/api/v1/repayments', repaymentRoutes);

module.exports = app;
