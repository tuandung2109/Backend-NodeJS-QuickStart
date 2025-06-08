import { raw } from "body-parser";
import db from "../models/index";
import { where } from "sequelize";

let getTopDoctorHome = (limitInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = await db.User.findAll({
                limit: limitInput,
                where: { roleId: 'R2' }, // Assuming 'R2' is the role for doctors
                order: [['createdAt', 'DESC']],
                attributes: {
                    exclude: ['passsword', 'image']
                },
                // raw: true,
            })

            resolve ({
                errCode: 0,
                data: users
            })

        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    getTopDoctorHome: getTopDoctorHome
}