const cookieParser = require("cookie-parser")
const authRoutes = require("./routes/auth.routes");
const express = require("express");
const app = express();
const {connectDB} = require("./config/connectDB")
app.use(express.json())
app.use(cookieParser)
app.use("/api/auth",authRoutes)

const PORT = 3000
connectDB().then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});