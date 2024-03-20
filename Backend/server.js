const driverRoutes = require("./routes/drivers.js");
const tripRoutes = require("./routes/trips.js");
const patientRoutes = require("./routes/patients.js");
const carRoutes = require("./routes/cars.js");
const planningRoutes = require("./routes/plannings.js");
const authRoutes = require("./routes/auth.js");

const express = require("express");
const cors = require("cors");
const mongoose = require('mongoose');
const app = express();

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,}));

require("dotenv").config();

/* ROUTES */
app.use("/drivers" ,driverRoutes);
app.use("/trips", tripRoutes);
app.use("/patients", patientRoutes);
app.use("/cars", carRoutes);
app.use("/plannings", planningRoutes);

// LOGIN
app.use("/auth", authRoutes);

const PORT = process.env.PORT || 5001;

mongoose.connect(process.env.MONGO_KEY, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
  app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
}).catch((err) => console.log (`${err} did not connect`));