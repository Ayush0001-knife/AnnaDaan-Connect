const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { default: mongoose } = require("mongoose");
const userRouter = require("./routes/donorRouter");
const ngoRouter = require("./routes/ngoRouter");


const app = express();
const PORT = 3003;

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/donor", userRouter);
app.use("/ngo",ngoRouter)


mongoose
  .connect(
    "mongodb+srv://AyushGautam:ayushgautam2006@ayushgautamcluster.hxz64on.mongodb.net/AnnaDaanConnect?retryWrites=true&w=majority&appName=AyushGautamCluster"
  )
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB", err);
  });