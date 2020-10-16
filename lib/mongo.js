const { MongoClient, ObjectId } = require('mongodb');
const { config } = require('../config')

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const DB_NAME = config.dbName;

const MONGO_URI = `mongodb+srv://${USER}:${PASSWORD}@${config.dbHost}/${DB_NAME}?retryWrites=true&w=majority`

class MongoLib {
    constructor(){
        this.client = new MongoClient(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        this.dbName = DB_NAME;
    }

    //usando patron singleton
    connect(){
        if(!MongoLib.connection){
            MongoLib.connection = new Promise((res, rej) => {
                this.client.connect(err => {
                    if(err){
                        rej(err);
                    }

                    console.log('Connected Succesfully to mongo')
                    res(this.client.db(this.dbName))
                })
            })
        }

        return MongoLib.connection;
    }

    getAll(collection){
        return this.connect().then(db => {
            return db.collection(collection).find().toArray();
        })
    }

    get(collection, correo){
        return this.connect().then(db => {
            return db.collection(collection).findOne({ correo: ObjectId(correo)})
        })
    }

    create(collection, data){
        return this.connect().then(db => {
            return db.collection(collection).insertOne(data);
        }).then(result => result.insertedId)
    }

    update(collection, correo, data){
        return this.connect().then(db => {
            return db.collection(collection).updateOne({ correo: ObjectId(correo)}, { $set: data }, { upsert: true});
        }).then(result => result.upsertedId || correo)
    }

    delete(collection, correo){
        return this.connect().then(db => {
            return db.collection(collection).deleteOne({ correo: ObjectId(correo)})
        }).then(() => correo)
    }
}

module.exports = MongoLib;