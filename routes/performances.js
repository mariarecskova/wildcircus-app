const router = require("express").Router();
let Performance = require("../models/performance");

router.route("/").get((request, response) => {
    Performance.find()
        .then(performances => response.json(performances))
        .catch(err => response.status(400).json("error: " + err));
});
router.route("/add").post((request, response) => {
    const title = request.body.title;
    const description = request.body.description;
    const price = Number(request.body.price);
    const duration = Number(request.body.duration);
    const date = Date.parse(request.body.date);
    const image = request.body.image;

    const newPerformance = new Performance({ title, description, price, duration, date, image }); // with posting this we are creating a new instance

    newPerformance.save() //then we are saving it
        .then(() => response.json("performance added"))
        .catch(err => response.status(400).json("error: " + err));

});

router.route("/:id").get((request, response) => {
    Performance.findById(request.params.id)
        .then(performance => response.json(performance))
        .catch(err => response.status(400).json("error: " + err));
});
router.route("/:id").delete((request, response) => {
    Performance.findByIdAndDelete(request.params.id)
        .then(() => response.json("performance deleted"))
        .catch(err => response.status(400).json("error: " + err));
});

router.route("/update/:id").post((request, response) => {
    Performance.findById(request.params.id)
        .then(performance => {
            performance.title = request.body.title;
            performance.description = request.body.description;
            performance.price = Number(request.body.price);
            performance.date = Date.parse(request.body.date);
            performance.image = request.body.image;
            performance.admin = request.body.admin;


            performance.save()
                .then(() => response.json("performance updated"))
                .catch(err => response.status(400).json("error: " + err));
        })

        .catch(err => response.status(400).json("error: " + err));
}
)
module.exports = router;