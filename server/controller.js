const dotenv = require('dotenv');
const Sequelize = require('sequelize');
dotenv.config();
console.log(process.env.CONNECTION_STRING);
let nextEmp = 5;

const sequelize = new Sequelize(process.env.CONNECTION_STRING, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
});

const getAllClients = (req, res) => {
  sequelize
    .query(`
      SELECT *
      FROM cc_users AS u
      JOIN cc_clients AS c ON u.user_id = c.user_id;
    `)
    .then(dbRes => res.status(200).send(dbRes[0]))
    .catch(err => console.log(err));
};

const getUpcomingAppointments = (req, res) => {
  sequelize
    .query(`
      SELECT a.appt_id, a.date, a.service_type, a.approved, a.completed, u.first_name, u.last_name 
      FROM cc_appointments a
      JOIN cc_emp_appts ea ON a.appt_id = ea.appt_id
      JOIN cc_employees e ON e.emp_id = ea.emp_id
      JOIN cc_users u ON e.user_id = u.user_id
      WHERE a.approved = true AND a.completed = false
      ORDER BY a.date DESC;
    `)
    .then(dbRes => res.status(200).send(dbRes[0]))
    .catch(err => console.log(err));
};

const approveAppointment = (req, res) => {
  let { apptId } = req.body;

  sequelize
    .query(`
      UPDATE cc_appointments
      SET approved = true
      WHERE appt_id = ${apptId};
    `)
    .then(dbRes => {
      res.status(200).send(dbRes[0]);
      nextEmp += 2;
    })
    .catch(err => console.log(err));
};

const getPendingAppointments = (req, res) => {
  sequelize
    .query(`
      SELECT a.appt_id, a.date, a.service_type, a.approved, a.completed, u.first_name, u.last_name 
      FROM cc_appointments a
      JOIN cc_emp_appts ea ON a.appt_id = ea.appt_id
      JOIN cc_employees e ON e.emp_id = ea.emp_id
      JOIN cc_users u ON e.user_id = u.user_id
      WHERE a.approved = false
      ORDER BY a.date DESC;
    `)
    .then(dbRes => res.status(200).send(dbRes[0]))
    .catch(err => {
      console.log(err);
      res.status(500).send("Error fetching pending appointments.");
    });
};

const getPastAppointments = (req, res) => {
  sequelize
    .query(`
      SELECT a.appt_id, a.date, a.service_type, a.approved, a.completed, u.first_name, u.last_name 
      FROM cc_appointments a
      JOIN cc_emp_appts ea ON a.appt_id = ea.appt_id
      JOIN cc_employees e ON e.emp_id = ea.emp_id
      JOIN cc_users u ON e.user_id = u.user_id
      WHERE a.approved = true AND a.completed = true
      ORDER BY a.date DESC;
    `)
    .then(dbRes => res.status(200).send(dbRes[0]))
    .catch(err => {
      console.log(err);
      res.status(500).send("Error fetching past appointments.");
    });
};

const completeAppointment = (req, res) => {
  let { apptId } = req.body;

  sequelize
    .query(`
      UPDATE cc_appointments
      SET completed = true
      WHERE appt_id = ${apptId};
    `)
    .then(dbRes => {
      res.status(200).send(dbRes[0]);
    })
    .catch(err => console.log(err));
};

const markAppointmentIncomplete = (req, res) => {
  let { apptId } = req.body;

  sequelize
    .query(`
      UPDATE cc_appointments
      SET completed = false
      WHERE appt_id = ${apptId};
    `)
    .then(dbRes => {
      res.status(200).send(dbRes[0]);
    })
    .catch(err => console.log(err));
};

module.exports = {
  getAllClients,
  getUpcomingAppointments,
  approveAppointment,
  getPendingAppointments,
  getPastAppointments,
  completeAppointment,
  markAppointmentIncomplete,
};
