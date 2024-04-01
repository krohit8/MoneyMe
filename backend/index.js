const express=require("express")

const cors=require("cors")
const mainRouter=require("./routes/index")
// const accountRouter=require("../backend/routes/account")
const app=express();
app.use(cors());
app.use(express.json()); //order does matter




app.use("/api/v1",  mainRouter);
app.listen(3000);





































// // const express = require("express");


// // const app=express();
// // app.use(express.json());


// // app.get("/signin", (req,res)=>{

// // })
// // app.get("/signup", (req,res)=>{

// // })
// // app.get("/signin/update", (req,res)=>{

// // })
// // app.listen(3000)


// const express = require("express");


// const app=express();
// let PORT=3000;
// app.listen(PORT, ()=>{
//     console.log(`listening to PORT ${PORT}`);
// })


