var data = null;

var xhr = new XMLHttpRequest();
xhr.withCredentials = false;

xhr.addEventListener("readystatechange", function () {
  if (this.readyState === 4) {
    console.log(this.responseText);
  }
});

xhr.open("GET", "https://webmiddles-fdcd.restdb.io/rest/items");
xhr.setRequestHeader("content-type", "application/json");
xhr.setRequestHeader("x-apikey", "6968e1d07ba9c9c3187848ad");
xhr.setRequestHeader("cache-control", "no-cache");

xhr.send(data);