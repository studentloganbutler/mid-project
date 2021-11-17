import Router from "express";
import config from "./config.js";
import loader from "./loader.js";
import {ObjectId} from "mongodb";

const collection = loader 
    .db(config.db.name)
    .collection(config.db.collectionName);
const router = new Router();

// TODO: Add routes here (maybe 🤔 start with a GET test route)
router.get("/", (_, res) => {
    res.send("You have reached the Airbnb router!");
});

// These routes go with localhost:3467

// const currentListings = await collection.find( ).limit().toArray(); 
   // res.json(currentListings);


 router.get("/current-listings", async (req, res) => {
    const filter1 = Object.entries(req.query).reduce((filterAcc, [limit, value]) => {
        filterAcc[limit] = {$regex: value, $options: "i"};
        return filterAcc
    }, {}); 

    console.log(filter1);

    const filter2 = Object.entries(req.query).reduce((filterAcc, [maxprice, value]) => {
        filterAcc[maxprice] = {$regex: value, $options: "i"};
        return filterAcc
    }, {});

    console.log(filter2);

    const filter3 = Object.entries(req.query).reduce((filterAcc, [keywords, value]) => {
        filterAcc[keywords] = {$regex: value, $options: "i"};
        return filterAcc
    }, {});

    console.log(filter3);

     const currentlistings = await collection
         .db(config.db.name)
         .collection(config.db.collectionName)
         .find(filter1, filter2, filter3)
         .toArray();
  res.json(currentlistings);
});

router.get("/reviews", async (_, res) => {
    const reviews = await loader
        .db("sample_airbnb")
        .collection("listingsAndReviews")
        .findOne({})
        res.json(reviews);
        });


 router.get("/:id", async (req, res) => {
     const id = await loader
         .db("sample_airbnb")
         .collection("listingsAndReviews")
         .findOne({_id: req.body.id});
     res.json(id);
 });

router.get("/reviews/:id", async (req, res) => {
    const review = await loader
        .db("sample_airbnb")
        .collection("listingsAndReviews")
        .findOne({_id: req.body.id});
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
        {_id: req.body._id},
        {$set: req.body._id}
    );
    res.json(updateListing);
});
    
router.delete("/listings", async (req, res) => {
    const deleteListing = await collection.deleteOne(
        {_id: req.body._id}
    );
    res.json(deleteListing);
});
    




export default router;
