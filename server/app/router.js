import Router from "express";
import config from "./config";
import loader from "./loader";
import {ObjectId} from "mongodb";

const collection = loader 
    .db(config.db.name)
    .collection(config.db.collection);
const router = new Router();

// TODO: Add routes here (maybe 🤔 start with a GET test route)
router.get("/", (_, res) => {
    res.send("You have reached the Airbnb router!");
});

// These routes go with localhost:3467


// router.get("/current-listings", async (_, res) => {
//     const listings = await loader
//         .db("sample_airbnb")
//         .collection("listingsAndReviews")
//         .find(Parameters go here)
//         .toArray();
//     res.json(listings);
// });

router.get("/:id", async (req, res) => {
    const id = await loader
        .db("sample_airbnb")
        .collection("listingsAndReviews")
        .findOne({_id: ObjectId(req.params.id)})
        .toArray();
    res.json(id);
});

router.get("/review/:id", async (req, res) => {
    const review = await loader
        .db("sample_airbnb")
        .collection("listingsAndReviews")
        .findOne({_id: ObjectId(req.params.id)})
        .toArray();
    res.json(review);
});

router.post("/review/:id", async (req, res) => {
   const createReview = await collection.insertOne(req.body);
    res.json(createReview);
});


export default router;
