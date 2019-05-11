city = {
"美金":0,
"港幣":2,
"英鎊":4,
"澳幣":6,
"加拿大幣":8,
"新加坡幣":10,
"瑞士法郎":12,
"日圓":14,
"南非幣":16,
"瑞典幣":18,
"紐元":20,
"泰幣":22,
"菲國比索":24,
"印尼幣":26,
"歐元":28,
"韓元":30,
"越南盾":32,
"馬來幣":34,
"人民幣":36
};

const request = require("request");
const cheerio = require("cheerio");
const fs = require("fs");

process.stdin.setEncoding('utf8');
console.log("your city：");
process.stdin.on('readable',function () {   
    var chunk = process.stdin.read();
	chunk = chunk.trim();
	var citycode  = city[chunk];
	var citycodes = city[chunk]+1;

	
            getCityData();



function getCityData() {
  request({
    url: "https://rate.bot.com.tw/xrt?Lang=zh-TW", // 中央氣象局網頁
    method: "GET"
  }, function (error, response, body) {
    if (error || !body) {
      return;
    }
    const $ = cheerio.load(body); // 載入 body
 
    const table_tr1 = $(".rate-content-cash.text-right.print_hide");
	console.log("現金匯率");
	console.log("本行買入:"+table_tr1[citycode].children[0].data);
	console.log("本行賣出:"+table_tr1[citycodes].children[0].data);
 
    const table_tr = $(".rate-content-sight.text-right.print_hide"); // 爬最外層的 Table(class=BoxTable) 中的 tr
	console.log("即期匯率");
	console.log("本行買入:"+table_tr[citycode].children[0].data);
	console.log("本行賣出:"+table_tr[citycodes].children[0].data);
  });
};

    })