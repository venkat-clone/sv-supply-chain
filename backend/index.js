
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const {indexRouter} = require('./routes/index');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const {globalErrorHandler, prismaErrorHandler} = require("./utils/utils");

app.use(cors({
    origin: true,
    credentials: true,
    }
));
app.use(cookieParser());
app.use(express.json());
app.use(express.static('public'));
app.use('/api', indexRouter);
app.use(prismaErrorHandler);
app.use(globalErrorHandler);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
