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
      console.log('ser', sres);
      res.send(sres);
    });
});

app.listen(10090, function () {
  console.log('listen begin')
});