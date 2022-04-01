
const getDataSignal = async () => {
    const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

    let data_res = await fetch("http://localhost:3299/api/fx/get_signal", {
        method: 'GET',
    });
    const client_id = 1;
    let data_trade = await data_res.json();
    //console.log('data_open',data_trade);
    const data_close = data_trade.data.data_close;
    const data_open = data_trade.data.data_open;

    // if (data_open.length > 0) {
    console.log('data_open', data_open);
    // }
    // if (data_close.length > 0) {
    console.log('data_close', data_close);
    // }
    if (data_close.length > 0) {
        for (let index = 0; index < data_close.length; index++) {
            const d_close = data_close[index];
             //delete data close 
             let data_delete_close = await fetch("http://localhost:3299/api/fx/delete_data_close", {
                method: 'POST',
                cache: 'no-cache',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json'
                },
                redirect: 'follow',
                referrerPolicy: 'no-referrer',
                body: JSON.stringify({d_close: d_close, client_id: client_id})
            });
            const data_delete_json = await data_delete_close.json();
            if(data_delete_json.data > 0){
            let close_id = await GetCloseSignalByIndex(d_close);
            let splitSpaceSignal = close_id.toString().replace(/\s/g, '');
            console.log('close_id', splitSpaceSignal)
            let stringClose = `span[title="Close #${splitSpaceSignal}"]`
            document.querySelectorAll(stringClose)[0].click();
            await delay(1000);
            if (document.querySelectorAll('.page-window.modal .page-text')[45] && document.querySelectorAll('.page-window.modal .page-text')[45].innerText.includes('Do you want to close')) {
                await document.querySelectorAll('.page-window.modal button.input-button')[21].click();
                console.log('CLOSE');
                }
            }
        }
    }
    if (data_open.length > 0) {
        for (let index = 0; index < data_open.length; index++) {
            // delete data open 
            
            const d_open = data_open[index];
            let data_delete_open = await fetch("http://localhost:3299/api/fx/delete_data_open", {
                method: 'POST',
                cache: 'no-cache',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json'
                },
                redirect: 'follow',
                referrerPolicy: 'no-referrer',
                body: JSON.stringify({d_open: d_open,client_id: client_id})
            });
            const data_delete_json = await data_delete_open.json();
            console.log('data_delete_json', data_delete_json);
            
            if(data_delete_json.data > 0){
                console.log('d_open', d_open);
                let totalRow;
                if(document.querySelectorAll('.total')[1]) {
                    totalRow = document.querySelectorAll('.total')[1].childNodes[0].textContent.toString();
                } else {
                    totalRow = document.querySelectorAll('.total')[0].childNodes[0].textContent.toString();
                }
                const SplitContent = totalRow.split(' ');
                const splitBalance = SplitContent[1].toString().split(' ');
                let dataBalance = '';
                splitBalance.map(x => {
                    dataBalance += x;
                })
                let Percent = parseFloat(d_open.dataBalance) / parseFloat(dataBalance);
                console.log('Percent', Percent);
                let GetLot = (d_open.size / Percent).toPrecision(1);
                //let GetLot = 0.01/0.10007857035390093
                console.log('lottttttt', GetLot);
                if(GetLot < 0.01) {
                    GetLot = 0.01
                }
                // double click popup
                var eventDbclick = new MouseEvent('dblclick', {
                    'view': window,
                    'bubbles': true,
                    'cancelable': true
                });
                document.querySelectorAll('.page-window.market-watch.compact .symbols-table table tbody tr').forEach(el => {
                    if (typeof el.cc !== 'undefined' && (el.cc.toLowerCase().includes(d_open.symbol.toLowerCase()) || d_open.symbol.toLowerCase().includes(el.cc.toLowerCase()))) {
                        el.dispatchEvent(eventDbclick)
                    }
                })
    
                // set up tham so
                var simulateMouseEvent = function (element, eventName, coordX, coordY) {
                    element.dispatchEvent(new MouseEvent(eventName, {
                        view: window,
                        bubbles: true,
                        cancelable: true,
                        clientX: coordX,
                        clientY: coordY,
                        button: 0
                    }));
                };
    
                // -------------- Set volume ( số lot ) --------------//
                document.getElementById("volume").value = GetLot.toString();
                var theButtonUpVolume = document.querySelectorAll('.input-text.num .up')[1];
    
                var boxUpVolume = theButtonUpVolume.getBoundingClientRect(),
                    coordXUpVolume = boxUpVolume.left + (boxUpVolume.right - boxUpVolume.left) / 2,
                    coordYUpVolume = boxUpVolume.top + (boxUpVolume.bottom - boxUpVolume.top) / 2;
    
                simulateMouseEvent(theButtonUpVolume, "mousedown", coordXUpVolume, coordYUpVolume);
                simulateMouseEvent(theButtonUpVolume, "mouseup", coordXUpVolume, coordYUpVolume);
                simulateMouseEvent(theButtonUpVolume, "click", coordXUpVolume, coordYUpVolume);
    
                var theButtonDownVolume = document.querySelectorAll('.input-text.num .down')[2];
    
                var boxDownVolume = theButtonDownVolume.getBoundingClientRect(),
                    coordXDownVolume = boxDownVolume.left + (boxDownVolume.right - boxDownVolume.left) / 2,
                    coordYDownVolume = boxDownVolume.top + (boxDownVolume.bottom - boxDownVolume.top) / 2;
    
                simulateMouseEvent(theButtonDownVolume, "mousedown", coordXDownVolume, coordYDownVolume);
                simulateMouseEvent(theButtonDownVolume, "mouseup", coordXDownVolume, coordYDownVolume);
                simulateMouseEvent(theButtonDownVolume, "click", coordXDownVolume, coordYDownVolume);
                // Click buy sell
                if (d_open.type === 'sell') {
                    await document.querySelectorAll('.page-window.modal .b button.input-button.red')[0].click();
                    await delay(1000);
                    if (document.querySelectorAll('.page-window.modal .page-text')[45] && document.querySelectorAll('.page-window.modal .page-text')[45].innerText.includes('Do you want to SELL')) {
                        await document.querySelectorAll('.page-window.modal button.input-button')[21].click();
                        console.log('SELL');
                    }
                } else if (d_open.type === 'buy') {
                    await document.querySelectorAll('.page-window.modal .b button.input-button.blue')[0].click();
                    await delay(1000);
                    if (document.querySelectorAll('.page-window.modal .page-text')[45] && document.querySelectorAll('.page-window.modal .page-text')[45].innerText.includes('Do you want to BUY')) {
                        await document.querySelectorAll('.page-window.modal button.input-button')[21].click();
                        console.log('BUY');
                    }
                }
                await delay(1000);
                document.querySelectorAll('.page-window.modal .wx')[3].click();
            }
    
        }
    }

}
const GetCloseSignalByIndex = async (data_close) => {
    let list_data_row_trade = [];
    var rows = document.querySelectorAll('table')[6].children[1];
    let data_row = rows.children
    data_row = [...data_row]
    for (const row of data_row) {
        if (row.children[11]) {
            list_data_row_trade.push(row);
        } else {
            break;
        }
    }
    let order_close = '';
    if (list_data_row_trade.length === 0) {
        order_close = '';
    } else {
        order_close = list_data_row_trade[data_close.index];
    }
    console.log('');
    return order_close.children[0].textContent;
}
getDataSignal();
setInterval(getDataSignal, 1000);