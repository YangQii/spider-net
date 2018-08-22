/**
 * Created by qi on 2018/8/21.
 */

const express = require('express');
const cheerio = require('cheerio');
const superG = require('superagent');
let app = express();
app.get('/', function (req, res, next) {
  console.log('执行get');
  superG.get('http://www.ziroom.com/z/nl/z3.html?qwd=%E5%9B%9E%E9%BE%99%E8%A7%82')
    .end(function (err, sres) {
      const $ = cheerio.load(sres.text);
      const items = [];
      $('#houseList .t1').each(function (idx, element) {
        const ele = $(element);
        items.push({
          title: ele.text(),
          href: 'http://' + ele.attr('href').substring(2)
        })
      });
      res.send(items);
    });
});

app.listen(10090, function () {
  console.log('listen begin')
});