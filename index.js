const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const data = require("./data");
const Portfolio = require('./models/portfolio'); 
const portfolioRoute =require('./routes/portflioRoute');
//ROUTE IMPORTS
const authRoute = require("./routes/auth");

dotenv.config();




//mongo db
const dbURL = process.env.MONGO_URL;
console.log(dbURL)
mongoose
  .connect(dbURL)
  .then(() => console.log("DB Connection Successfull!"))
  .catch((err) => {
    console.log(err);
  });


  //MIDDLE
app.use(cors());
app.use(express.json());
app.use("/api/user", authRoute);
app.use("/api/user" ,authRoute);
app.use("/api/user/portfolio",portfolioRoute);


async function insertPortfolioData() {
  try {
    // Clear existing portfolio data if needed
    await Portfolio.deleteMany({});

    // Insert new portfolio data from the 'data' variable
    const portfolios = await Portfolio.create(data);

    // Log a success message when data is inserted
    console.log('Portfolio data inserted successfully.');
  } catch (error) {
    // Handle any errors that occur during the insertion
    console.error('Error inserting portfolio data:', error);
  } finally {
    // Ensure that the database connection is closed, whether the insertion was successful or not
    // mongoose.disconnect();
  }
}


// insertPortfolioData();




  const port = process.env.PORT;

const server = app.listen(port || 5000, () => {
  if (process.env.NODE_ENV !== "production") {
    console.log(`Server is running on port ${port}`);
  }
});

module.exports = app;
module.exports = server;









// IMPORTANT: To prevent this code from running immediately, it's commented out.

// This function inserts portfolio data into the database
// async function insertPortfolioData() {
//   try {
//     // Clear existing portfolio data if needed
//     // await Portfolio.deleteMany({});

//     // Insert new portfolio data from the 'data' variable
//     // const portfolios = await Portfolio.create(data);

//     // Log a success message when data is inserted
//     // console.log('Portfolio data inserted successfully.');
//   } catch (error) {
//     // Handle any errors that occur during the insertion
//     // console.error('Error inserting portfolio data:', error);
//   } finally {
//     // Ensure that the database connection is closed, whether the insertion was successful or not
//     // mongoose.disconnect();
//   }
// }

// Call the function to insert portfolio data
// insertPortfolioData();
