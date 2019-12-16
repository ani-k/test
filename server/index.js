var express = require('express');
var app = express();
var cors = require('cors');
var axios = require("axios");

var cheerio = require("cheerio");
const delay = require('delay');

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
      'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko)' +
        ' Chrome/42.0.2311.90 Safari/537.36'
    }
  })
    .catch(function (error) {
    });
  if (!response) {
    return null;
  }
  return response.data;
}

app.get('/curl', async function (httpRequest, httpResponse) {

  try {
    var products = await fetchProductsByUrl(decodeURI(httpRequest.query.url)),
      $ = cheerio.load(products),
      asin = $("div[data-asin]"),
      response = createProductsResponse(asin, $);
    httpResponse.json(response);
  } catch (e) {
    console.log(e);
    httpResponse.status(500).send('Something went wrong!');
  }


});

app.get('/desc/:asin', async function (httpRequest, httpResponse) {
  try {
    await delay(500);
    var description = await fetchProductsByUrl(decodeURI(httpRequest.query.url)),
      $ = cheerio.load(description),
      descriptionWrapperHtml = $("#featurebullets_feature_div"),
      descriptionValue = descriptionWrapperHtml.find('.a-list-item').text();
    httpResponse.json({'asin': httpRequest.params.asin, 'description': descriptionValue});
  } catch (e) {
    console.log(e);
    httpResponse.status(500).send('Something went wrong!');
  }

});

var server = app.listen(8083, function () {

  var host = server.address().address,
    port = server.address().port;

  console.log("Example app listening at", host, port)

});
