import vendorRouter from './routes/vendorRoutes';
import adminRouter from './routes/adminRoutes';
import authRouter from './routes/authRoutes';
import applicationRoutes from './routes/applicationRoutes';
import stallRoutes from './routes/stallsRoutes';
import fileUpload from 'express-fileupload';

const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(fileUpload());
app.use(express.json());

app.use('/api/v1/vendor', vendorRouter);
app.use('/api/v1/admin', adminRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/application', applicationRoutes);
app.use('/api/v1/stalls', stallRoutes);

export default app;
