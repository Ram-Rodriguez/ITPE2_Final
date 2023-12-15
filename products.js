let btnAddProduct = document.querySelector('#btnAddProduct');
let btnDisplay = document.querySelector('#btnDisplay');
let btnNuke = document.querySelector('#removeAll');
let btnEditProducts = document.querySelector('#btnEditProducts');
let btnSaveEdit = document.querySelector('#btnSaveEdit');
let btnAddToCart =document.querySelector('#addToCart');
let btnProducts = document.querySelector("#btnProductList");
let btnCartItems = document.querySelector("#btnCartLists");

btnProducts.onclick = ()=>{
    location.assign("products.html");
}

btnCartItems.onclick = ()=>{
    location.assign("cart.html");
}

btnAddProduct.onclick = ()=>{
    let name = document.querySelector('#newProductName').value;
    let desc = document.querySelector('#newProductDescription').value;
    let price = document.querySelector('#newProductPrice').value;
    let image = document.querySelector('#newProductImage');

    if(!name) return alert('Please insert a product name.');
    else if(!price) return alert('Please insert a product price');
    else if(image.files.length <= 0){
        console.log('hello');
        image = 'placeholder.png';
        let toAdd = {
            name,
            desc,
            price,
            image
        }
    
        let products = localStorage.getItem('products')!=null;
        if(!products){
            products = [toAdd];
        }
        else if(products){
            products = JSON.parse(localStorage.getItem('products'));
            products.push(toAdd);
        }

        localStorage.setItem('products', JSON.stringify(products));
        reloadComponents();
    }
    else{
        const reader = new FileReader();
        const file = image.files[0];
        if (file){
            const reader = new FileReader();
            reader.onload = (e)=> {
                let name = document.querySelector('#newProductName').value;
                let desc = document.querySelector('#newProductDescription').value;
                let price = document.querySelector('#newProductPrice').value;
    
                if(!desc) desc = ` `;
    
                const image = e.target.result;
                //console.log('Base64 string:', base64String);
    
                let toAdd = {
                    name,
                    desc,
                    price,
                    image
                }
            
                let products = localStorage.getItem('products')!=null;
                if(!products){
                    products = [toAdd];
                }
                else if(products){
                    products = JSON.parse(localStorage.getItem('products'));
                    products.push(toAdd);
                }
    
                try{
                    //store to local store
                    localStorage.setItem('products', JSON.stringify(products));
                } catch(error){
                    if(error instanceof DOMException && error.name === 'QuotaExceededError'){
                        console.error('QuotaExceededError: Storage limit exceeded.');
                        return alert('Image must be smaller than 4MB 😞');
                    } 
                }
                console.log(`new product added`);
                reloadComponents();
            };
    
            reader.readAsDataURL(file);
        }
    }
};

btnNuke.onclick = ()=>{
    localStorage.removeItem('products');
    localStorage.removeItem('presetexist');
    reloadComponents();
    let warnNoProduct = document.querySelector('#noproducts');
    warnNoProduct.style.display = 'flex';
}

btnDisplay.onclick = ()=> {
    reloadComponents();
};


var isShown = false;
btnEditProducts.onclick = ()=>{
    if(!isShown){
        showEdit();
    }
    else if(isShown){
        hideEdit();
    }
};
var editModeContainer = document.querySelector('#editingMode');
var editContainer = document.getElementsByClassName('edit-product');
var showProductsContainer = document.querySelector('#productsRow');
function showEdit(){
    for (let i = 0; i < editContainer.length; i++) {
        editContainer[i].style.display = 'flex';
    }
    let products = localStorage.getItem('products')!=null;
    if(products){
        editModeContainer.style.display = 'flex';
        showProductsContainer.classList.add("bg-success-subtle");
    }
    isShown = true;
}
function hideEdit(){
    for (let i = 0; i < editContainer.length; i++) {
        editContainer[i].style.display = 'none';
    }
    editModeContainer.style.display = 'none';
    showProductsContainer.classList.remove("bg-success-subtle");
    isShown = false;
}

//run this in webpage load
document.addEventListener('DOMContentLoaded', ()=>{
    let loggedinkey = localStorage.getItem("loginkey");
    JSON.parse(loggedinkey);
    if(!loggedinkey){
        alert("Session expired, please relog in.")

        location.assign("index.html");
    }
    iterateStorage();

    let cartNumber = document.querySelector("#cartItems");
    cartNumber.innerHTML = JSON.parse(localStorage.getItem("cart")).length;
});

function reloadComponents(){
    removeLoadedComponents();
    iterateStorage();
    if(isShown){
        showEdit();
    }
}

function iterateStorage(){
    let product = localStorage.getItem('products')!=null;
    let warnNoProduct = document.querySelector('#noproducts');
    if(product){
        warnNoProduct.style.display = 'none';
        let product = localStorage.getItem('products');
        product = JSON.parse(product);
        let length = product.length;
        console.log(`There are ${length} products stored here`);
        for(let i = 0; i<length; i++){
            createComponent(product[i].name,product[i].desc,product[i].price,product[i].image,i);
        }
    }else{
        warnNoProduct.style.display = 'flex';
        hideEdit();
    }
}

function removeLoadedComponents() {
    let container = document.querySelector('#productsRow');
    container.innerHTML = ''; //make the current elements go poof :D
}

function createComponent(name, desc, price, image, id) {
    let container = document.querySelector('#productsRow');
    let template = document.querySelector('#cardTemplate');

    var clone = document.importNode(template.content, true);

    // Set content for the component
    clone.querySelector('.card-title').innerHTML = name;
    clone.querySelector('.card-text').innerHTML = desc;
    clone.querySelector('.card-price').innerHTML = `₱${price}`;
    clone.querySelector('.card-img-top').src = image;
    clone.querySelector('#id').innerHTML = id;
    btnCart = clone.querySelector("#addToCartModal") ;
    btnCart.setAttribute("id", id);
    console.log(id);

    btnCart.onclick = () => {
        btnAddToCart.setAttribute("onclick", `addToCart(${id})`);
    }

    var editButton = clone.querySelector('.edit-button');
    editButton.addEventListener('click', ()=>{
        $('#editProductModal').modal('toggle');
        //console.log(`id is: ${id}`);
        fillModal(id);
    });

    container.appendChild(clone);
}

var editID = -1;
function fillModal(id){
    let products = localStorage.getItem('products');
    products = JSON.parse(products);
    let currentItem = products[id];

    let txtName = document.querySelector('#editProductName');
    let txtDesc = document.querySelector('#editProductDescription');
    let txtPrice = document.querySelector('#editProductPrice');

    txtName.value = currentItem.name;
    txtDesc.value = currentItem.desc;
    txtPrice.value = currentItem.price;
    editID = id;
}

btnSaveEdit.onclick = ()=>{
    editProduct();
}

let btnRemoveImage = document.querySelector('#removeImage');

btnRemoveImage.onclick = ()=> {
    removeImage();
}
function removeImage(){
    let image = document.querySelector('#editProductImage');
    let image2 = document.querySelector('#newProductImage')
    image.value = '';
    image2.value = '';
}

function editProduct(){
    console.log(`id is = ${editID}`);
    let name = document.querySelector('#editProductName').value;
    let desc = document.querySelector('#editProductDescription').value;
    let price = document.querySelector('#editProductPrice').value;
    let image = document.querySelector('#editProductImage');

    let product = localStorage.getItem('products');
    product = JSON.parse(product);
    //console.log(product[editID].name);
    console.log(image.files.length);
    if(!name) return alert('Please insert a product name.');
    else if(!price) return alert('Please insert a product price');
    else if(image.files.length <= 0){
        product[editID].name = name;
        product[editID].desc = desc;
        product[editID].price = price;

        console.log(product);
        localStorage.setItem('products', JSON.stringify(product));
        reloadComponents();
    }else if(image.files.length >= 1){
        product[editID].name = name;
        product[editID].desc = desc;
        product[editID].price = price;

        const file = image.files[0];
        if (file){
            const reader = new FileReader();
            reader.onload = (e)=> {
                const image = e.target.result;
                console.log('Base64 string:', image);
                product[editID].image = image;

                try{
                    localStorage.setItem('products', JSON.stringify(product));
                } catch(error){
                    if(error instanceof DOMException && error.name === 'QuotaExceededError'){
                        console.error('QuotaExceededError: Storage limit exceeded.');
                        return alert('Image must be smaller than 4MB 😞');
                    } 
                }
                reloadComponents();
            };

            reader.readAsDataURL(file);
        }
    }
}

let btnLogout = document.querySelector('#btnLogout');
btnLogout.onclick = ()=>{
    location.assign('index.html');
    localStorage.removeItem("loginkey");
};

let btnDeleteProduct = document.querySelector('#btnDeleteProduct');
btnDeleteProduct.onclick = ()=>{
    //console.log(editID);
    //editID = editID +1;
    let product = localStorage.getItem('products');
    product = JSON.parse(product);
    let length = product.length;
    if(length==1){
        localStorage.removeItem('products');
        reloadComponents();
    }
    else{
        console.log(`before splice ${product}`);
        product.splice(editID, 1);
        console.log(product);
        localStorage.setItem('products',JSON.stringify(product));
        reloadComponents();
    }
    
};

function objectsAreSame(x, y) {
    var objectsAreSame = true;
    for(var propertyName in x) {
       if(x[propertyName] !== y[propertyName]) {
          objectsAreSame = false;
          break;
       }
    }
    return objectsAreSame;
 }

function addToCart(id) {
    let product = localStorage.getItem('products');
    product = JSON.parse(product);
    let quantityInput = document.querySelector("#quantity").value;
    console.log(id);

    let cartToAdd = {
        product: product[id],
        //price: product[id].price,
        quantity: quantityInput,
        //image: product[id].image
    }

    let cart = localStorage.getItem('cart')!=null;
    if(!cart){
        cart = [cartToAdd];
        
        console.log(cart);

        localStorage.setItem("cart", JSON.stringify(cart));
        alert("Product has been added to Cart");
        location.reload();
        
    } else {
        console.log("di dapat papasok")
        cart = JSON.parse(localStorage.getItem('cart'));
        //console.log(cart)
        for(i = 0; i < cart.length; i++){
            if(JSON.stringify(cart[i].product) === JSON.stringify(cartToAdd.product)){
                console.log("if")
                cart[i].quantity = parseInt(cart[i].quantity) + parseInt(quantityInput);
                localStorage.setItem("cart", JSON.stringify(cart));
                alert("Product has been added to Cart");
                return location.reload();
            }
        }
        console.log("else")
        cart.push(cartToAdd);
        localStorage.setItem("cart", JSON.stringify(cart));
        alert("Product has been added to Cart");
        return location.reload();
        /*if (cartIndex){
            parseInt(cart[cartIndex].quantity) += parseInt(quantityInput);
            localStorage.setItem("cart", JSON.stringify(cart));
        } else {
            cart.push(cartToAdd);
            localStorage.setItem("cart", JSON.stringify(cart));
            console.log("else")
        }*/
    }
}