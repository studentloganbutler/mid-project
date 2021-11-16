import Router from "express";
import config from "./config.js";
import loader from "./loader.js";
import {} from "mongodb";

const collection = loader 
    .db(config.db.name)
    .collection(config.db.collectionName);
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

router.get("/reviews", async (_, res) => {
    const reviews = await loader
        .db("sample_airbnb")
        .collection("listingsAndReviews")
        .find({})
        .toArray();
        res.json(reviews);
        });


 router.get("/:id", async (req, res) => {
     const id = await loader
         .db("sample_airbnb")
         .collection("listingsAndReviews")
         .findOne({_id: (req.params.id)})
         .toArray();
     res.json(id);
 });

router.get("/reviews/:id", async (req, res) => {
    const review = await loader
        .db("sample_airbnb")
        .collection("listingsAndReviews")
        .findOne({_id: (req.params.id)})
        .toArray();
    res.json(review);
});

router.post("/reviews/:id", async (req, res) => {
   const createReview = await collection.insertOne(req.body);
    res.json(createReview);
});

router.post("/listings", async (req, res) => {
    const createListing = await collection.insertOne(req.body);
    res.json(createListing);
});

router.put("/listings", async (req, res) => {
    const updateListing = await collection.updateOne(
        {_id: (req.body._id)},
        {$set: req.body}
    );
    res.json(updateListing);
});
    
router.delete("/listings", async (req, res) => {
    const deleteListing = await collection.deleteOne(
        {_id: (req.body._id)}
    );
    res.json(deleteListing);
});
    




export default router;
