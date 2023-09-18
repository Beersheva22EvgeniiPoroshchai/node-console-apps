import config from 'config';
import express from 'express'   //import from fw
import asyncHandler from 'express-async-handler'
import Joi from 'joi'
import { validate } from '../middleware/validation.mjs';
import UsersService from '../service/UsersService.mjs';
export const users = express.Router();  //create router
const usersService = new UsersService(process.env.ATLAS_URI_ACCOUNTS_TEST, config.get('mongodb.db'));
//const usersService = new UsersService("mongodb+srv://root:12345.com@cluster0.d19qlu2.mongodb.net/users?retryWrites=true&w=majority", config.get('mongodb.db'));
const schema = Joi.object({
    username: Joi.string().alphanum().max(10).required(),
    password: Joi.string().min(5).required(),
    roles: Joi.array().items(Joi.string().valid('ADMIN', 'USER')).required()
})
users.use(validate(schema))
users.post('/signup', async (req, res) => {    //regiser routing '/signup'
    if (!req.validated) {
       res.status(500);
        throw('This API requires validation')
    }
        if (req.joiError) {
        res.status(400);
        throw(req.joiError)
    }
    const accountRes = await usersService.addAccount(req.body);
    if (accountRes == null) {
        res.status(400);
        throw `account ${req.body.username} already exists`
    }
    res.status(201).send(await usersService.addAccount(req.body));

});
users.get("/:username", asyncHandler(
    async (req, res) => {
        const username = req.params.username;
        const account = await usersService.getAccount(username);
        if (!account) {
            res.status(400);
            throw `account ${username} not found`
        }
        res.send(account);
    }
));

