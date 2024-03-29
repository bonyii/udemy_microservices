import express from 'express';
import { json } from 'body-parser';
import { currentUserRouter } from './routes/current_user'
import { signInRouter } from './routes/signin'
import { signOutRouter } from './routes/signout'
import { signUpRouter } from './routes/signup'
import { errorHandler } from './middlewares/error_handler'

const app = express();
app.use(json());


app.use(currentUserRouter);
app.use(signInRouter);
app.use(signOutRouter);
app.use(signUpRouter);
app.use(errorHandler);


app.listen(3000, () => {
    console.log('Listening on port 3000!');
})
