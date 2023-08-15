const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const app = express();
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json())

//JobPortalApp KfJqXnPUL5kFSzlt

const uri = "mongodb+srv://JobPortalApp:KfJqXnPUL5kFSzlt@cluster0.kjebueb.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const jobCollection = client.db("jobDB").collection("fresherJobs");
    const experienceCollection = client.db("jobDB").collection("experienceJobs");
    const companyCollection = client.db("jobDB").collection("topCompany");
    const questionCollection = client.db("jobDB").collection("questions");

    app.get("/fresherJobs", async (req, res) => {
      const result = await jobCollection.find().toArray()
      res.send(result)
    })
    app.get("/experienceJobs", async (req, res) => {
      const result = await experienceCollection.find().toArray()
      res.send(result)
    })
    app.get("/topCompany", async (req, res) => {
      const result = await companyCollection.find().toArray()
      res.send(result)
    })
    app.get("/questions", async (req, res) => {
      const result = await questionCollection.find().toArray()
      res.send(result)
    })

    

    app.get("/fresherJobs/:id", async (req, res) => {
      const id = req.params.id
      const query = { _id: new ObjectId(id) }
      const result=await jobCollection.findOne(query)
      res.send(result)
    })
    app.get("/experienceJob/:id", async (req, res) => {
      const id = req.params.id
      const query = { _id: new ObjectId(id) }
      const result=await experienceCollection.findOne(query)
      res.send(result)
    })
    app.get("/companyDetails/:id", async (req, res) => {
      const id = req.params.id
      const query = { _id: new ObjectId(id) }
      const result=await companyCollection.findOne(query)
      res.send(result)
    })
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    //     await client.close();
  }
}
run().catch(console.dir);




app.get("/", (req, res) => {
  res.send("Job Portal is Running")
})

app.listen(port, () => {
  console.log(`Job Portal is running on port${port}`)
})