/**
 * Created by qi on 2018/8/23.
 */

const express = require('express');
const cheerio = require('cheerio');
const superG = require('superagent');

const header = {
  'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/537.36',
  'Content-Type': 'application/json',
  'Cookie': 'SERVERID=97796d411bb56cf20a5612997f113254|1535966572|1535966572;Path=/'
};

let app = express();

app.get('/', function (req, res, next) {
  console.log('执行get');
  const header = function() {
    const params = {
      appid: 1,
      captcha: '',
      cellphone: '15588221708',
      country: 86,
      password: '000000',
      platform: 3,
      remember: 1
    };
    superG
      .post('https://account.geekbang.org/account/ticket/login')
      .send(params)
      .end(function (err, res) {
        const cookie = res.header['set-cookie'];
        return cookie
      })
  };
  superG
    .get('https://time.geekbang.org/column/article/13530')
    .set(header())
    .end(function (err, sres) {
      const $ = cheerio.load(sres.text);
      const appText = $('#app').html();
      sres['text'] = appText;
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

app.listen(11000, function () {
  console.log('listen begin')
});