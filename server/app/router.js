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

// These routes go with localhost:3467


router.get("/current-listings", async (_, res) => {
    const listings = await loader
        .db("sample_airbnb")
        .collection("listingsAndReviews")
        .find()
        .toArray();
    res.json(listings);
});

router.get("/:id", async (req, res) => {
    const id = await loader
        .db("sample_airbnb")
        .collection("listingsAndReviews")
        .findOne({_id: ObjectId(req.params.id)})
        .toArray();
    res.json(id);
});

export default router;
