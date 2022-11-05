const express = require("express");
const { default: mongoose } = require("mongoose");
const app = express();
require("./db/config");
const User = require("./db/User");
const cors = require("cors");
const Product = require("./db/Product");
const { application } = require("express");

app.use(cors())
app.use(express.json());

// user register endpoint

app.post("/register", async (req, res) => {
    let user = new User(req.body);
    let result = await user.save();
    result = await result.toObject();
    delete result.password;
    res.send(result);
});

// user login endpoint

app.post("/login", async (req, res) => {
    if (req.body.email && req.body.password) {
        const user = await User.findOne(req.body).select("-password");
        if (user) {
            res.send(user);
        } else {
            res.send({ result: "No user Found" })
        }
    } else {
        res.send({ result: "No User Found" })
    }

})

// user add-product endpoint


app.post("/add-product", async (req, res) => {
    const product = new Product(req.body);
    const result = await product.save();
    res.send(result)
})

// user find product endpoint

app.get("/products", async (req, res) => {
    const product = await Product.find();
    if (product.length > 0) {
        res.send(product)
    } else {
        res.send({ result: "No data found" })
    }
})

//delete product endpoint

app.delete("/products/:id", async (req, res) => {
    const result = await Product.deleteOne({ _id: req.params.id })
    res.send(result)
})
 
// find product endpoint

app.get("/products/:id", async (req, res) => {
    const result = await Product.findOne({ _id: req.params.id })
    if (result) {
        res.send(result)
    } else {
        res.send({ result: "No product find" })
    }
})

//update products endpoint

app.put("/products/:id", async (req, res) => {
    let result = await Product.updateOne(
        { _id: req.params.id },
        {
            $set: req.body
        });
    res.send(result)
})

//search data from field endpoint

app.get("/search/:key",async(req,res)=>{
    let result = await Product.find(
     {   "$or":[
               {name:{$regex:req.params.key}},
               {category:{$regex:req.params.key}},
               {price:{$regex:req.params.key}},               
               {company:{$regex:req.params.key}},                 
        ]}
    )
    res.send(result)
})

//home route endpoint

app.get("/", (req, res) => {
    res.send("api working")
})

app.listen(5000);
