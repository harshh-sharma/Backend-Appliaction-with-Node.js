import dotenv from "dotenv";
import app from "./app.js";
import connectToDB from "./config/db.connection.js";
import cloudinary from "cloudinary";
dotenv.config();

cloudinary.v2.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_CLIENT_SECRET
})


const PORT = process.env.PORT || 3500;

app.listen(PORT,async() => {
    await connectToDB();
    console.log(`server successfully running on http://localhost:${PORT}`);
})