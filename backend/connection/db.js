const mongoose=require("mongoose");

const dbConnect= async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI)
        .then(() => {
            console.log("Database Connect 😊")    
        })
    } catch (error) {
        console.log("Error in connection")
    }
}

module.exports=dbConnect;


// const mongoose = require("mongoose");

// const dbConnect = async () => {
//     try {
//         await mongoose.connect(process.env.MONGO_URI, {
//             useNewUrlParser: true,
//             useUnifiedTopology: true,
//         });
//         console.log("✅ Database Connected Successfully");
//     } catch (error) {
//         console.error("❌ Error in DB connection:", error.message);
//         process.exit(1);
//     }
// };

// module.exports = dbConnect;
