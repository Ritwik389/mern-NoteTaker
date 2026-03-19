// const express = require("express");  // //if using type = module, in package.json then use this

//if u want to use the import syntax go to package.json and there change the type to be module

import express from "express" // if using type = commonjs in package.json then use this
import notesRoutes from "./routes/notesRoutes.js"
import { connectDB } from "./config/db.js";
import dotenv from "dotenv"
import rateLimiter from "./middleware/rateLimiter.js";
import cors from "cors"
import path from "path"
 
dotenv.config();

const app = express();
const PORT = process.env.PORT
const __dirname = path.resolve(); //path of the backend folder(current folder)


//middleware
app.use(express.json()); //parses the json bodies i.e allows to read req.body as title content


//our custom middleware
// app.use((res, req, next)=>{
//     console.log(`req method is ${req.method} and req url is ${req.url}`);
//     next();
// });

//upstash used for rate limiting

if (process.env.NODE_ENV != "production"){
    app.use(cors({
    origin: "http://localhost:5173" 
}))
}
app.use(rateLimiter)
app.use("/api/notes", notesRoutes);

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "../frontend/dist")))

    app.get ("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../frontend/", "dist", "index.html"))
    })
}



// app.get("/api/notes", (req, res)=>{ //If someone sends a GET request to this route, run this code. 
//     res.send("you have 5 notes");   //we send a GET request when we open localhost:5001/api/notes. 
//     //(req,res). req is request, and res is the response sent back, req contains user input, params etc.
// });

// app.post("/api/notes", (req, res)=>{
//     res.status(201).json({message: "note created successfully"});
// });

// app.put("/api/notes/:id", (req, res)=>{
//     res.status(200).json({message:"note updated successfully"});
// });

// app.delete("/api/notes/:id", (req, res)=>{
//     res.status(200).json({message:"note deleted successfully"});
// });
connectDB().then(()=>{ //first we connect to databse and then we start listening for requests


app.listen(PORT , ()=>{
    console.log("Server started on PORT", PORT );
})
});

// if we want to run this script using npm run dev, we have to add or change the scripts section in package.json, to run node server.js when we run dev

// //REST API
// GET = get data
// POST create data
// PUT update data. 
// DELETE delete data


//we can use nodemon instead of node, as nodemon also checks the code for any changes and automatically restarts the port, while in node, it doesn't change until we kill the terminal and rerun npm run dev

// in the package.json we also create a script called start which uses node instead of nodemon as the start script will be run when we deploy the app and then we don't need to listen to any changes