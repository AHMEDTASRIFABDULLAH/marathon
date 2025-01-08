const express = require("express");
const cors = require("cors");
const app = express();
const jwt = require("jsonwebtoken");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const port = process.env.PORT || 5000;
app.use(express.json());
const cookieParser = require("cookie-parser");
const corsOptions = {
  origin: [
    "http://localhost:5173",
    "https://enchanting-buttercream-05a923.netlify.app",
  ],
  credentials: true,
  optionalSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
require("dotenv").config();

// const uri = `mongodb+srv://${process.env.ODERS_USERS}:${process.env.ODER_PASS}@cluster0.hwzxp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
const uri = `mongodb+srv://${process.env.ODERS_USERS}:${process.env.ODER_PASS}@cluster0.hwzxp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
const verifyToken = (req, res, next) => {
  const token = req.cookies?.token;
  if (!token)
    return res.status(401).send({ message: "unAuthorize token access" });
  jwt.verify(token, process.env.SECRET_KEY, (error, decoded) => {
    if (error) {
      return res.status(403).send({ message: "unAuthorize token access" });
    }
    req.user = decoded;
    next();
  });
};
async function run() {
  try {
    const db = client.db("MarathonDB");
    const allMarathon = db.collection("addMarathon");
    const RegistionCollection = db.collection("Registions");
    // create jwt token
    app.post("/jwt", async (req, res) => {
      const email = req.body;
      const token = jwt.sign(email, process.env.SECRET_KEY, {
        expiresIn: "365d",
      });

      res
        .cookie("token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        })
        .send({ seccess: true });
    });
    // Jwt token LogOut browser
    app.get("/token-logout", async (req, res) => {
      res
        .clearCookie("token", {
          maxAge: 0,
          secure: process.env.NODE_ENV === "production",
          sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        })
        .send({ seccess: true });
    });
    // add marathons
    app.post("/add-marathon", verifyToken, async (req, res) => {
      const addMarathon = req.body;
      const result = await allMarathon.insertOne(addMarathon);
      res.send(result);
    });
    // get maratons data
    app.get("/all-marathons", verifyToken, async (req, res) => {
      const sort = req.query.sort === "asc" ? 1 : -1;
      const result = await allMarathon
        .find()
        .sort({ createdAt: sort })
        .toArray();

      res.send(result);
    });
    // details page single data
    app.get("/details/:id", verifyToken, async (req, res) => {
      const id = req.params.id;
      const qurey = { _id: new ObjectId(id) };
      const result = await allMarathon.findOne(qurey);
      res.send(result);
    });
    // Marathon count
    app.post("/registion", async (req, res) => {
      const RegistionData = req.body;
      // User can only regstion  onces time in ones marathon
      const qurey = {
        email: RegistionData.email,
        marathonId: RegistionData.marathonId,
      };
      const alreadyExist = await RegistionCollection.findOne(qurey);

      if (alreadyExist)
        return res.status(400).send("You have already bid on this job!!");
      // save bids
      const result = await RegistionCollection.insertOne(RegistionData);
      // update bid_count in job Collection
      const filter = { _id: new ObjectId(RegistionData.marathonId) };
      const update = {
        $inc: { Marathon_Count: 1 },
      };
      const updateBidCount = await allMarathon.updateOne(filter, update);
      res.send(result);
    });
    // My Marathon List Api data
    app.get("/mymarathon/:email", verifyToken, async (req, res) => {
      const decodedEmail = req.user?.email;
      const sort = req.query.sort === "asc" ? 1 : -1;
      const email = req.params.email;
      const qurey = { buyer: email };
      if (decodedEmail !== email)
        return res.status(401).send({ message: "unAuthorize token access" });
      const result = await allMarathon
        .find(qurey)
        .sort({ createdAt: sort })
        .toArray();
      res.send(result);
    });
    // update marathon
    app.put("/update-marathon/:id", async (req, res) => {
      const UpdateMarathon = req.body;
      const id = req.params.id;

      const updated = {
        $set: UpdateMarathon,
      };
      const options = { upsert: true };
      const filter = { _id: new ObjectId(id) };
      const result = await allMarathon.updateOne(filter, updated, options);
      res.send(result);
    });
    // delete marathon
    app.delete("/delete-marathon/:id", async (req, res) => {
      const id = req.params.id;
      const qurey = { _id: new ObjectId(id) };
      const result = await allMarathon.deleteOne(qurey);
      res.send(result);
    });
    // Apply List data
    app.get("/applylist/:email", verifyToken, async (req, res) => {
      const decodedEmail = req.user?.email;
      const search = req.query.search;
      const email = req.params.email;
      const query = { email };
      if (decodedEmail !== email)
        return res.status(401).send({ message: "unAuthorize token access" });
      if (search) {
        query.marathonTitle = { $regex: search, $options: "i" };
      }
      const result = await RegistionCollection.find(query).toArray();
      res.send(result);
    });
    // Delete Registions data
    app.delete("/delete-applylist/:id", async (req, res) => {
      const id = req.params.id;
      const qurey = { _id: new ObjectId(id) };
      const result = await RegistionCollection.deleteOne(qurey);
      res.send(result);
    });
    // update Reg
    app.put("/update-registion/:id", async (req, res) => {
      const UpdateApplyList = req.body;
      const id = req.params.id;

      const updated = {
        $set: UpdateApplyList,
      };
      const options = { upsert: true };
      const filter = { _id: new ObjectId(id) };
      const result = await RegistionCollection.updateOne(
        filter,
        updated,
        options
      );
      res.send(result);
    });
    // Show six data using Limits()
    app.get("/all-six-Marathons", async (req, res) => {
      const result = await allMarathon.find().limit(6).toArray();
      res.send(result);
    });
  } finally {
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("P_One_Is_Running");
});
app.listen(port, () => {
  console.log(`Server Is Running on :${port}`);
});
