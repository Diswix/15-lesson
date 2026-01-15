let productsArray = [];
let productsGrid = document.getElementById('product-grid');
var data = null;

var xhr = new XMLHttpRequest();
xhr.withCredentials = false;

/*xhr.addEventListener("readystatechange", function () {
  if (this.readyState === 4) {
    console.log(this.responseText);
  }
}); */

xhr.open("GET", "https://webmiddles-fdcd.restdb.io/rest/items");
xhr.setRequestHeader("content-type", "application/json");
xhr.setRequestHeader("x-apikey", "6968e1d07ba9c9c3187848ad");
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
       <img src="${p.img_url}" alt="${p.name}" class="product-photo">
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

function addProductToCart(id)
{
    let product = productsArray.find(function(p){
        return p._id == id;
    })
    cart.push(product);
    drawCartProducts();
    localStorage.setItem("cart", JSON.stringify(cart));
    document.getElementById('cart-button')
        .classList.add('active');

    setTimeout(function () {
        document.getElementById('cart-button')
            .classList.remove('active');
    }, 500);
  }

  function drawCartProducts(){
  if(cart.length === 0) return cartProd.innerHTML = 'Cart is empty';
  cartProd.innerHTML = null;
  let sum = 0;
  cart.forEach(function(p){
    cartProd.innerHTML += `
    <p><img src="${p.img_url}"> ${p.name}  | ${p.price}$</p>
    <hr> `;
    sum+= +p.price;
  });
  cartProd.innerHTML += `
  <p>Tota: ${sum}$</p>
  <button onclick="buyAll()">Buy all</button>
  `;
}
function openCart(){
  cartProd.classList.toggle('hide');
}
