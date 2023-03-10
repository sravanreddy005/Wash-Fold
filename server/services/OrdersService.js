// const mongoose = require('mongoose');
const Sequelize = require('sequelize');
const { getCache, setCache, deleteCache, clearAllCache } = require('../helpers/cache');
const winston = require('../helpers/winston');
const { OrdersModels } = require('../database');
const Op = Sequelize.Op

const cacheData = {
    Modules: {
        key: 'Modules',
        time: '24h'
    },
};

class AdminService {

    /******************* COMMON METHODS *******************/
    addRecordToDB = async (insertData, tableName, cache = true) => {
        return new Promise(async(resolve, reject) => {
            try {
                let result = await OrdersModels[tableName].create(insertData);
                if(result){
                    if(cache){
                        await deleteCache(cacheData[tableName].key);
                    }
                    resolve(true);
                }else{
                    resolve(false);
                }
            } catch (error) {
                reject(error);
            }
        });
    };

    addBulkRecordsToDB = async (insertData, tableName, cache = true) => {
        return new Promise(async(resolve, reject) => {
            try {
                let result = await OrdersModels[tableName].bulkCreate(insertData);
                if(result){
                    if(cache){
                        await deleteCache(cacheData[tableName].key);
                    }
                    resolve(true);
                }else{
                    resolve(false);
                }
            } catch (error) {
                reject(error);
            }            
        });
    };

    getRecordsFromDB(tableName, cache = true, whereData = null, orderBy = []) {
        return new Promise(async (resolve, reject) => {
            try {
                // const records = cache ? await getCache(cacheData[tableName].key) : null;
                const records = null;
                if (cache && records && records.length > 0) {
                    resolve(records);
                } else {
                    let data = await OrdersModels[tableName].findAll({where: whereData},{order: orderBy});
                    if(cache){
                        await setCache(data, cacheData[tableName].key, cacheData[tableName].time);
                    }
                    resolve(data);
                }
            } catch (error) {
                reject(error);
            }
        });
    }

    getRecordsWithJoinFromDB(tableName, whereData = '', includeData, attributes = '') {
        return new Promise(async (resolve, reject) => {
            try {
                let data = await OrdersModels[tableName].findAll({
                    attributes: attributes,
                    where: whereData,
                    order: [['created_at', 'DESC']],
                    include: includeData,
                });
                resolve(data);
            } catch (error) {
                reject(error);
            }
        });
    }

    getOneRecordFromDB(tableName, whereData) {
        return new Promise(async (resolve, reject) => {
            try {
                let resp = await OrdersModels[tableName].findOne({ where: whereData, order: [[ 'createdAt', 'DESC' ]] });
                resolve(resp);
            } catch (error) {
                reject(error);
            }
        });
    }

    getOneRecordWithJoinFromDB(tableName, whereData, includeData) {
        return new Promise(async (resolve, reject) => {
            try {
                let resp = await OrdersModels[tableName].findOne({ 
                    where: whereData,
                    include: includeData,
                 });
                resolve(resp);
            } catch (error) {

                reject(error);
            }
        });
    }

    getRecordsCount(tableName, whereData = '') {
        return new Promise(async (resolve, reject) => {
            try {
                let resp = await OrdersModels[tableName].count({ 
                    where: whereData
                 });
                resolve(resp);
            } catch (error) {
                reject(error);
            }
        });
    }

    updateRecordInDB = async (tableName, updateData, whereData, cache = true) => {
        return new Promise(async (resolve, reject) => {
          try {
            const result = await OrdersModels[tableName].update(updateData, { where: whereData });
            if(cache){
                await deleteCache(cacheData[tableName].key);
            }
            resolve({ success: true });
          } catch (error) {
            reject(error);
          }
        });
    };

    deleteRecordInDB = async (tableName, whereData, cache = true) => {
        return new Promise(async (resolve, reject) => {
          try {
            const result = await OrdersModels[tableName].destroy({ where: whereData });
            if(cache){
                await deleteCache(cacheData[tableName].key);
            }
            resolve({ success: true });
          } catch (error) {
            reject(error);
          }
        });
    };

    deleteAllRecordInDB = async (tableName, whereData = '', cache = true) => {
        return new Promise(async (resolve, reject) => {
          try {
            let result;
            if(whereData){
                result = await OrdersModels[tableName].destroy({ where: whereData });
            }else{
                result = await OrdersModels[tableName].destroy({ truncate: true });
            }            
            if(cache){
                await deleteCache(cacheData[tableName].key);
            }
            resolve(true);
          } catch (error) {
            reject(error);
          }
        });
    };
    /******************* END COMMON METHODS *******************/

}

module.exports = new AdminService;