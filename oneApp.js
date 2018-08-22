/**
 * Created by qi on 2018/8/20.
 * https://github.com/alsotang/node-lessons/blob/master/lesson3/app.js
 */
const express = require('express');
const cheerio = require('cheerio');
// http 请求
const superG = require('superagent');
let app = express();
app.get('/', function (req, res, next) {
  console.log('执行get');
  superG.get('https://cnodejs.org/')
    .end(function (err, sres) {
      // https://github.com/cheeriojs/cheerio/wiki/Chinese-version
      // 加载页面
      const $ = cheerio.load(sres.text);
      const items = [];
      $('#topic_list .topic_title').each(function (idx, element) {
        const ele = $(element);
        items.push({
          title: ele.attr('title'),
          href: 'https://cnodejs.org' + ele.attr('href')
        })
      });
      res.send(items);
    });
});

app.listen(10080, function () {
  console.log('listen begin')
});