const userServices = require('../services/user.services');

const getUsers = async (request, response) => {

    try {
        const user = await userServices.getUsers();
        response.status(200).json({ user })
    }
    catch (err) {
        res.json({ err: err })

    }
}

module.exports = { getUsers };