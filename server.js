const express = require('express');
const cors = require("cors");

const app = express();

const corsOptions = {
    origin: "http://localhost:3000"
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


require('./routes/routes')(app);
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(PORT, '번 포트 서버 실행')
})
