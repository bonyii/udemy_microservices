const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors');
const axios = require('axios')

const app = express();
app.use(bodyParser.json());
app.use(cors());

// https://gist.github.com/pawarvijay/057fb5a50342aab619c14da3175ed870
// curl -i -X POST --data '{"content": "hellobello"}' -H "Content-Type: application/json" http://localhost:4001/posts/32/comments --verbose
app.use(bodyParser.urlencoded({ extended: true }));

const commentsByPostId = {};

// Middleware to log (by Boni from stackoverflow)
app.use(function(req, res, next) {
  //console.log('body' + JSON.stringify(req.body))
  next();
})

app.get('/posts/:id/comments', (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);

})

app.post('/posts/:id/comments', async (req, res) => {
  const commentId = randomBytes(4).toString('hex');
  const { content } = req.body;

  const comments = commentsByPostId[req.params.id] || [];

  status = 'pending'
  comments.push({ id: commentId, content, status })
  commentsByPostId[req.params.id] = comments;

  await axios.post('http://localhost:4005/events', {
    type: "CommentCreated",
    data: { id: commentId,
            content,
            status,
            postId: req.params.id }
  })

  res.status(201).send(comments);
})

app.post('/events', async (req, res) => {
  console.log('Event recevied: ', req.body.type);

  const { type, data } = req.body;

  if (type === 'CommentModerated') {
    const { postId, id, content, status } = data;

    const comments = commentsByPostId[postId];

    const comment = comments.find(comment => {
      return comment.id === id;
    })

    comment.status = status;

    await axios.post('http://localhost:4005/events', {
      type: 'CommentUpdated',
      data: {
        id,
        status,
        postId,
        content
      }
    })
  }

  res.send({});
})

app.listen(4001, () => {
  console.log('Listening on 4001');
})
