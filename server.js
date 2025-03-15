const cookieParser = require("cookie-parser")
const express = require("express");

const {connectDB} = require("./config/connectDB")
const authRoutes = require("./routes/auth.routes");
const todoRoutes = require("./routes/todo.routes");

const app = express();
app.use(express.json())
app.use(cookieParser())


app.use("/",todoRoutes)
app.use("/",authRoutes)

const PORT = 3000
connectDB().then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});