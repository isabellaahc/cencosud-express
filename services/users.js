const MongoLib = require('../lib/mongo')

class UsersService {

    constructor(){
        this.collection = 'users';
        this.mongoDB = new MongoLib();
    }

    async getUsers(){
        const users = await this.mongoDB.getAll(this.collection)
        return users || [];
    }

    async getUserById({ correo }){
        const users = await this.mongoDB.get(this.collection, correo)
        console.log(users)
        //const userFound = users.find(user => user.correo === correo);
        return users || {};
    }

    async createUser({ user }){
        const userCreate = await this.mongoDB.create(this.collection, user)
        return userCreate;
    }

    async updateCreditUser({ correo , user } = {}){
        const newCreditValue = await this.mongoDB.update(this.collection, correo, user)
        return newCreditValue;
    }

    async deleteCreditUser(){
        const deleteCredit = await Promise.resolve(usersMock);
        return deleteCredit[0];
    }
}

module.exports = UsersService;