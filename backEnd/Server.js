const mongoose = require('mongoose');
const express = require('express');
require('dotenv').config()
const cors = require('cors')
const bodyParser = require('body-parser'); 
const HomeRouter = require('./routes/HomeRoutes')
const StudentRouter = require('./routes/StudentRoutes')
const AdminRouter = require('./routes/AdminRoutes')
const StudentLogin = require('./routes/StudentLogin')

const app = express()
const PORT = process.env.PORT | 5000

app.use(express.json())
app.use(cors())
app.use('/files',express.static('files'))

main().catch((err) => console.log(err));


async function main() {
  await mongoose.connect(process.env.DATABASE_URL);

  const connectionState = mongoose.connection.readyState;

  if (connectionState === 1) {
    console.log('Connected to MongoDB');
  } else {
    console.log('Unable to connect to MongoDB');
  }
}

const {protect} = require('./middleware/AuthMiddleware')


app.use('/',HomeRouter)
app.use('/student', StudentRouter)
app.use('/login',StudentLogin)
app.use('/admin',AdminRouter)


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });