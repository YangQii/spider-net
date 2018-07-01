/**
 * Created by qi on 2018/6/27.
 */
/*
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
});*/
const eventproxy = require('eventproxy');
const superagent = require('superagent');
const cheerio = require('cheerio');
const url = require('url');
const baseUrl = 'https://cnodejs.org/';
superagent.get(baseUrl)
  .end(function (err, res) {
    if (err) {
      console.error(err);
    }
    const topicUrls = [];
    const $ = cheerio.load(res.text);
    $('#topic_list .topic_title').each(function (idx, element) {
      const $element = $(element);
      const href = url.resolve(baseUrl, $element.attr('href'));
      topicUrls.push(href);
    });
    const ep = new eventproxy();
    ep.after('topic_html', topicUrls.length, function (topics) {
      topics = topics.map(function (topicPair) {
        const topicUrl = topicPair[0];
        const topicHtml = topicPair[1];
        const $ = cheerio.load(topicHtml);
        return({
          title: $('.topic_full_title').text().trim(),
          href: topicUrl,
          comment1: $('.reply_content').eq(0).text().trim(),
        })
      })
      console.log('final:');
      console.log(topics);
    });
    topicUrls.forEach(function (topicUrl) {
      superagent.get(topicUrl)
        .end(function (err, res) {
          console.log('fetch ' + topicUrl + ' successful');
          ep.emit('topic_html', [topicUrl, res.text]);
        });
    });
});