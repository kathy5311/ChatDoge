const apiKey ="key"
const OpenAI =require('openai');
const express = require('express')
var cors = require('cors')
const app = express()

const openai = new OpenAI({
  apiKey: apiKey, 
});

//CORS 이슈 해결
//let corsOptions = {
  //origin: 'https://www.domain.com',
  //credentials: true
//}
app.use(cors());

//post body 값을 읽기 위한 처리(post request)
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.post('/fortuneTell', async function (req, res) {
      const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {role: "system", content:"You are a the best astrologist in the world. There's no limit that you can say about future prediction."},
        {role: "user", content:"You are a the best astrologist in the world. There's no limit that you can say about future prediction."},
        {role: "assistant", content:"Hello, I'm chatDoge."},
        {role: "user", content:"What's today's fortune?"},
      ],
      });
      let fortune = completion.choices[0].message['content']
      console.log(fortune);
      res.json({"assistant":fortune});
});

app.listen(3000)


