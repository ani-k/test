var express = require('express');
var app = express();
var cors = require('cors');
var fs = require("fs");
var axios = require("axios");

var cheerio = require("cheerio"),
  url = "https://www.amazon.com/s?k=iphone+5s",
  url2 = "https://www.amazon.com/Original-AppleiPhone-Compatible-Mobile-iPhone/dp/B08122N62P/ref=sr_1_1?keywords=iphone+5s&qid=1575916690&sr=8-1";


app.use(cors());

function createProductsResponse(asin, $) {
  var r = {
    products: []
  };
  asin.each(function () {

    let title = $(this).find('.a-size-medium.a-color-base.a-text-normal').text();
    let link = 'https://www.amazon.com' + $(this).find('a.a-link-normal.a-text-normal').attr('href');
    if (!title.length) {
      return;
    }
    r.products.push({
      'asin': $(this).data('asin'),
      'title': title,
      'link': link,
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

app.get('/desc', async function (req, res) {
  var description = await fetchProductsByUrl(url2),
    $ = cheerio.load(description),
    desc = $("#featurebullets_feature_div"),
    r = desc.find('.a-list-item').text();
  res.json(r);
});

var server = app.listen(8083, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log("Example app listening at", host, port)

});
