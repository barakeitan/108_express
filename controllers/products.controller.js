const { Router } = require("express");
const router = Router();
const Product = require("../models/product");
const Category = require("../models/category");
const moment = require("moment");

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