const router = require("express").Router();
let User = require("../models/user");

router.route("/").get((request, response) => {
    User.find()
        .then(users => response.json(users))
        .catch(err => response.status(400).json("error: " + err));
});
router.route("/add").post((request, response) => {
    const username = request.body.username;
    // const password = request.body.password;
    const createdPerformances = request.body.createdPerformances;


    const newUser = new User({ username, createdPerformances }); // with posting this we are creating a new instance

    newUser.save() //then we are saving it
        .then(() => response.json("user added"))
        .catch(err => response.status(400).json("error: " + err));

});

router.route("/:id").get((request, response) => {
    User.findById(request.params.id)
        .then(user => response.json(user))
        .catch(err => response.status(400).json("error: " + err));
});
router.route("/:id").delete((request, response) => {
    User.findByIdAndDelete(request.params.id)
        .then(user => response.json("user deleted"))
        .catch(err => response.status(400).json("error: " + err));
});

router.route("/update/:id").post((request, response) => {
    User.findById(request.params.id)
        .then(user => {
            user.userName = request.body.userName;
            user.createdPerformances = request.body.createdPerformances;


            user.save()
                .then(() => response.json("user updated"))
                .catch(err => response.status(400).json("error: " + err));
        })

        .catch(err => response.status(400).json("error: " + err));
}
)
module.exports = router;
