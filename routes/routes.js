module.exports = (app) => { 
    const userslogin = require('../controller/controller.js');

    app.post('/', userslogin.create);

}