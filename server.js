const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); // ✅ Enable JSON parsing

// Temporary storage for activities (since we are skipping DB)
let activities = [];

// ✅ Add Activity (POST)
app.post("/add-activity", (req, res) => {
    const { name, category, timeSpent } = req.body;

    if (!name || !category || !timeSpent) {
        return res.status(400).json({ error: "All fields are required" });
    }

    const newActivity = {
        id: Date.now() + Math.random(), // Unique ID
        name,
        category,
        timeSpent,
    };

    activities.push(newActivity);

    res.json({ message: "Activity added successfully", activity: newActivity }); // ✅ Fixed response format
});

// ✅ Get All Activities (GET)
app.get("/activities", (req, res) => {
    res.json(activities);
});

// ✅ Delete an Activity (DELETE)
app.delete("/delete-activity/:id", (req, res) => {
    const { id } = req.params;
    activities = activities.filter((activity) => activity.id !== Number(id)); // ✅ Fixed ID parsing
    res.json({ message: "Activity deleted successfully" });
});

// Start Server
app.listen(PORT, () => console.log(`✅ Backend running on port ${PORT}`));
