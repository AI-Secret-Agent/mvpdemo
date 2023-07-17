const express = require('express');
const axios = require('axios');
const app = express();
app.use(express.json());

app.post('/', async (req, res) => {
  try {
    // Extract variables from headers and request body
    let sourcerow = parseInt(req.headers['sourcerow']);
    let usersub = req.headers['wpurl'];
    let userkey = req.headers['userkey'];
    const posttype = req.headers['posttype'];
    const model = req.body.model;
    const maxTokens = req.body.maxTokens;
    const defaultTitle = req.body.defaultTitle;
    const temperature = req.body.temperature;
    const messages = req.body.messages;

    let headers = {
      'Authorization': `Bearer ${process.env.OPENAI_KEY}`,
      'Content-Type': 'application/json',
      'usersub': usersub,
      'userkey': userkey,
      'posttype': posttype,
      'sourcerow': sourcerow,
      'defaultTitle': defaultTitle,
    };

    let data = {
      model,
      messages,
      max_tokens: maxTokens,
      temperature: temperature,
      logit_bias: { 21481: -100, 7664: -100 },
    };

    let response = await axios.post('https://api.openai.com/v1/chat/completions', data, { headers });
    let newText = response.data.choices[0].message.content;

    // Delay for 1 second before sending the request to the WordPress API
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Send request to WordPress API
    req.headers['usersub'];
    req.headers['userkey'];
    let wordpressResponse = await axios({
      method: 'POST',
      url: `https://${usersub}/wp-json/wp/v2/${posttype}`, // Use posttype from the request headers
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${Buffer.from(userkey).toString('base64')}`,
      },
      data: JSON.stringify({
        'title': "",  // Use defaultTitle instead of newTitle
        'content': newText,
        'status': 'draft',
        'sourcerow': sourcerow,
      }),
    });

    // Respond with the ID of the created post/page
    res.json({ id: wordpressResponse.data.id, sourcerow });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong.', error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Your app is listening on port ${PORT}`);
});
