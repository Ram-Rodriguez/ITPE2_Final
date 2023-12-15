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

