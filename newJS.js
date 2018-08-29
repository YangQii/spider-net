/**
 * Created by qi on 2018/8/23.
 * https://github.com/alsotang/node-lessons/blob/master/lesson3/app.js
 */

// TODO
const express = require('express');
const cheerio = require('cheerio');

// http 请求
const superG = require('superagent');
let app = express();

// 浏览器请求头信息
const browserMsg = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.99 Safari/537.36',
  'Content-Type': 'application/json',
};

//访问登录接口
function getLoginCookie(userid, pwd) {

}

app.get('/', function (req, res, next) {
    console.log('执行get');
    superG.get('https://time.geekbang.org/column/article/13530')
        .end(function (err, sres) {
            // https://github.com/cheeriojs/cheerio/wiki/Chinese-version
            // 加载页面
            res.send(sres);

            /*const $ = cheerio.load(sres.text);
            const items = [];
            $('#topic_list .topic_title').each(function (idx, element) {
                const ele = $(element);
                items.push({
                    title: ele.attr('title'),
                    href: 'https://cnodejs.org' + ele.attr('href')
                })
            });
            res.send(items);*/
        });
});

app.listen(10000, function () {
    console.log('listen begin')
});