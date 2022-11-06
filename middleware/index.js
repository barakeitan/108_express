let middlewareObject = {};

//a middleware to check if a user is logged in or not
middlewareObject.isNotLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return next();
  }
  res.redirect("/");
};

middlewareObject.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/user/signin");
};

middlewareObject.isAdmin = (req, res, next) => {
  if (!res.locals.currentUser?.userType === "Admin") {
    next();
  }
  res.redirect("/");
}

module.exports = middlewareObject;
