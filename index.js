let btnRegister = document.querySelector('#btnRegister');
let btnLogin = document.querySelector('#btnLogin');
let txtPassword = document.querySelector('#registerPassword');
let txtConfirm = document.querySelector('#confirmPass');

txtPassword.addEventListener('change', ()=>{
    passwordsMatch();
});
txtConfirm.addEventListener('change', ()=>{
    passwordsMatch();
});

function passwordsMatch(){
    let password = document.querySelector('#registerPassword').value;
    let confirmPass = document.querySelector('#confirmPass').value;
    if (password != confirmPass){
        txtPassword.classList.add("is-invalid");
        txtConfirm.classList.add("is-invalid");
    }else if(password == confirmPass){
        console.log('passwords are matching.');
        txtPassword.classList.remove("is-invalid");
        txtConfirm.classList.remove("is-invalid");
        txtPassword.classList.add("is-valid");
        txtConfirm.classList.add("is-valid");
    }
}

btnRegister.onclick = ()=>{
    let email = document.querySelector('#registerEmail').value;
    let username = document.querySelector('#registerUsername').value;
    let password = document.querySelector('#registerPassword').value;
    let confirmPass = document.querySelector("#confirmPass").value;
    let civilStatusSelector = document.querySelector("#civilStatus"),
    civilStatusValue = civilStatusSelector.value,
    address = document.querySelector("#addressTextarea").value,
    birthdate = document.querySelector("#startDate").value,
    sexRadios = document.querySelectorAll(".sex");
    for (i = 0; i < sexRadios.length; i++) {
        if (sexRadios[i].checked)
            sex = sexRadios[i].value;
    }
    register(email, username, password, confirmPass, sex, civilStatusValue, address, birthdate);
};

function register(email, username, password, confirmPass, sex, civilStatusValue, address, birthdate){
    if(!email) return alert(`Email is required.`);
    else if(!username) return alert(`Username is required.`);
    else if(!password || !confirmPass) return alert(`Please confirm your password first.`);
    else if (password != confirmPass) return alert(`The passwords do not match.`);
    else if (passValidation(password)) return 0;
    else if (!civilStatusValue) return alert(`Civil Status is required`);
    else if (!address) return alert(`Address is required.`);
    
    let userToCreate = {
        email,
        username,
        password,
        sex,
        civilStatusValue,
        address,
        birthdate
    };
    console.log('typeof userToCreate: ' + typeof userToCreate);
    
    let users = localStorage.getItem('users')!=null;
    if(!users){
        console.log(`[users]:hello :D`);
        users = [userToCreate];//first user to be registered
    }
    //if a user already exists
    else if(users){
        users = JSON.parse(localStorage.getItem('users'));
        users.push(userToCreate);
        console.log(users);
    }

    //store to local store
    localStorage.setItem('users', JSON.stringify(users));
    alert(`user ${userToCreate.username} has been created succesfulle.`);
    window.location.reload();
}

function passValidation(password){
    let check = passConditions(password);
    console.log(`passCondition == ${check}`);
    switch(check){
        case 'minlength':
            console.error(`Password must be more than 7 characters`);
            alert(`Password must be more than 7 characters`);
            return true;
        case 'maxlength':
            console.error(`Password must be less than 65536 characters`);
            alert(`Password must be less than 65536 characters`);
            return true;
        case 'symbol':
            console.error(`Password must have a symbol`);
            alert(`Password must have a symbol`);
            return true;
        case 'number':
            console.error(`Password must have a number`);
            alert(`Password must have a number`);
            return true;
        // case 'nonlatin':
        //     console.log(`Password must have a non-latin symbol`);
        //     alert(`Password must have a non-latin symbol (Hanzi, Hiragana, Katakana, Hangul, Cyrillic, Arabic, etc.)`);
        //     return true;
        default:
            return false;
    }
}

function passConditions(password){
    const symbolRegex = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/;
    var numberRegex = /\d/;
    //const nonLatinRegex = /[^\x00-\x7F]/;
    console.log('password length is: ' + password.length);
    if(password.length <= 7){
        return 'minlength';
    }
    if(password.length >= 65535){
        return 'maxlength'
    }
    if(!symbolRegex.test(password)){
        return 'symbol';
    }
    if(!numberRegex.test(password)){
        return 'number';
    }
    // if(!nonLatinRegex.test(password)){
    //     return 'nonlatin';
    // }
    return 'valid';
}

btnLogin.onclick = ()=>{
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;

    login(email,password);
};

function login(email, password){
    checkEmailUsername(email);
    let users = localStorage.getItem('users');
    if(!users){
        return alert(`No users found.`);
    }

    users = JSON.parse(users);
    let userIndex = users.findIndex((u)=>{
        return u.email == email && u.password == password;
    });
    console.log(userIndex);
    if (userIndex == -1) return alert(`Email or password is invalid.`);

    
    let loginkey = localStorage.getItem('loginkey')!=null;
    if(!loginkey){
        loginkey = "loggedin"; //login key
        
        console.log(loginkey);

        localStorage.setItem("loginkey", JSON.stringify(loginkey));

    }

    //success
    alert(`Welcome ${users[userIndex].username}.`)
    location.assign('products.html');
}

function checkEmailUsername(){

}