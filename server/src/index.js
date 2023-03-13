const express = require("express");
const cors = require("cors");
const { port } = require("./config");
const { user } = require("./routes/v1");

const app = express();

app.use(express.json());
app.use(cors());

app.use("/v1/users/", user);

app.get("/", (req, res) => {
    res.send({ message: "On" });
});

app.all("*", (req, res) => {
    res.status(404).send({ error: "end point Error" });
});

app.listen(port, () => {
    console.log("Online: " + port)
});