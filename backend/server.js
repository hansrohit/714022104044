const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const urlRoutes = require("./routes/urlRoutes");
const logger = require("./middleware/logger");

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(logger);

app.use("/", urlRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
