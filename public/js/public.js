// if(screen.width<950){
//     alert("Please Use Lndscape Mode For Best Experience")
// }



let main = document.querySelector(".main");
// let robo = document.querySelector(".main .robo");
let robot = document.querySelector(".main .robo .robot");
let circle1 = document.querySelector(".main .robo .circle1");
let circle2 = document.querySelector(".main .robo .circle2");
let content = document.querySelector(".main .content");
// let title = document.querySelector(".main .content .title");
let arrow2 = document.querySelector(".main .content .arrow2");
let button = document.querySelector(".main .content button");
let swiperShow = document.querySelector(".main-container .swiper");
let formContainer = document.querySelector(".form-container");

function explore() {
    main.style.height = '80%';
    // console.log(robot.offsetWidth);
    // robot.style.transform = 'scale(0.7) translate(-250px, 20px)';
    if (screen.width > 1375) {
        robot.style.transform = 'scale(0.75) translate(-250px, 0px)';
        circle1.style.transform = 'scale(0.7) translate(100px, -20px)';
        content.style.transform = 'translateY(-20px)'
    }
    else if (screen.width <= 1375 && screen.width > 1150) {
        robot.style.transform = 'scale(0.75) translate(-250px, 0px)';
        circle1.style.transform = 'scale(0.7) translate(100px, -20px)';
        content.style.transform = 'translateY(-20px)'
        arrow2.style.display = "none";
    } else if (screen.width > 950 && screen.width <= 1150) {
        robot.style.transform = 'scale(0.85) translate(-250px, 0px)';
        circle1.style.transform = 'scale(0.8) translate(40px, -20px)';
        content.style.transform = 'scale(0.85) translateY(-30px)'
    } else {
        robot.style.transform = 'scale(0.85) translate(-260px, 0px)';
        circle1.style.transform = 'scale(0.9)';
        content.style.transform = 'translateY(-20px)'
    }
    circle2.style.display = 'none';
    // content.style.transform = 'scale(0.78, 0.85)'
    // content.style.transform = 'translateY(-20px)'
    button.style.display = 'none';
    swiperShow.style.display = "block";
}

function closeExplore() {
    main.style.height = '100%';
    // console.log(robot.offsetWidth);
    // robot.style.transform = 'scale(0.7) translate(-250px, 20px)';
    if (screen.width > 1375) {
        robot.style.transform = 'translate(-250px, 20px);';
        circle1.style.transform = 'translateX(-50px);';
        content.style.transform = 'translateY(0px)'
    }
    else if (screen.width <= 1375 && screen.width > 950) {
        robot.style.transform = 'translate(-250px, 20px)';
        circle1.style.transform = 'translate(-50px)';
        content.style.transform = 'translateY(0px)';
        arrow2.style.display = "block";
    } else {
        robot.style.transform = 'scale(0.85) translate(-250px, 20px)';
        circle1.style.transform = 'translate(-50px)';
        content.style.transform = 'translateY(0px)';
    }
    // circle2.style.display = 'none';
    circle2.style.display = 'block';
    // content.style.transform = 'scale(0.78, 0.85)'
    // content.style.transform = 'translateY(-20px)'
    button.style.display = 'block';
    swiperShow.style.display = "none";
}

function signInOrUp() {
    main.style.height = '100%';
    let signInOrUp = document.querySelector(".container .main .robo .signInOrUp");
    signInOrUp.style.display = "block";
    if (screen.width > 1150) {
        robot.style.transform = 'scale(0.7) translate(-485px, -90px)';
        circle1.style.transform = 'scale(0.7) translate(-100px, -100px)';
        formContainer.style.display = "flex";
        main.style.width = '95%';
        main.classList.add("mainRegistrationChange");
    }
    else if (screen.width <= 1150 && screen.width > 950) {
        robot.style.transform = 'scale(0.7) translate(-400px, -90px)';
        circle1.style.transform = 'scale(0.7) translate(-100px, -100px)';
        formContainer.style.display = "flex";
        // formContainer.style.transform = "scaleX(1.02)";
        main.style.width = '97.5%';
        main.classList.add("mainRegistrationChange");
    } else {
        robot.style.transform = 'scale(0.65) translate(-440px, -100px)';
        circle1.style.transform = 'scale(0.7) translate(-100px, -100px)';
        formContainer.style.display = "flex";
        main.style.width = '98.5%';
        main.classList.add("mainRegistrationChange");
    }
    content.style.display = "none";
    swiperShow.style.display = "none";
}


// ============== javscript for Registration, login form =====================

function signInRouter(validationMessage) {
    let swapper = document.querySelector(".form-container .swapper");
    let loginMessage = document.querySelector(".form-container .swapper .login__message");
    let registerMessage = document.querySelector(".form-container .swapper .register__message");
    swapper.style.right = '-0.25%';
    loginMessage.style.display = "none";
    registerMessage.style.display = "flex";

    if (validationMessage === 'VerifyMessage') {
        let verification = document.querySelector(".form-container .swapper .verification");
        verification.style.display = "block";
        registerMessage.style.display = "none";
    }
}

function signUpRouter() {
    let swapper = document.querySelector(".form-container .swapper");
    let loginMessage = document.querySelector(".form-container .swapper .login__message");
    let registerMessage = document.querySelector(".form-container .swapper .register__message");
    swapper.style.right = '50.25%';
    loginMessage.style.display = "flex";
    registerMessage.style.display = "none";
}

function goToSecondView() {
    let first__view = document.querySelector(".form-container .registration form .first__view");
    let second__view = document.querySelector(".form-container .registration form .second__view");
    first__view.style.display = "none";
    second__view.style.display = "flex";
}

function goToFirstView() {
    let first__view = document.querySelector(".form-container .registration form .first__view");
    let second__view = document.querySelector(".form-container .registration form .second__view");
    first__view.style.display = "flex";
    second__view.style.display = "none";
}

async function registerUser(e) {
    e.preventDefault();
    const name = document.querySelector(".registration form #name").value;
    const email = document.querySelector(".registration form #email").value;
    const password = document.querySelector(".registration form #password").value;
    const cnfpwd = document.querySelector(".registration form #cnfpwd").value;
    const college = document.querySelector(".registration form #college").value;
    const department = document.querySelector(".registration form #department").value;
    const contact = document.querySelector(".registration form #contact").value;
    let registrationError = document.querySelector(".form-container .swapper .login__message .registrationError");
    registrationError.textContent = '';
    try {
        const res = await fetch("/register__post", {
            method: 'POST',
            body: JSON.stringify({ name, email, password, cnfpwd, college, department, contact }),
            headers: { 'Content-Type': 'application/json' }
        });
        const data = await res.json();
        if (data.errors) {
            if (data.errors.name !== '') {
                registrationError.textContent = data.errors.name;
            } else if (data.errors.email !== '') {
                registrationError.textContent = data.errors.email;
            } else if (data.errors.password !== '') {
                registrationError.textContent = data.errors.password;
            } else if (data.errors.college !== '') {
                registrationError.textContent = data.errors.college;
            } else {
                registrationError.textContent = data.errors.contact;
            }
        } else {
            signInRouter("VerifyMessage")
        }
    } catch (error) {
        console.log(error);
    }
}

async function loginUser(e) {
    e.preventDefault();
    const email = document.querySelector(".login form #email").value;
    const password = document.querySelector(".login form #password").value;
    const loginError = document.querySelector(".login .loginError");
    loginError.textContent = '';

    try {
        const res = await fetch("/login__post", {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: { 'Content-Type': 'application/json' }
        });
        const data = await res.json();
        if (data.errors) {
            if (data.errors.verifierMessage === 'Please Verify Your Email') {
                loginError.textContent = data.errors.verifierMessage;
                let verifyEmail = document.querySelector(".swapper .verifyEmail");
                let register__message = document.querySelector(".swapper .register__message");
                verifyEmail.style.display = "block";
                register__message.style.display = "none";
            } else {
                loginError.textContent = data.errors.loginError;
            }
        } else {
            location.assign("/mainPage");
        }
    } catch (error) {
        console.log(error);
    }
}


// ======== resend code related function =========
function ResendCode() {
    let loginForm = document.querySelector(".login form");
    let resendForm = document.querySelector(".login .ResendCode");
    resendForm.style.display = "block";
    loginForm.style.display = "none";
}

async function redirectToLogin(e) {
    // yaha pe ye bhi check karna hai ki user jo email provide kar raha hai wo registered hai nhi ya nhi and also id email already verified
    e.preventDefault();
    let loginForm = document.querySelector(".login form");
    let register__message = document.querySelector(".swapper .register__message");
    let verification = document.querySelector(".swapper .verification");
    let verifyEmail = document.querySelector(".swapper .verifyEmail");
    let message = document.querySelector(".login .loginError");
    let resendForm = document.querySelector(".login .ResendCode");
    let email = document.querySelector(".login .ResendCode form .input__fields #email").value;
    const res = await fetch("/resend__code", {
        method: 'POST',
        body: JSON.stringify({ email }),
        headers: { 'Content-Type': 'application/json' }
    });
    const data = await res.json();
    if(data.errors){
        message.textContent = data.errors.resendCodeError;
    } else {
        message.textContent = "Email Sent";
        resendForm.style.display = "none";
        loginForm.style.display = "block";
        verifyEmail.style.display = "none";
        register__message.style.display = "flex";
        verification.style.display = "none";
    }
}