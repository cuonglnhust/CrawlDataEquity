import { Coin, DataResults } from '../core';
import { Op } from 'sequelize';
import { checkPassword, hashPassword } from '../../libs/encrypt';
import { generateToken } from '../../libs/token';
import { ERROR_MESSAGE } from '../../config/error';
import { sendMailForgotPassword } from '../../libs/sendmail';
import { v4 as uuidv4 } from 'uuid';

import cheerio from 'cheerio';
import request from 'request-promise';
const puppeteer = require('puppeteer');
var excel = require('excel4node');

class MidCoin {
    async getAllCoin() {
        const data = await Coin.findAll({
        })
        return data

    }
    async getCointById(coin_name) {
        return Coin.findOne({
            where: {
                name: coin_name
            }
        })
    }
    async getDataCoinChecked () {
        const listData = [];
        const dataCoin = await Coin.findAll({})
        let number_max_pair = 0;
       for (let index = 0; index < dataCoin.length; index++) {
           const listAmount = dataCoin[index].amount2Test.split(';');
           const listPrice = dataCoin[index].price.split(';');

           const element = dataCoin[index].dataValues;
           element.listAmount = listAmount;
           element.listPrice = listPrice;
           if(listAmount.length > number_max_pair) {number_max_pair = listAmount.length};
           //element.number_max_pair = number_max_pair;
           listData.push(element);
       }
       listData.number_max_pair = number_max_pair
    //    console.log('listData',listData);
        return listData;
    }
    async getDataWeb() {
        request('https://123job.vn/tuyen-dung', (error, response, html) => { // gửi request đến trang 
            console.log(response.statusCode);
            if (!error && response.statusCode == 200) {
                const $ = cheerio.load(html); // load HTML
                $('.job__list-item').each((index, el) => { // lặp từng phần tử có class là job__list-item
                    const job = $(el).find('.job__list-item-title a').text(); // lấy tên job, được nằm trong thẻ a < .job__list-item-title
                    console.log(job);

                })
                var getdata = $('.page-search .').data('autocomplete');
                $('.js-typeahead-location').data('autocomplete', 'on')
            }
            else {
                console.log(error);
            }
            // 200, kiểm tra xem kết nối thành công không 
        });
    }

    async getCoinBuy() {
        let listCoinBsc = [], listCoinAvax = [], listCoinFtm = [];

        const allCoin = await await Coin.findAll({});

        allCoin.forEach(element => {
            if (element.networkId == 1) listCoinBsc.push(element.dataValues);
            else if (element.networkId == 2) listCoinAvax.push(element.dataValues);
            else if (element.networkId == 3) listCoinFtm.push(element.dataValues);
        });

        console.log(listCoinBsc);

        Promise.all([
            listCoinBsc.length  > 0 ? getBuyCoinBscPancakeswap(listCoinBsc)  : '',
            // listCoinAvax.length > 0 ? getBuyCoinAvaxTraderJoexyz(listCoinAvax) : '',
            // listCoinFtm.length  > 0 ? getBuyCoinFtmSpookyswap(listCoinFtm)  : '',
        ])
            .then(values => {
                console.log(values);
                // data.push(values);
            });
    }

}
import { from } from 'form-data';
import { data } from 'cheerio/lib/api/attributes';
import { head } from 'request';

export default new MidCoin()