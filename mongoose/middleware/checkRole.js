module.exports = (req, res, next) => {
    if (req.session.isLoggedIn) {
        return next()
    }
    res.redirect('/login');
};

function checkRole(role) {
    return (req, res, next) => {
        if (req.session.isLoggedIn) {
        if (req.session.userRole == role) {
            return next();
        }
        else{
           return res.redirect('/')

        }
    }
        res.redirect('/login')
    }
}
module.exports=checkRole;