const express = require("express");
const cors = require("cors");
const db = require("./config/database");

const requestRoutes = require("./routes/requests");
const adminRoutes = require("./routes/admin");
const userRoutes = require("./routes/users");
const projectRoutes = require("./routes/projects");
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/requests", requestRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/users", userRoutes);
app.use("/api/projects", projectRoutes);
app.get("/", (req, res) => {
    res.send("Backend server is running!");
});

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});