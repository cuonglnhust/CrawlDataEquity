
const getDataSignal = async () => {
    let source_signal_name = "ong_ban_sai_gon";
    var rows = document.querySelectorAll('table')[3].children[1];
    let ListSignal = [];
    let list_data_row_trade = [];
    let data_row = rows.children
    data_row = [...data_row]
    for (const row of data_row) {
        if (row.children[11]) {
            list_data_row_trade.push(row);
        } else {
            break;
        }
    }
    // insert data signal
    let totalRow = document.querySelectorAll('.total')[0].childNodes[0].textContent.toString();
    const SplitContent = totalRow.split(' ');
    console.log('111111111111', SplitContent);
    let index_free_margin = 5;
    if (list_data_row_trade.length > 0 && SplitContent.length === 10) {
        index_free_margin = 6
    }
    //let totalRow;
   
    const splitBalance = SplitContent[1].toString().split(' ');
    const splitFreeMargin = SplitContent[index_free_margin].toString().split(' ');
    const splitEquity = SplitContent[3].toString().split(' ');
    let dataBalance = '';
    let dataFreeMargin = '';
    let dataEquity = '';
    splitBalance.map(x => {
        dataBalance += x;
    });
    if (list_data_row_trade.length === 0 || SplitContent.length === 6) {
        splitFreeMargin.map(x => {
            dataFreeMargin += x;
        });
    } else if(SplitContent.length === 10) {
        for (let index = 0; index < splitFreeMargin.length - 1; index++) {
            const element = splitFreeMargin[index];
            dataFreeMargin += element

        }
    }
    for (let index = 0; index < splitEquity.length - 1; index++) {
        const element = splitEquity[index];
        dataEquity += element

    }
    const dataInsert = {
        data_balance: dataBalance,
        data_equity: dataEquity,
        data_free_margin: dataFreeMargin,
        source_signal_name: source_signal_name
    }
    let data_res = await fetch("http://localhost:3299/api/fx/update_signal", {
        method: 'POST',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify({ data_list: dataInsert })
    });
    FisrtTimeCall = false;
    console.log('data_res', await data_res.json());
}
//getDataSignal();
setInterval(getDataSignal, 1000);

