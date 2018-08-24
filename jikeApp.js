/**
 * Created by qi on 2018/8/23.
 */

const express = require('express');
const cheerio = require('cheerio');
const superG = require('superagent');
const sieee = require();
let app = express();
app.get('/', function(req, res, next) {
    console.log('执行get');
    superG.get('https://time.geekbang.org/column/article/13530')
        .end(function(err, sres) {
            res.send(sres);


            /*const $ = cheerio.load(sres.text);
            const items = [];
            $('#houseList .t1').each(function (idx, element) {
              const ele = $(element);
              items.push({
                title: ele.text(),
                href: 'http://' + ele.attr('href').substring(2)
              })
            });
            res.send(items);*/
        });
});

app.listen(10000, function() {
    console.log('listen begin')
});