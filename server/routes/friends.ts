import Joi from "joi";
import { emailSend } from "../controller/emailController";
import { addFriend, checkFollow, checkSelf, deleteFriend, findFriendDetail, findFriends, getUserFriends } from "../dao/friend-dao";
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
    const payloadValidate = Joi.object<IPayload>({
        authID: Joi.string().required(),
        friendID: Joi.string().required()
    }).validate(req.body)

    if (payloadValidate.error ) {
        console.log(payloadValidate.error)
    } else {

        const userFriendsArr = await getUserFriends(payloadValidate.value.authID)

        console.log("userFriends",userFriendsArr)



        await addFriend(payloadValidate.value.authID, payloadValidate.value.friendID)
        const sendEmail:boolean = await emailSend(payloadValidate.value.authID,payloadValidate.value.friendID);
        
        if(sendEmail === false){
            res.sendStatus(HTTP_NOT_FOUND)
        }else{ 
            res.sendStatus(HTTP_OK)
        }
    }
})

router.post("/delete", async (req, res) => {
    const payloadValidate = Joi.object<IPayload>({
        authID: Joi.string().required(),
        friendID: Joi.string().required()
    }).validate(req.body)
    if (payloadValidate.error) {
        console.log(payloadValidate.error)
    } else {
        await deleteFriend(payloadValidate.value.authID, payloadValidate.value.friendID)
        res.sendStatus(HTTP_OK)
    }
})


router.get('/:authID', async (req, res) => {
    const authIDValidate = Joi.string().required().validate(req.params.authID)
    if (authIDValidate.error) {
        console.log(authIDValidate.error)
    } else {
        const friends = await findFriends(authIDValidate.value)
        console.log(friends)

        const uniqueFriendsArr = friends.reduce((unique, current) => {
            const friendID = current.friendID;
            if (!unique.some(friend => friend.friendID === friendID)) {
              unique.push(current);
            }
            return unique;
          }, []);


        res.json(uniqueFriendsArr)
    }
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

router.post('/checkfollow', async (req, res) => {
    const payloadValidate = Joi.object<IPayload>({
        authID: Joi.string().required(),
        friendID: Joi.string().required()
    }).validate(req.body)
    if (payloadValidate.error) {
        console.log(payloadValidate.error)
    } else {
        const ifFollow = await checkFollow(payloadValidate.value.authID, payloadValidate.value.friendID)
        res.json(ifFollow)
    }
})

router.post('/checkself', async (req, res) => {
    const payloadValidate = Joi.object<IPayload>({
        authID: Joi.string().required(),
        friendID: Joi.string().required()
    }).validate(req.body)
    if (payloadValidate.error) {
        console.log(payloadValidate.error)
    } else {
    const ifSelf = await checkSelf(payloadValidate.value.authID, payloadValidate.value.friendID)
    res.json(ifSelf)
    }
})

module.exports = router;