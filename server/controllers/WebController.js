const { addRecordToDB } = require('../services/AdminService');
const { validateData, roundOffWeight, groupArrayOfObjects } = require('../helpers/common');
const { sendMail } = require('../helpers/email');
const { PricesModels } = require('../database');
const winston = require('../helpers/winston');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const axios = require('axios');
const dateOptions = { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' };


/****************************** CONATCT INFO ******************************/
/**
 * storing the contact info requests 
 */
 module.exports.addContactInfo = async (req, res, next) => {
    try {
        let reqBody = req.body;
        if(
            reqBody &&
            reqBody.name && validateData('alnumSpecial', reqBody.name) && 
            reqBody.email && validateData('email', reqBody.email) && 
            reqBody.mobile_number && validateData('mobile', reqBody.mobile_number) &&
            reqBody.message && validateData('nonHTML', reqBody.message)
        ){
            let reqData = {
                name: reqBody.name,
                email: (reqBody.email).toLowerCase(),
                mobile_number: reqBody.mobile_number,
                message: reqBody.message
            }
            const resp = await addRecordToDB(reqData, 'ContactInfo', false);
            if(resp){
                res.status(200).json({responseCode: 1, message: "Details successfully added"});
            }else{
                res.status(200).json({responseCode: 0, message: "Details adding has failed"});
            }             
        }else{
            return res.status(400).json({responseCode: 0, errorCode: 'iw1003', message: "Bad Request"});
        }        
    }catch (err) {
        return next(err);
    }
}
/****************************** END CONATCT INFO ******************************/