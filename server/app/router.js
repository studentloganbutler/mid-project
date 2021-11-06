import Router from "express";
import config from "./config";
import loader from "./loader";
import {ObjectId} from "mongodb";

const {
    db: {name, collectionName},
} = config;

const router = new Router();

// TODO: Add routes here (maybe 🤔 start with a GET test route)
router.get("/", (_, res) => {
    res.send("You have reached the Airbnb router!");
});


export default router;
