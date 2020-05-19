let User = require("../models/user");

const getUsers = async () => {

    const user = await User.find()
        .then(users => users)
        .catch(err => {
            throw new Error("error")
        });
    return user;
}

module.exports = {
    getUsers
}