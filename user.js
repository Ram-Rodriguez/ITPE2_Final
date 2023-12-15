//run this in webpage load
document.addEventListener('DOMContentLoaded', ()=>{
    let loggedinkey = localStorage.getItem("loginkey");
    JSON.parse(loggedinkey);
    if(!loggedinkey){
        alert("Session expired, please relog in.")

        location.assign("index.html");
    }

    let cartNumber = document.querySelector("#cartItems");
    cartNumber.innerHTML = JSON.parse(localStorage.getItem("cart")).length;
});

let btnProducts = document.querySelector("#btnProductList");
let btnCartItems = document.querySelector("#btnCartLists");

btnProducts.onclick = ()=>{
    location.assign("products.html");
}

btnCartItems.onclick = ()=>{
    location.assign("cart.html");
}

/*$(function () { 
    $("#datepicker").datepicker({  
        autoclose: true,  
        todayHighlight: true, 
    }).datepicker('update', new Date()); 
}); */

let userPage = document.addEventListener("load", getInfo());
let btnUpdate = document.querySelector("#btnUpdate");
let btnSave = document.querySelector("#btnSave");
let btnConfirmDelete = document.querySelector("#btnConfirmDelete");

btnUpdate.onclick = ()=> {
    /*let formGroup = document.querySelectorAll('.form-control');
    let sexCS = document.querySelectorAll('#txtUserCS, #txtUserSex');
    let sexLabel = document.querySelectorAll('#labelSex');
    let divSexCS = document.querySelectorAll(".selectCS, .radioSex");
    let Male = "Male", Female = "Female";
    
    if(sexCS.length != null){
        for(i = 0; i < sexCS.length; i++){
            sexCS[i].remove();
        } 
    }
    
    if(formGroup.length != null){
        for(i = 0; i < formGroup.length; i++){
             formGroup[i].removeAttribute('readonly');   
        }     
    }    

    if(sexLabel.length != null){
        for(i = 0; i < sexLabel.length; i++){
            sexLabel[i].remove();     
        }    
    }    

    if(divSexCS.length != null){
        for(i = 0; i < divSexCS.length; i++){
            divSexCS[i].remove();     
        }    
    }    

    let rowContainer = document.querySelectorAll(".row");
    let colContainer = document.createElement("div");

    rowContainer[0].appendChild(colContainer);

    var h6 = document.createElement('h6');
    node = document.createTextNode("Sex:");
    h6.appendChild(node);
    colContainer.appendChild(h6);

    createOptionRadio(Male);
    createOptionRadio(Female);

    function createOptionRadio(string) {
        let rowContainer = document.querySelectorAll(".row");
        let colContainer = document.createElement("div");

        rowContainer[0].appendChild(colContainer);

        var container = document.createElement('div');
        container.className = `form-check`;
    
        var input = document.createElement('input') || [];
        input.type = "radio";
        input.className = "form-check-input sex:";
        input.value = 1;
        input.id = string;
        input.name = "sex";
        input.setAttribute('checked', true);
    
        var label = document.createElement('label');
        label.value = string
        label.setAttribute("for", string);
    
        colContainer.appendChild(container);
        container.appendChild(input);
        container.appendChild(label);
    
        return rowContainer;
    };*/

    getInfoModal();
}

btnSave.onclick = () => {
    let email = document.querySelector("#txtUpdateEmail").value,
        name = document.querySelector("#txtUpdateName").value,
        oldpassword = document.querySelector("#txtOldPassword").value,
        civilStatusSelector = document.querySelector("#civilStatus"),
        civilStatusValue = civilStatusSelector.value,
        address = document.querySelector("#updateaddressTextarea").value,
        newPassword = document.querySelector("#txtNewPassword").value,
        birthdate = document.querySelector("#modalDate").value,
        sexRadios = document.querySelectorAll(".sex");
        for (i = 0; i < sexRadios.length; i++) {
            if (sexRadios[i].checked)
                sex = sexRadios[i].value;
        }
                 
    updateInfo(email, name, oldpassword, newPassword, sex, civilStatusValue, address, birthdate);
    getInfo();
}

btnConfirmDelete.onclick = ()=>{
    let password = document.querySelector("#txtDeletePassword").value,
    confirmPassword = document.querySelector("#txtDeleteConfirmPassword").value;

    deleteAccount(password, confirmPassword);
}


function getInfo() {
    let user = JSON.parse(localStorage.getItem("users")),
    name = user[0].username,
    email = user[0].email,
    password = user[0].password.length,
    sex = user[0].sex,
    civilStatus = user[0].civilStatusValue
    address = user[0].address,
    birthdate = user[0].birthdate;

    for(i = 0; i < password; i++){
        password += "*";
    }

    if(sex == 1){
        sex = "Male";
    } else {
        sex = "Female";
    }

    if(civilStatus == 1) {
        civilStatus = "Single"
    } else if(civilStatus == 2) {
        civilStatus = "Married"
    } else if (civilStatus == 3) {
        civilStatus = "Widow"
    }

    //document.querySelector("#txtWelcomeBanner").innerHTML = `Welcome, ${name}`

    document.querySelector("#txtUserName").value = `${name}`
    document.querySelector("#txtUserEmail").value = `${email}`
    document.querySelector("#txtUserPassword").value = `${password}`
    document.querySelector("#txtUserSex").value = `${sex}`
    document.querySelector("#txtUserCS").value = `${civilStatus}`
    document.querySelector("#txtaddressTextarea").value = `${address}`
    document.querySelector("#startDate").value = `${birthdate}`
}

function getInfoModal() {
    let user = JSON.parse(localStorage.getItem("users")),
    name = user[0].username,
    email = user[0].email,
    sex = user[0].sex,
    civilStatus = user[0].civilStatusValue;
    address = user[0].address,
    birthdate = user[0].birthdate;

    if(sex == 1){
        let male = document.querySelector("#male"),
        female = document.querySelector("#female");

        male.setAttribute("checked", "true");
        female.removeAttribute("checked");
    } else {
        let male = document.querySelector("#male"),
        female = document.querySelector("#female");

        female.setAttribute("checked", "true");
        male.removeAttribute("checked");
    }

    if(civilStatus == 1){
        let single = document.querySelector("#single")
        single.setAttribute("selected", "true") 
    } else if (civilStatus == 2) {
        let married = document.querySelector("#married")
        married.setAttribute("selected", "true")
    } else if (civilStatus == 3){
        let widow = document.querySelector("#widow")
        widow.setAttribute("selected", "true")
    }

    document.querySelector("#txtUpdateName").value = `${name}`
    document.querySelector("#txtUpdateEmail").value = `${email}`
    document.querySelector("#updateaddressTextarea").value = `${address}`
    document.querySelector("#modalDate").value = `${birthdate}`
}

function updateInfo(email, name, oldpassword, newPassword, sex, civilStatusValue, address, birthdate) {
    if (!email) return alert(`Email is required.`);
    else if (!name) return alert(`Name is required`);
    else if (!civilStatusValue) return alert(`Civil Status is required`);
    else if (!oldpassword || !newPassword) return alert(`Please fill both password fields to update`);
    else if (!address) return alert(`Address is required.`);

    let userToUpdate = {
        email,
        username: name,
        password: newPassword,
        sex,
        civilStatusValue,
        address,
        birthdate
    };

    let users = localStorage.getItem("users");
  
    users = JSON.parse(users);
    let userIndex = users.findIndex((u) => {
      return u.password == oldpassword;
    });
  
    if (userIndex == -1) {
        return alert(`Invalid old password. Please try again.`);
    } else {
        localStorage.setItem("users", JSON.stringify([userToUpdate]));
        alert(`Updated User Information has been saved.`);
    }
}

function deleteAccount(password, confirmPassword) {
    if (!password || !confirmPassword) return alert(`Password is required.`);
    else if (password != confirmPassword) return alert(`Password does not match.`);

    let users = localStorage.getItem("users");
    
    users = JSON.parse(users);
    let userIndex = users.findIndex((u) => {
      return u.password == password;
    });

    if (userIndex == -1) {
        return alert(`Email or password is invalid.`);
    }

    location.assign("index.html");
    localStorage.removeItem("users", [0]);
    localStorage.removeItem("loginkey");
    alert("Account has been deleted");
}

let btnLogout = document.querySelector('#btnLogout');
btnLogout.onclick = ()=>{
    location.assign('index.html');
    localStorage.removeItem("loginkey");
};




