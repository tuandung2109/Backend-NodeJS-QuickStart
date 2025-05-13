// import bcrypt from "bcryptjs/dist/bcrypt";
import bcrypt from 'bcryptjs';
import db from "../models/index";
import { raw } from 'body-parser';
// import user from "../models/user";

let handleUserLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};

            let isExist = await checkUserEmail(email);
            if (isExist) {
                //user already exist

                let user = await db.User.findOne({
                    attributes: ['email', 'roleId', 'password'],
                    where: { email: email } ,
                    raw: true
                });
                if(user) {
                    let check = bcrypt.compare(password, user.password);
                    if(check) {
                        userData.errCode = 0,
                        userData.errMessage = 'OK',
                        console.log(user);
                        delete user.password;
                        userData.user = user;
                    } else {
                        userData.errCode = 3;
                        userData.errMessage = `Wrong password!`;
                    }
                 } else {
                    userData.errCode = 2;
                    userData.errMessage = `User's not found~`
                }

            } else {
                //return error
                userData.errCode = 1;
                userData.errMessage = `Your email isn't exist in our system. Please try other email!`;
            }

            resolve(userData);
        } catch (e) {
            reject(e);
        }
    });
}

let checkUserEmail = (userEmail) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { email: userEmail }
            })
            if(user) {
                resolve(true)
            } else {
                resolve(false)
            }
        } catch (e) {
            reject(e);
        }
    });
}

// let getAllUsers = (userId) => {
//     return new Promise(async (resolve, reject) => {
//         try {
//             let users = '';
//             if (userId === 'ALL') {
//                 users = await db.User.findAll({
//                     attributes: {
//                         exclude: ['password']
//                     }
//                 })
//             } 
//             if (userId && userId !== 'All') {
//                 users = await db.User.findOne({
//                     where: { id: userId },
//                     attributes: {
//                         exclude: ['password']
//                     }
//                 })    
//             }
//             resolve(users)
//         } catch (e) {
//             reject(e);
//         }
//     })
// }

let getAllUsers = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = [];
            if (userId === 'ALL') {
                users = await db.User.findAll({
                    attributes: {
                        exclude: ['password']
                    }
                });
            } else if (userId) {
                const user = await db.User.findOne({
                    where: { id: userId },
                    attributes: {
                        exclude: ['password']
                    }
                });
                users = user ? [user] : []; // Nếu không tìm thấy user, trả về mảng rỗng
            }
            resolve(users);
        } catch (e) {
            reject(e);
        }
    });
};

module.exports = {
    handleUserLogin: handleUserLogin,
    getAllUsers: getAllUsers, // ✅ Thêm dòng này để export
};

