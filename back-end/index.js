const express = require("express");
const app = express();

const cors = require("cors");
const { json } = require("express");

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());

