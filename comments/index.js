const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// https://gist.github.com/pawarvijay/057fb5a50342aab619c14da3175ed870
// curl -i -X POST --data '{"content": "hellobello"}' -H "Content-Type: application/json" http://localhost:4001/posts/32/comments --verbose
app.use(bodyParser.urlencoded({ extended: true }));

const commentsByPostId = {};

app.use(function(req, res, next) {
  console.log('body' + JSON.stringify(req.body))
  next();
})

app.get('/posts/:id/comments', (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);

})

app.post('/posts/:id/comments', (req, res) => {
  const commentId = randomBytes(4).toString('hex');
  const { content } = req.body;

  const comments = commentsByPostId[req.params.id] || [];


  comments.push({ id: commentId, content })
  commentsByPostId[req.params.id] = comments;

  res.status(201).send(comments);
})

app.listen(4001, () => {
  console.log('Listening on 4001');
})
