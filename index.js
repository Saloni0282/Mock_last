const express = require('express');
const cors = require('cors');
require("dotenv").config();
const {connection } = require("./config/db");
const { userRouter } = require("./routes/user.routes")
const { authenticate } = require("./middleware/auth.middleware");
const { blogRouter } = require("./routes/blog.routes")
const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send("Home Page");
})
app.use(userRouter);
app.use(authenticate);
app.use(blogRouter);


const PORT = process.env.port || 8080;
app.listen(PORT,async() => {
    try {
        await connection;
        console.log('Connected to db');
        
    } catch (error) {
        console.log('Error connecting to db');
        
    }
    console.log(`Server is listening on ${PORT}`);

})




