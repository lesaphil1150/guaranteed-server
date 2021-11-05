require("dotenv").config();
let express = require("express");
var cors = require("cors");
let app = express();
let sequelize = require("./db");
// let middlewares = require("./middleware");
app.use(cors());
app.use(require("./middleware/cors"));
app.use(express.json());
const controllers = require("./controllers");
app.use("/user", controllers.User);
app.use("/claim", controllers.Claim);
app.use("/warranty", controllers.Warranty);

sequelize
  .authenticate()
  .then(() => sequelize.sync({ force: true }))
  .then(() => {
    app.listen(process.env.PORT, function () {
      console.log(`The app is running on ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.error("unable to connect to database:", err);
  });
