const express = require('express');
require('dotenv').config();
const path = require('path')
const app = express();

function logger(req,res,next){
  console.log(req.method, req.url, (new Date()) );
  next()
}

app.use(logger)
app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
})

app.post('/user', (req, res) => {
  const { name, email } = req.body;
  if(!name || !email ){
    return res.status(400).json({message : "Bad Request"});
  }
  res.send(`Hello, ${name}!`);
})



app.get('/user/:id', (req, res) => {
  const id = Number(req.params.id);
  if(!Number(id)) return res.status(400).send('No such user');
  res.send(`User ${id} profile`);
})




app.listen(process.env.PORT, () => {
  console.log(`Server is running on ${process.env.PORT}`);
})
