import express from 'express'
import { users } from './routes/users.mjs';
const app = express();
app.use(express.json());
app.use((req, res, next) => {
    req.body.ad = 100;
    next(req, res, next);
})
app.use('/users', users);
const server = app.listen(8050);
server.on('listening', () => console.log(`server is listening on port ${server.address().port}`));
