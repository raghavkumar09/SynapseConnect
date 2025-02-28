import { User } from "../../models/user.model.js";
import { generateErrorMsg } from "../../lib/errorLib.js";

const UserManager = {
    getUserDetail: (searchQuery) => {
        return new Promise((resolve, reject) => {
            User.findOne(searchQuery)
                .then((result) => {
                    resolve(JSON.parse(JSON.stringify(result)));
                })
                .catch((err) => {
                    console.log("get user", err)
                    reject(generateErrorMsg("getUserDetail", err));
                })
        })
    },

    createUser: (payload) => {
        return new Promise((resolve, reject) => {
            User.create(payload)
                .then((user) => {
                    resolve(user);
                })
                .catch((err) => {
                    reject(generateErrorMsg("createUser", err));
                })
        })
    },

    getAllUsers: () => {
        return new Promise((resolve, reject) => {
            User.findAll()
                .then((result) => {
                    resolve(JSON.parse(JSON.stringify(result)));
                })
                .catch((err) => {
                    reject(generateErrorMsg("getAllUsers", err));
                })
        })
    }
}

export { UserManager };