const { response } = require("express");
const nodemailer = require("nodemailer");
const Location = require("../models/location")

exports.renderAboutUs = (req, res) => {
    res.render("pages/about-us", {
        pageName: "About Us"
    });
};

exports.renderShippingPolicy = (req, res) => {
    res.render("pages/shipping-policy", {
        pageName: "Shipping Policy",
    });
}

exports.renderCareers = (req, res) => {
    res.render("pages/careers", {
        pageName: "Careers",
    });
}

exports.renderContactUs = (req, res) => {
    const successMsg = req.flash("success")[0];
    const errorMsg = req.flash("error");
    res.render("pages/contact-us", {
        pageName: "Contact Us",
        csrfToken: req.csrfToken(),
        successMsg,
        errorMsg,
    });
}

exports.HandleMapLocations = async (req, res) => {
    const successMsg = req.flash("success")[0];
    const errorMsg = req.flash("error")[0];

    try
    {
        const locations = await Location.find({});
        console.log(locations);
        res.status(200).send({locations:locations});
    }
    catch(error)
    {
        console.log(error);
    }
}

exports.handleContactUs = (req, res) => {
    // instantiate the SMTP server
    const smtpTrans = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            // company's email and password
            user: process.env.GMAIL_EMAIL,
            pass: process.env.GMAIL_PASSWORD,
        },
        tls: {
            rejectUnauthorized: false,
        },
    });

    // email options
    const mailOpts = {
        from: req.body.email,
        to: process.env.GMAIL_EMAIL,
        subject: `Enquiry from ${req.body.name}`,
        html: `
      <div>
      <h2 style="color: #478ba2; text-align:center;">Client's name: ${req.body.name}</h2>
      <h3 style="color: #478ba2;">Client's email: (${req.body.email})<h3>
      </div>
      <h3 style="color: #478ba2;">Client's message: </h3>
      <div style="font-size: 30;">
      ${req.body.message}
      </div>
      `,
    };

    // send the email
    smtpTrans.sendMail(mailOpts, (error, response) => {
        if (error) {
            req.flash(
                "error",
                "An error occured... Please check your internet connection and try again later"
            );
        } else {
            req.flash(
                "success",
                "Email sent successfully! Thanks for your inquiry."
            );
        }
        return res.redirect("/pages/contact-us");
    });
}