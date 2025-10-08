const bcrypt = require("bcrypt")
const User = require('../models/auth');

exports.getSignup = (req, res) => {
    if (req.session.isLoggedIn) {
        return res.redirect('/');
    }
    res.render('auth/signup', { title: "Signup", error: null });
};

exports.postSignup = async (req, res) => {
    let { email, name, password, role } = req.body
    if (role == undefined) {
        role = "user";
    }
    try {
        let existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.render('auth/signup', { title: "Signup", error: "Email already registered" });
        }

        // Hash Password
        const hashedPassword = await bcrypt.hash(password, 12);

        const user = await User.create({
            name: name,
            email: email,
            password: hashedPassword,
            role
        })
        req.session.isLoggedIn = true;
        req.session.userId = user._id;
        req.session.userRole = user.role;
        res.redirect('/')
        console.log(email, name, password, role)
    } catch (err) {
        res.status(500).render("404", { title: "Signup Failed" });
        console.log("Error whilw Signup", err)
    }
}

exports.getLogin = (req, res) => {
    if (req.session.isLoggedIn) {
        return res.redirect('/');
    }
    res.render('auth/login', { title: "Login", error: null });
}

exports.postLogin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.render("auth/login", {
                title: "Login",
                error: "Invalid Email or Password",
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.render("auth/login", {
                title: "Login",
                error: "Invalid Email or Password",
            });
        }
        req.session.isLoggedIn = true;
        req.session.userId = user._id;
        req.session.userRole = user.role;
        
        console.log("Login successful:", email);
        return res.redirect("/");
    } catch (err) {
        console.log("Error during login:", err);
        res.status(500).render("404", { title: "Login Failed" });
    }
}

exports.getLogout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.log("err while deleting session");
            return res.redirect('/');
        }
        res.redirect('/login');
    })
}