import express from 'express'
export const users = express.Router();
users.post('/signup', (req, res) => {
    console.log(`password ${req.body.password} is not strong`);
    res.send(req.body);
})
