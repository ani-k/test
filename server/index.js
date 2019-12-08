var express = require('express');
var app = express();
var cors = require('cors');
var fs = require("fs");
var axios = require ("axios");

var cheerio = require("cheerio"),
  url = "https://www.amazon.com/s?k=iphone+5s";


app.use(cors());

function createProductsResponse(asin, $) {
  var r = {
    products: []
  };
  asin.each(function () {

    let title = $(this).find('.a-size-medium.a-color-base.a-text-normal').text();
    if(!title.length) {
      return;
    }
    r.products.push({
      'asin': $(this).data('asin'),
      'title': title
    });
  });
  return r;
}

async function fetchProductsByUrl(url) {
  var response = await axios.get(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.90 Safari/537.36'
    }
  })
    .catch(function (error) {
      console.log(error);
    });
  return response.data;
}

app.get('/curl', async function (req, res) {

  var products = await fetchProductsByUrl(url);

  var $ = cheerio.load(products),
    asin = $("div[data-asin]");

  var r = createProductsResponse(asin, $);

  res.json(r);

});

var server = app.listen(8081, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log("Example app listening at", host, port)

});
