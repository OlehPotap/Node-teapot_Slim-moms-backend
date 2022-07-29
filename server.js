const mongoose = require("mongoose");
const app = require("./app");

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Database connection successful");
    app.listen(process.env.PORT, () => {
      console.log(`Server running. Use our API on port: ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
