const express = require("express");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 10000;

app.use(express.json());

let tokens = JSON.parse(fs.readFileSync("tokens.json")).tokens;

app.post("/api/login", (req, res) => {

    const token = req.body.identity;

    if (!token)
        return res.status(400).json({ error: "No token provided" });

    if (tokens.includes(token))
    {
        return res.json({
            token: "valid"
        });
    }

    return res.status(401).json({
        error: "Invalid token"
    });
});

app.listen(PORT, () => {
    console.log("Auth server running on port " + PORT);
});
