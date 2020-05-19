const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config(); //configures the environment variables
const app = express();
const port = process.env.PORT || 5000;//we create our express server
app.use(cors());//middleware
app.use(express.json());//parse JSON data


const uri = process.env.ATLAS_URI;//we need to get it from Mongo Atlas- env var.
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })

const connection = mongoose.connection;
connection.once("open", () => {
    console.log("MongoDB datababase connection established");
})

const usersRouter = require("./routes/users.routes");
const performancesRouter = require("./routes/performances.routes");

app.use("/users/routes", usersRouter);
app.use("/performances/routes", performancesRouter);


app.listen(port, () => { //this is what starts the server
    console.log(`server is running on port: ${port}`);
}
);
