const express = require("express");
const mongooes = require("mongoose");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const ip = require("ip");


dotenv.config();

const port = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());


// Connect to MongoDB
mongooes
  .connect("mongodb://localhost/Adit", { useNewUrlParser: true })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    app.listen(port, () => {
      console.log(`http://${ip.address()}:${port}`);
    });
  });

app.use("/api/users", require("./routes/User"));
app.use("/api/properties", require("./routes/Property"));
app.use("/api/admin", require("./routes/Admin"));


