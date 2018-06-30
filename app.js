/**
 * Created by qi on 2018/6/27.
 */
const express = require('express');
const cheerio = require('cheerio');
const superagent = require('superagent');
const app = express();
app.get('/', function (req, res, next) {
  superagent
    .get('https://cnodejs.org/')
    .end(function (err, sres) {
      if (err) {
        return next(err);
      }
      const $ = cheerio.load(sres.text);
      const items = [];
      $('#topic_list .topic_title').each(function (idx, element) {
        const baseUrl = 'http://cnodejs.org';
        const $element = $(element);
        items.push({
          title: $element.attr('title'),
          href: baseUrl+$element.attr('href'),
        });
      })
      res.send(items);
      items.forEach(function (item) {
        console.log(item.href);
      })
    })
});
app.listen(3000, function () {
  console.log('app is listen at post 3000');
});