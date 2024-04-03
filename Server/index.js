const express = require('express');
const app = express();
const userRoutes = require('./routes/User');
const profileRoutes = require('./routes/Profile');
const courseRoutes = require("./routes/Course");
const databaseConnect = require('./config/database');
databaseConnect();
const {cloudinaryConnect } = require("./config/cloudinary");
cloudinaryConnect();
const cookieParser = require('cookie-parser');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const dotenv = require('dotenv');
dotenv.config();
const PORT = process.env.PORT || 4000;
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));
app.use(
    fileUpload({
        useTempFiles:true,
        tempFileDir:"/tmp",
    })
);
app.use("/api/v1/auth",userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/course", courseRoutes);
app.get("/",(req,res)=>{
    return res.json({
        success:true,
        message:'Your Server is Up And Running...'
    })
})
app.listen(PORT , () => {
    console.log(`Server Started At ${PORT}`); 
})