import jwt from "jsonwebtoken";
import config from "../config/config.js";
import { UserManager } from "../data/manager/user.manager.js";

export const generateAuthToken = (userDetails) => {
	return new Promise((resolve, reject) => {
		try {
			let tokenSession = Math.floor((Date.now() + 1 * (config.token.tokenDuration) * 60 * 60 * 1000) / 1000); // Current Date + days + hours + minutes + seconds + milliseconds
			let tokenPlayload = {
				user_id: userDetails.id,
				email: userDetails.email,
				exp: tokenSession
			}
			resolve(jwt.sign(tokenPlayload, config.token.secret));
		} catch (error) {
			reject(error);
		}
	})
} 

export const valiadateAccessToken = async (req, res, callback) => {
    try {
        let authHeader = req.headers.token || req.headers["authorization"] || req.headers["Authorization"];
        let accessToken = authHeader && authHeader.split(' ') ? authHeader.split(' ')[1] : authHeader;
        req.user = {}
        if (accessToken) {
            jwt.verify(accessToken, config.token.secret, async (err, decoded) => {                
                if (decoded) {
                    let currentTimeStamp = Math.floor((Date.now()) / 1000);
                    if (decoded.exp < currentTimeStamp) {
                        return res.status(401).send({ success: false, message: 'Token Expired' });
                    }

                    let userProfile;
                    let searchQuery = {
                        where: {
                            id: decoded.user_id
                        },
                        attributes : ['id', 'email', 'password', 'status'] // show in frontend or user profile
                    }
                    userProfile = await UserManager.getUserDetail(searchQuery);
                    if (!userProfile) {
                        return res.status(404).json({ success: false, message: 'User not found' });
                    }
                    req.user = userProfile;

                    return callback(null, userProfile, req.user);
                    
                }
            });
        } else {
            res.status(401).send({ success: false, message: 'Invalid token' });
        }
    } catch (error) {
        console.log(error);
		res.status(403).send({ success: false, message: 'Invalid token' });
    }
}