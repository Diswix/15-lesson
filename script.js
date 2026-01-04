var data = null;

var xhr = new XMLHttpRequest();
xhr.withCredentials = false;

xhr.addEventListener("readystatechange", function () {
  if (this.readyState === 4) {
    console.log(this.responseText);
  }
});

xhr.open("GET", "https://webmiddle-d1a3.restdb.io/rest/items");
xhr.setRequestHeader("content-type", "application/json");
xhr.setRequestHeader("x-apikey", "<your CORS apikey here>");
xhr.setRequestHeader("cache-control", "no-cache");

xhr.responseType = 'json';
xhr.onload = function(){
    productsArray = xhr.response
    productsGrid.innerHTML = null;
    productsArray.forEach(p => {
       productsArray.push(p);
       let pElem = document.createElement('div');
       pElem.classList.add('product');
       pElem.innerHTML = `
       <h2 class="product-name">${p.name}</h2>
       <img src="${p.photo_url}" alt="${p.name}" class="product-photo">
       <p class="product-price"><b>price:</b>${p.price}</p>
       <p class="product-description"><b>description:</b>${p.description}</p>
       <button onclick="addProductToCart('${p._id}')">buy</button>
       ` ;
       productsGrid.append(pElem);
    });
}

xhr.send(data);

let cartProd = document.getElementById('cart-products');
let cart = [];
if (localStorage.getItem('cart')) {
    cart = JSON.parse(localStorage.getItem('cart'))
    drawCartProducts();
    
}

