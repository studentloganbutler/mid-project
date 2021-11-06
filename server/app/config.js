// Provides config for the app in conjunction with dotenv
// Config is the only place accesses 'dotenv'
import dotenv from "dotenv";

dotenv.config();

export default {
  db: {
    clientURL: process.env.DB_CLIENT_URL,
    name: "sample_airbnb",
    collectionName: "listingsAndReviews",
  },
  port: process.env.PORT || 3467,
};
