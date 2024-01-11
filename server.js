const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


require('./routes/routes')(app);
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(PORT, '번 포트 서버 실행')
})
