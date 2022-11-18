const { Router } = require("express");
const router = Router();
const Product = require("../models/product");
const Category = require("../models/category");
const moment = require("moment");
const { users, broadcast } = require("../wsServer");
const twitterController = require("./twitter.controller");

exports.renderAllProducts = async (req, res) => {
    const successMsg = req.flash("success")[0];
    const errorMsg = req.flash("error")[0];
    const perPage = 8;
    let page = parseInt(req.query.page) || 1;
    try {
        const products = await Product.find({})
            .sort("-createdAt")
            .skip(perPage * page - perPage)
            .limit(perPage)
            .populate("category");

        const count = await Product.count();

        res.render("shop/category", {
            pageName: "All Products",
            products,
            successMsg,
            errorMsg,
            current: page,
            breadcrumbs: null,
            home: "/products/?",
            pages: Math.ceil(count / perPage),
        });
    } catch (error) {
        console.log(error);
        res.redirect("/");
    }
}

exports.renderSearchForProducts = async (req, res) => {
    const perPage = 8;
    let page = parseInt(req.query.page) || 1;
    const successMsg = req.flash("success")[0];
    const errorMsg = req.flash("error")[0];

    try {
        const products = await Product.find({
            title: { $regex: req.query.search, $options: "i" },
        })
            .sort("-createdAt")
            .skip(perPage * page - perPage)
            .limit(perPage)
            .populate("category")
            .exec();
        const count = products?.length;

        res.render("shop/category", {
            pageName: "Search Results",
            products,
            successMsg,
            errorMsg,
            current: page,
            breadcrumbs: null,
            home: "/products/search?search=" + req.query.search + "&",
            pages: Math.ceil(count / perPage),
        });
    } catch (error) {
        console.log(error);
        res.redirect("/");
    }
}

exports.renderCategoryBySlug = async (req, res) => {
    const successMsg = req.flash("success")[0];
    const errorMsg = req.flash("error")[0];
    const perPage = 8;
    let page = parseInt(req.query.page) || 1;
    try {
        const foundCategory = await Category.findOne({ slug: req.params.slug });
        const allProducts = await Product.find({ category: foundCategory.id })
            .sort("-createdAt")
            .skip(perPage * page - perPage)
            .limit(perPage)
            .populate("category");

        const count = await Product.count({ category: foundCategory.id });

        res.render("shop/category", {
            pageName: foundCategory.title,
            currentCategory: foundCategory,
            products: allProducts,
            successMsg,
            errorMsg,
            current: page,
            breadcrumbs: req.breadcrumbs,
            home: "/products/" + req.params.slug.toString() + "/?",
            pages: Math.ceil(count / perPage),
            isAdmin: res.locals.isAdmin
        });
    } catch (error) {
        console.log(error);
        return res.redirect("/");
    }
}

exports.renderProductBySlugAndId = async (req, res) => {
    const successMsg = req.flash("success")[0];
    const errorMsg = req.flash("error")[0];
    try {
        const product = await Product.findById(req.params.id).populate("category");
        res.render("shop/product", {
            pageName: product.title,
            product,
            successMsg,
            errorMsg,
            moment: moment,
        });
    } catch (error) {
        console.log(error);
        return res.redirect("/");
    }
}

exports.renderCreateNewProduct = async (req, res) => {
    const successMsg = req.flash("success")[0];
    const errorMsg = req.flash("error")[0];
    const categories =  res.locals.categories;

    res.render('shop/createProduct',{
        pageName: "New Product",
        successMsg:successMsg,
        errorMsg:errorMsg,
        categories:categories
    });
}

exports.handleCreateNewProduct = async (req, res) => {
    try {
        broadcast("The site manager added a new product");
        twitterController.postTweet();
        const product = new Product({...req.body});
        await product.save();
        res.redirect("/");
    } catch (error) {
        console.log(error);
        res.redirect("/");
    }
}

exports.handleDeleteProduct = async (req, res) => {
    const productId = req.params.productId;
    try {
        await Product.findByIdAndDelete(productId);
        req.flash('success', "product deleted successfully");
        res.redirect("/products");
    } catch (err) {
        console.log(err.message);
        res.redirect("/");
    }
}

exports.renderEditProduct = async (req, res) => {
    const successMsg = req.flash("success")[0];
    const errorMsg = req.flash("error")[0];

    const product = await Product.findById(req.params.productId).populate("category").exec();
    const categories =  res.locals.categories;
    res.render("shop/editProduct",{
        pageName: "Edit Product",
        successMsg:successMsg,
        errorMsg:errorMsg,
        product:product,
        categories:categories
    });
};

exports.handleEditProduct = async (req, res) => {
    try {
        await Product.findByIdAndUpdate(req.params.productId, { ...req.body }).exec();
        req.flash('success', "product updated successfully");
        res.redirect(`/products/${req.body.category}/${req.params.productId}`)
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
};



