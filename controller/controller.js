const UsersLogin = require('../model/userslogin.js');

exports.create = (req, res) => {
    const userslogin = new UsersLogin({
        roomid: req.body.roomid, 
        email: req.body.email
   });
   userslogin.save()
   res.send(userslogin);
   res.redirect("/")
};
