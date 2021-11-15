const express = require('express')
const app = express()
const port = 3000

const config = require('./config/key')
const mongoose = require('mongoose')
mongoose.connect(config.mongoURI,{
    useNewUrlParser:true, useUnifiedTopology:true
}).then(() => console.log('connected..'))
  .catch(err => console.log(err))

const bodyParser = require('body-parser');
const { User } = require("./models/User");

//application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));
//application/json
app.use(bodyParser.json());
//라우트
app.get('/', (req, res) => {
  res.send('Hello World!')
})

//회원가입을 위한 라우트
app.post('/register',(req,res) =>{
  //회원가인할 때 필요한 정보를 client에서 가져오면
  //그것들을 데이터 베이스에 넣는다
  const user = new User(req.body)
  user.save((err,userInfo) =>{
    if(err) return res.json({sucess:false, err})
    return res.status(200).json({
      success: true
    })
  }) //몽고db 메서드

})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
