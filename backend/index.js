const express = require('express');
const cors = require('cors');
const app = express();

const { PORT } = require('./util/config');
const { connectToDatabase } = require('./util/db');

// Import controllers
const usersRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');
const bookingsRouter = require('./controllers/bookings');
const equipmentsRouter = require('./controllers/equipments');
const equipmentTypesRouter = require('./controllers/equipment_types');
const eventsRouter = require('./controllers/events');

app.use(express.json());
app.use(cors());

// Define routes
app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);
app.use('/api/bookings', bookingsRouter);
app.use('/api/equipments', equipmentsRouter);
app.use('/api/equipmentTypes', equipmentTypesRouter);
app.use('/api/events', eventsRouter);

const start = async () => {
  await connectToDatabase();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

start();
