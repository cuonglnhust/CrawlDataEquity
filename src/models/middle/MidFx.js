import { Coin, DataClose, DataEquity, DataMapOrder, DataOpen, DataResults, DataSignal, DataTraded } from '../core';
import { Op, Sequelize } from 'sequelize';
import { checkPassword, hashPassword } from '../../libs/encrypt';
import { generateToken } from '../../libs/token';
import { ERROR_MESSAGE } from '../../config/error';
import { sendMailForgotPassword } from '../../libs/sendmail';
import { v4 as uuidv4 } from 'uuid';

import cheerio from 'cheerio';
import request from 'request-promise';
import { promises } from 'winston-daily-rotate-file';
import { data } from 'cheerio/lib/api/attributes';
const puppeteer = require('puppeteer');
var excel = require('excel4node');

class MidFx {

    async UpdateDataSignal(data_equity) {
        const DataLast = await DataEquity.findAll({ where: { balance: data_equity.data_balance, source_signal_name: data_equity.source_signal_name }, order: [['id', 'DESC']], limit: 1 });
        const percentageDD = (parseFloat(data_equity.data_balance) - parseFloat(data_equity.data_equity))/parseFloat(data_equity.data_balance)*100
        if (DataLast.length === 0) {
            let dataInsert = {
                balance: data_equity.data_balance,
                equity: data_equity.data_equity,
                free_margin: data_equity.data_free_margin,
                drawdown: percentageDD,
                source_signal_name: data_equity.source_signal_name
            }
            await DataEquity.create(dataInsert)
        } else {
            if (parseFloat(DataLast[0].equity) > parseFloat(data_equity.data_equity)) {
                const updateSignal = await DataEquity.update({ equity: data_equity.data_equity, free_margin: data_equity.data_free_margin, drawdown: percentageDD, source_signal_name: data_equity.source_signal_name }, { where: { id: DataLast[0].id } });
            }
        }
        return true;
    }
    async ExportXlsx() {
        // export excel 
        var workbook = new excel.Workbook();
        var worksheet = workbook.addWorksheet('Sheet 1');
        // Create a reusable style
        var style = workbook.createStyle({
            font: {
                color: '#66FF99',
                size: 16
            },
            numberFormat: '$#,##0.00; ($#,##0.00); -'
        });
        var style2 = workbook.createStyle({
            font: {
                color: '#808080',
                size: 12
            },
            numberFormat: '$#,##0.00; ($#,##0.00); -'
        });
        worksheet.cell(1, 1).string('STT').style(style);
        worksheet.cell(1, 2).string('BALANCE').style(style);
        worksheet.cell(1, 3).string('EQUITY').style(style);
        worksheet.cell(1, 4).string('FREE MARGIN').style(style);
        worksheet.cell(1, 5).string('DRAW DOWN').style(style);
        worksheet.cell(1, 6).string('DATE').style(style);
        worksheet.cell(1, 7).string('SOURCE SIGNAL NAME').style(style);

        const DataExport = await DataEquity.findAll();
        let row = 2
        let STT = 1
        for (const data of DataExport) {
            let dateStr =new Date(data.createdAt)
            dateStr.toLocaleDateString()
            const created = new Date(data.createdAt).toLocaleString("vi-VN", {timeZone: "Asia/Ho_Chi_Minh"});
            const splitDate = created.split(',');

            worksheet.cell(row, 1).string((row - 1).toString()).style(style2);
            worksheet.cell(row, 2).string(data.balance).style(style2);
            worksheet.cell(row, 3).string(data.equity).style(style2);
            worksheet.cell(row, 4).string(data.free_margin).style(style2);
            worksheet.cell(row, 5).string(data.drawdown+ '').style(style2);
            worksheet.cell(row, 6).string(splitDate[1]).style(style2);
            worksheet.cell(row, 7).string(data.source_signal_name).style(style2);
            row++
            
        }
        workbook.write('ExcelDataEquity.xlsx');

        return true;
    }

}
export default new MidFx()


