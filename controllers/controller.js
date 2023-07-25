const IETE = require("../src/model/Defmodel");
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

let errorMessage = {
    name: '',
    email: '',
    password: '',
    college: '',
    department: '',
    contact: '',
    resendCodeError: ''
}

function refresher() {
    errorMessage = {
        name: '',
        email: '',
        password: '',
        college: '',
        department: '',
        contact: '',
        resendCodeError: ''
    }
}

function handleErrors(err) {
    console.log(err.message);
    // console.log(err);
    if (err.message === 'Passwords Do Not Match') {
        errorMessage.password = 'Passwords Do Not Match'
    }
    if (err.message.includes('data validation failed')) {
        Object.values(err.errors).forEach(({ properties }) => {
            errorMessage[properties.path] = properties.message;
        })
    }
    if (err.code === 11000) {
        errorMessage.email = 'Email Already Registered'
    }
    if (err.message === 'No Such User Found') {
        errorMessage.loginError = 'No Such User Found';
    }
    if (err.message === 'Invalid Credentials') {
        errorMessage.loginError = 'Invalid Credentials'
    }
    if (err.message === "Please Verify Your Email") {
        errorMessage.verifierMessage = "Please Verify Your Email"
    }
    if (err.message === 'Email Not Registered') {
        errorMessage.resendCodeError = 'Email Not Registered'
    }
    if (err.message === 'Email Already Verfied') {
        errorMessage.resendCodeError = 'Email Already Verfied'
    }
    return errorMessage;
}


// function to send Verification Email 
const sendEmail = (id, email, name) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.Email,
            pass: process.env.Pass
        },
    });

    const token = jwt.sign({ id }, process.env.VERIFY_EMAIL, { expiresIn: '7m' })

    const mailOptions = {
        from: process.env.Email,
        to: email,
        subject: 'Verification Email',
        html: `<p> Hello ${name}, to verify your email please click on <a href="http://localhost:8000/userVerified/${token}">Verify</a></p>`
        // html: `<p> Hello ${data.name}, to verify your email please click on <a href="https://c544-2405-201-9009-9188-b571-f52c-5cee-c8b5.in.ngrok.io/createUser/${token}">Verify</a></p>`
        // html: `<p> Hello ${name}, to verify your email please click on <a href="https://52e2-2409-40e1-29-9837-3906-c6c5-6be4-96bd.ngrok-free.app/userVerified/${token}">Verify</a></p>`
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log("Email sent" + info.response);
        }
    });
}


const tokenCreator = (id) => {
    return jwt.sign({ id }, process.env.PRIVATE_KEY, { expiresIn: '3d' });
}

const get__landing = (req, res) => {
    res.render("landing");
}

const register__post = async (req, res) => {
    refresher();
    const { name, email, password, cnfpwd, college, department, contact } = req.body;
    console.log(req.body);
    try {
        if (password === cnfpwd) {
            const user = new IETE({
                name, email, password, college, department, contact
            })
            const result = await user.save();
            if (result) {
                sendEmail(result._id, result.email, result.name);
                res.status(201).json({ user: user._id });
            }
        } else {
            throw new Error("Passwords Do Not Match");
        }
    } catch (error) {
        const errors = handleErrors(error);
        res.status(400).json({ errors });
    }
}

const verifier__controller = async (req, res) => {
    const token = req.params.token;
    // console.log(token);
    try {
        const decoded = jwt.verify(token, process.env.VERIFY_EMAIL);
        const id = decoded.id; // getting id back from token
        // console.log(id);
        const user = await IETE.findById({ _id: id });
        user.isVerified = true;
        const result = await user.save();
        if (result) {
            res.send("Email Verified");
        }
    } catch (error) {
        console.log(error);
    }
}

const login__post = async (req, res) => {
    refresher();
    const { email, password } = req.body;
    try {
        const user = await IETE.login(email, password);
        const token = tokenCreator(user._id);
        res.cookie('ietes', token, { httpOnly: true, maxAge: 3 * 1000 * 24 * 60 * 60 })
        res.status(200).json({ user: user._id });
    } catch (error) {
        const errors = handleErrors(error);
        res.status(400).json({ errors });
    }
}

const resend__code = async (req, res) => {
    refresher();
    const { email } = req.body;
    try {
        const user = await IETE.findOne({ email });
        if (user) {
            if (user.isVerified) {
                throw new Error("Email Already Verfied");
            } else {
                sendEmail(user._id, user.email, user.name);
                res.status(200).json(user);
            }
        } else {
            throw new Error("Email Not Registered");
        }
    } catch (error) {
        const errors = handleErrors(error);
        res.status(400).json({ errors });
    }
}


const home__Page = (req, res) => {
    // res.render("home");
    res.render("admins/homeAdmin");
}

module.exports = {
    get__landing,
    register__post,
    login__post,
    resend__code,
    verifier__controller,
    home__Page,
}