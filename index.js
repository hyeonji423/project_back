const PORT = 8000;

const express = require("express");
const cors = require("cors");
const authRouter = require('./routes/authRoutes')

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("auth server test running");
});

app.use('/auth', authRouter) // http://localhost:8000/auth/register 엔드포인트


app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
