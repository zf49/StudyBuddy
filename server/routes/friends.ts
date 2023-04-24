import { addFriend, checkFollow, checkSelf, deleteFriend, findFriendDetail, findFriends } from "../dao/friend-dao";

var express = require('express');
var router = express.Router();


const HTTP_OK = 200;
const HTTP_CREATED = 201;
const HTTP_NOT_FOUND = 404;
const HTTP_NO_CONTENT = 204;
const HTTP_BAD_REQUEST = 400;


router.post("/add", async (req, res) => {
    await addFriend(req.body.authID, req.body.friendID)
    res.sendStatus(HTTP_OK)
})

router.post("/delete", async (req, res) => {
    await deleteFriend(req.body.authID, req.body.friendID)
    res.sendStatus(HTTP_OK)
})


router.get('/:authID', async (req, res) => {
    const friends = await findFriends(req.params.authID)
    res.json(friends)
})

router.get('/detail/:id', async (req, res) => {
    const detail = await findFriendDetail(req.params.id)
    res.json(detail)

})

router.post('/checkfollow', async (req, res) => {
    const follow = await checkFollow(req.body.authID, req.body.friendID)
    res.json(follow)
})

router.post('/checkself', async (req, res) => {
    const ifSelf = await checkSelf(req.body.authID, req.body.friendID)
    res.json(ifSelf)
})

module.exports = router;