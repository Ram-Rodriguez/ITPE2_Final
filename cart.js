//run this in webpage load
document.addEventListener('DOMContentLoaded', ()=>{
    let loggedinkey = localStorage.getItem("loginkey");
    JSON.parse(loggedinkey);
    if(!loggedinkey){
        alert("Session expired, please relog in.")

        location.assign("index.html");
    }
    iterateStorage();
    getTotal();

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

function iterateStorage(){
    let cart = localStorage.getItem('cart');
    let warnNoProduct = document.querySelector('#noproducts');
    if(cart){
        warnNoProduct.style.display = 'none';
        let cart = localStorage.getItem('cart');
        cart = JSON.parse(cart);
        let length = cart.length;
        console.log(`There are ${length} products stored here`);
        for(let i = 0; i<length; i++){
            createComponent(cart[i].product.name,cart[i].product.desc,cart[i].product.price,cart[i].product.image,i, cart[i].quantity);
        }
    }else{
        warnNoProduct.style.display = 'flex';
    }
}

function createComponent(name, desc, price, image, id, quantity) {
    let container = document.querySelector('#productsRow');
    let template = document.querySelector('#cardTemplate');

    var clone = document.importNode(template.content, true);

    // Set content for the component
    clone.querySelector('.card-title').innerHTML = name;
    clone.querySelector('.card-text').innerHTML = desc;
    clone.querySelector('.card-price').innerHTML = `₱${price}`;
    clone.querySelector('.card-img-top').src = image;
    clone.querySelector('#id').innerHTML = id;
    clone.querySelector("#quantity").value = quantity;
    let quantityField = clone.querySelector("#quantity");
    quantityField.setAttribute("readonly", "")
    let btnEditQty = clone.querySelector("#btnEditQty");
    let btnSaveQty = document.querySelector("#saveQty");
    btnEditQty.onclick = () => {
        btnSaveQty.setAttribute("onclick", `editQty(${id})`)
    }
    let btnFrmCart = clone.querySelector("#removeFromCart");
    btnFrmCart.setAttribute("id", `removeFromCart${id}`);
    btnFrmCart.setAttribute("onclick", `removeCartItem(${id})`);
    console.log(`removing ${id}`);
    /*btnFrmCart.onclick = (id) => {
        removeCartItem(id);
    };*/

    //btnFrmCart.onclick = () => {
        //console.log(`removing ${id}`);
    //  }

    container.appendChild(clone);
}

function getTotal(){
    let cart = localStorage.getItem("cart");
    cart = JSON.parse(cart);
    let Total = 0;

    for(i = 0; i < cart.length; i++){
        //console.log(parseInt(cart[i].product.price));
        //console.log(parseInt(cart[i].quantity));
        //console.log(parseInt(cart[i].quantity) * parseInt(cart[i].product.price));
        Total += (parseInt(cart[i].product.price) * parseInt(cart[i].quantity));
        //console.log(Total)
    }

    let btnTotal = document.querySelector("#btnCheckout");
    btnTotal.innerHTML = `Checkout<br>Total: ₱${Total}`;
}

function editQty(id){
    let cart = localStorage.getItem("cart");
    cart = JSON.parse(cart);
    let newQty = document.querySelector("#quantityEdit").value

    cart[id].quantity = newQty;

    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Product Quantity has been edited.")
    location.reload();
}

function removeCartItem(id){
    let cart = localStorage.getItem("cart");
    cart = JSON.parse(cart);
    console.log(`removing ${id}`);

    cart.splice(id, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    location.reload();
}