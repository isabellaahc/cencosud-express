const express = require('express');
const UsersService = require('../services/users');

function usersApi(app){
    const router = express.Router();
    app.use('/api/users', router)

    const userService = new UsersService();

    router.get('/', async function(req, res, next){
        try {
            const users = await userService.getUsers()
            res.status(200).json({
                data: users,
                message: 'users listed'
            })
        } catch (error) {
            next(error)
        }
    })

    router.get('/:correo', async function(req, res, next){
        try {
            const userFound = await userService.getUserById(req.params.correo)
            res.status(200).json({
                data: userFound,
                message: 'User Found'
            })
        } catch (error) {
            next(error)
        }
    })

    router.post('/', async function(req, res, next){
        const { body: user } = req;

        try {
            const createUserId = await userService.createUser(user)
            const userCreate = createUserId.find(user => user.correo === req.params.correo)
            res.status(201).json({
                data: userCreate,
                message: 'users create'
            })
        } catch (error) {
            next(error)
        }
    })

    router.put('/:correo', async function(req, res, next){
        const { correo } = req.params;
        const { body: user } = req;

        try {
            const update = await userService.updateCreditUser({ correo }, user)
            res.status(200).json({
                data: update,
                message: 'users update'
            })
        } catch (error) {
            console.log(error)
            next(error)
        }
    })

    router.delete('/:correo', async function(req, res, next){
        const { correo } = req.params;
        try {
            const deleteUser = await userService.deleteCreditUser(correo)
            res.status(200).json({
                data: deleteUser,
                message: 'users deleted'
            })
        } catch (error) {
            console.log(error)
            next(error)
        }
    })

    

}

module.exports = usersApi;