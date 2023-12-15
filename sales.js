//run this in webpage load
document.addEventListener('DOMContentLoaded', ()=>{
    let loggedinkey = localStorage.getItem("loginkey");
    JSON.parse(loggedinkey);
    if(!loggedinkey){
        alert("Session expired, please relog in.")

        location.assign("index.html");
    }

    let cartNumber = document.querySelector("#cartItems");
    let cart = localStorage.getItem("cart");
    cart = JSON.parse(cart);
    if(cart){
        cartNumber.innerHTML = JSON.parse(localStorage.getItem("cart")).length;
    }
    getSales();
});

let btnProducts = document.querySelector("#btnProductList");
let btnCartItems = document.querySelector("#btnCartLists");

btnProducts.onclick = ()=>{
    location.assign("products.html");
}

btnCartItems.onclick = ()=>{
    location.assign("cart.html");
}

function getSales(){
    let sales = localStorage.getItem("sales");
    let tbody = document.querySelector("#tbody");
    sales = JSON.parse(sales);

    if(!sales){
        let tr = document.createElement("tr");

        let product = document.createElement("td");
        product.innerHTML = "There are no products yet."
        product.setAttribute("colspan", "5");

        tr.appendChild(product);
        tbody.appendChild(tr);
        return;
    } else {
        for(i = 0; i < sales.length; i++){
            let tr = document.createElement("tr");
            let th = document.createElement("th");
    
            th.setAttribute("scope", "row");
            th.innerHTML = i+1;
    
            let product = document.createElement("td");
            product.innerHTML = sales[i].name;
    
            let price = document.createElement("td");
            price.innerHTML = `₱${sales[i].price}`;
    
            let units = document.createElement("td");
            units.innerHTML = sales[i].sold;
    
            let sale = document.createElement("td");
            sale.innerHTML = `₱${sales[i].sales}`;
    
            tr.appendChild(th)
            tr.appendChild(product);
            tr.appendChild(price);
            tr.appendChild(units);
            tr.appendChild(sale);
            tbody.appendChild(tr);
        }

        let tr = document.createElement("tr");
        let total = document.createElement("td");
        total.setAttribute("colspan", "5");
        total.setAttribute("class", "text-end")
        total.innerHTML = `Grand Total: ₱${calculateTotal()}`;

        tr.appendChild(total);
        tbody.appendChild(tr);
    }
}

function calculateTotal(){
    let sales = localStorage.getItem("sales");
    let total = 0;
    sales = JSON.parse(sales);

    for(i = 0; i < sales.length; i++){
        total += parseInt(sales[i].sales);
    }

    return total;
}