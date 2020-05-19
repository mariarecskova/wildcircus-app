let User = require("../models/user");
const bcrypt = require("bcryptjs");
const router = require("express").Router();
const userController = require('../controller/user.controller');

router.get('/', userController.getUsers)


router.post("/register", (request, response) => {
    const username = request.body.username;
    const password = request.body.password;

    const newUser = new User({ username, password });
    newUser.save()
        .then((user) => {
            response.status(201).json({ userId: user._id, username: user.username });
            // Don't forget to send the write http status code everytime ;) 201 = created
            // if you don't want to find them you can use httpstatus package ;) 
        })
        .catch(err => response.status(400).json("error: " + err));

})

router.post("/login", (request, response) => {
    User.findOne({
        username: request.body.username,
        // Here you have something to check with bcrypt, cause the password you're sending is not
        // crypted so it will not be equal 
    })
        .then(user => {
            if (!user) {
                response.redirect('/');
            }
            else {
                bcrypt.compare(request.body.password, user.password, function (error, result) {
                    if (result == true) {
                        console.log("welcome back")
                        response.status(200).json({ response: user._id });
                        // Here you should send back a JWT or a cookie (but JWT is easier)
                    } else {
                        response.status(401).json({ response: "Unauthorized" });
                    }
                })
            }
        })
})

// router.get("/:id", (request, response) => {
//     User.findById(request.params.id)
//         .then(user => response.json(user))
//         .catch(err => response.status(400).json("error: " + err));
// });
// router.delete("/:id", (request, response) => {
//     User.findByIdAndDelete(request.params.id)
//         .then(user => response.json("user deleted"))
//         .catch(err => response.status(400).json("error: " + err));
// });

// router.post("/update/:id", (request, response) => {
//     User.findById(request.params.id)
//         .then(user => {
//             user.userName = request.body.username;

//             user.save()
//                 .then(() => response.json("user updated"))
//                 .catch(err => response.status(400).json("error: " + err));
//         })

//         .catch(err => response.status(400).json("error: " + err));
// }
// )
module.exports = router;

