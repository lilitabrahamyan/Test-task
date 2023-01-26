const express = require("express");
require("dotenv").config();
const cors = require("cors");

const donationAPI = require("./routes/donationsAPI.js");
const ownerAPI = require("./routes/ownerAPI.js");
const campaignApi = require("./routes/campaignAPI.js");

const app  = express();

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/owner', ownerAPI);
app.use('/campaign', campaignApi);
app.use('/donations', donationAPI);
require("./jobs/expTimeJob.js");

app.listen(process.env.PORT, () => {
  console.log('Server start running...');
});
