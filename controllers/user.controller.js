const User = require('../models/user');
const Order = require('../models/order');
const Cart = require('../models/cart');

exports.renderSignUp = (req, res) => {
    const errorMsg = req.flash("error")[0];
    res.render("user/signup", {
        csrfToken: req.csrfToken(),
        errorMsg,
        pageName: "Sign Up",
    });
}


exports.handleSignUp = async (req, res) => {
    try {
        //if there is cart session, save it to the user's cart in db
        if (req.session.cart) {
            const cart = await new Cart(req.session.cart);
            cart.user = req.user._id;
            await cart.save();
        }
        // redirect to the previous URL
        if (req.session.oldUrl) {
            var oldUrl = req.session.oldUrl;
            req.session.oldUrl = null;
            res.redirect(oldUrl);
        } else {
            res.redirect("/user/profile");
        }
    } catch (err) {
        console.log(err);
        req.flash("error", err.message);
        return res.redirect("/");
    }
}


exports.renderSignIn = async (req, res) => {
    const errorMsg = req.flash("error")[0];
    res.render("user/signin", {
        csrfToken: req.csrfToken(),
        errorMsg,
        pageName: "Sign In",
    });
};

exports.handleSignIn = async (req, res) => {
    try {
        // cart logic when the user logs in
        let cart = await Cart.findOne({ user: req.user._id });
        // if there is a cart session and user has no cart, save it to the user's cart in db
        if (req.session.cart && !cart) {
            const cart = await new Cart(req.session.cart);
            cart.user = req.user._id;
            await cart.save();
        }
        // if user has a cart in db, load it to session
        if (cart) {
            req.session.cart = cart;
        }
        // redirect to old URL before signing in
        if (req.session.oldUrl) {
            var oldUrl = req.session.oldUrl;
            req.session.oldUrl = null;
            res.redirect(oldUrl);
        } else {
            res.redirect("/user/profile");
        }
    } catch (err) {
        console.log(err);
        req.flash("error", err.message);
        return res.redirect("/");
    }
}


exports.renderUserProfile = async (req, res) => {
    const successMsg = req.flash("success")[0];
    const errorMsg = req.flash("error")[0];
    try {
        // find all orders of this user
        allOrders = await Order.find({ user: req.user });
        res.render("user/profile", {
            orders: allOrders,
            errorMsg,
            successMsg,
            pageName: "User Profile",
        });
    } catch (err) {
        console.log(err);
        return res.redirect("/");
    }
}

exports.handleLogOut = (req, res) => {
    req.logout(function(err) {
        if (err)
        {
             console.log('error logging out') 
             // TODO: add flash with error logout failed
        }
        else
        {
            req.session.cart = null;
            res.redirect("/");
        }
      });
}

exports.renderAdminPage = async(req, res) => {
    const orders = await Order.find({}).exec();

    res.render("user/admin", {
        // csrfToken: req.csrfToken(),
        // errorMsg: req.flash("error")[0],
        orders:orders,
        pageName: "Admin",
    });
}


