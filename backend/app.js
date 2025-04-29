const express = require('express');
const bodyParser = require('body-parser');

const rolesRoutes = require('./routes/roles');
const usersRoutes = require('./routes/users');
const roomTypesRoutes = require('./routes/roomTypes');
const roomsRoutes = require('./routes/rooms');
const servicesRoutes = require('./routes/services');
const reservationsRoutes = require('./routes/reservations');
const reservationServicesRoutes = require('./routes/reservationServices');
const paymentsRoutes = require('./routes/payments');
const waitlistRoutes = require('./routes/waitlist');
const specialRequestsRoutes = require('./routes/specialRequests');
const roomStatusHistoryRoutes = require('./routes/roomStatusHistory');
const feedbackRoutes = require('./routes/feedback');

const app = express();
app.use(bodyParser.json());

// Mount routes
app.use('/roles', rolesRoutes);
app.use('/users', usersRoutes);
app.use('/room-types', roomTypesRoutes);
app.use('/rooms', roomsRoutes);
app.use('/services', servicesRoutes);
app.use('/reservations', reservationsRoutes);
app.use('/reservation-services', reservationServicesRoutes);
app.use('/payments', paymentsRoutes);
app.use('/waitlist', waitlistRoutes);
app.use('/special-requests', specialRequestsRoutes);
app.use('/room-status-history', roomStatusHistoryRoutes);
app.use('/feedback', feedbackRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));