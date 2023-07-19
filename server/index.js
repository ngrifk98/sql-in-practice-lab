require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const { SERVER_PORT } = process.env;
const {
  getAllClients,
  getPendingAppointments,
  getUpcomingAppointments,
  getPastAppointments, 
  approveAppointment,
  completeAppointment,
  markAppointmentIncomplete,
} = require('./controller.js');

app.use(express.json());
app.use(cors());

// USERS
app.get('/clients', getAllClients);

// APPOINTMENTS
app.get('/pending', getPendingAppointments);
app.get('/upcoming', getUpcomingAppointments);
app.get('/appt', getPastAppointments); // Add this line for past appointments
app.put('/approve', approveAppointment);
app.put('/complete', completeAppointment);
app.put('/incomplete', markAppointmentIncomplete);

app.listen(SERVER_PORT, () => console.log(`Server up on ${SERVER_PORT}`));
