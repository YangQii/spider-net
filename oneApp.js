/**
 * Created by qi on 2018/8/20.
 */
const express = require('express');
const cheerio = require('cheerio');
const superG = require('superagent');
let app = express();
app.get('/', function (req, res, next) {
  console.log('执行get');
  superG.get('https://cnodejs.org/')
    .end(function (err, sres) {
      console.log('ser', sres);
      res.send(sres);
    });
});

app.listen(10080, function () {
  console.log('listen begin')
});