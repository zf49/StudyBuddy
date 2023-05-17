import Joi from "joi";
import { addFriend, checkFriendRequest, checkFriends, checkSelf, deleteFriend, findFriendDetail, findFriends } from "../dao/friend-dao";
import { isElementAccessExpression } from "typescript";
import jwtDecode, { JwtPayload } from "jwt-decode";
import { jwtDecodeUser } from "../auth/jwt";
import { getUserID } from "../dao/user-dao";

var express = require('express');
var router = express.Router();


const HTTP_OK = 200;
const HTTP_CREATED = 201;
const HTTP_NOT_FOUND = 404;
const HTTP_NO_CONTENT = 204;
const HTTP_BAD_REQUEST = 400;


export interface IPayload {
    authID: string,
    friendID: string
}


router.post("/add", async (req, res) => {
    const authID = jwtDecodeUser(req.headers.authorization)
    const payloadValidate = Joi.object<IPayload>({
        friendID: Joi.string().required()
    }).validate(req.body)
    if (payloadValidate.error) {
        console.log(payloadValidate.error)
    } else {
        await addFriend(authID, payloadValidate.value.friendID)
        res.sendStatus(HTTP_OK)
    }
})

router.post("/delete", async (req, res) => {
    const authID = jwtDecodeUser(req.headers.authorization)
    const payloadValidate = Joi.object<IPayload>({
        friendID: Joi.string().required()
    }).validate(req.body)
    if (payloadValidate.error) {
        console.log(payloadValidate.error)
    } else {
        await deleteFriend(authID, payloadValidate.value.friendID)
        res.sendStatus(HTTP_OK)
    }
})


router.get('/getfriends', async (req, res) => {
    const authID = jwtDecodeUser(req.headers.authorization)
    const friends = await findFriends(authID)
    res.json(friends)

})

router.get('/detail/:id', async (req, res) => {
    const iDValidate = Joi.string().required().validate(req.params.id)
    if (iDValidate.error) {
        console.log(iDValidate.error)
    } else {
        const detail = await findFriendDetail(iDValidate.value)
        res.json(detail)
    }

})

router.post('/checkStatus', async (req, res) => {
    const authID = jwtDecodeUser(req.headers.authorization)
    const payloadValidate = Joi.object<IPayload>({
        friendID: Joi.string().required()
    }).validate(req.body)
    if (payloadValidate.error) {
        console.log(payloadValidate.error)
    } else {
        const userID = await getUserID(authID)
        const ifFriends = await checkFriends(userID, payloadValidate.value.friendID)
        if(ifFriends){
            res.json("friends")
        }else{
        const request = await checkFriendRequest(userID, payloadValidate.value.friendID)
        if(request == "request"){
            res.json("requested")
        }else if(request == "incomingRequest"){
            res.json("incomingRequest")
        }else{
            res.json("none")
        }
        }
    }
})

router.post('/checkself', async (req, res) => {
    const authID = jwtDecodeUser(req.headers.authorization)
    const payloadValidate = Joi.object<IPayload>({
        friendID: Joi.string().required()
    }).validate(req.body)
    if (payloadValidate.error) {
        console.log(payloadValidate.error)
    } else {
        const ifSelf = await checkSelf(authID, payloadValidate.value.friendID)
        res.json(ifSelf)
    }
})

module.exports = router;