const express = require('express')
require("dotenv").config()
const chatRouter = express.Router()

const { Configuration, OpenAIApi } = require('openai');

const config = new Configuration({
    apiKey: `${process.env.OPEN_AI_KEY}`,
});

const openai = new OpenAIApi(config);

let bag = [];


chatRouter.get("/dummy",(req,res)=>{
    res.send('welcome')
})

chatRouter.post('/chat', async (req, res) => {

    const payload = req.body.payload;

    try {
        const prompt = `${payload}`;

        const response = await openai.createCompletion({
            model: 'text-davinci-003',
            prompt: prompt,
            max_tokens: 2048,
            temperature: 1,
        });

        const textResponse = response.data.choices[0].text;
        console.log(textResponse);
        bag = textResponse.split(' ');
        res.send({ "ans": `${textResponse}` });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: error.message });
    }
});

module.exports={chatRouter}


