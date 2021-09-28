const request = require('request');

const easyPaysaPayment = async () => {
    const options = {
        method: 'POST',
        url: 'https://api.eu-de.apiconnect.appdomain.cloud/tariqqaisertelenorbankpk-tmbdev/dev-catalog/generate-qr',
        headers: {
            'X-IBM-Client-Id': 'REPLACE_THIS_KEY',
            'X-IBM-Client-Secret': 'REPLACE_THIS_KEY',
            Credentials: 'REPLACE_THIS_VALUE',
            'content-type': 'application/json',
            accept: 'application/json'
        },
        body: {
            signature: 'vizgisahahz',
            request: {
                storeId: '3688467542310912',
                paymentMethod: 'gopvehiozwuubok',
                // postBackURL: "Some url to come back to",
                orderRefNum: 'noviz',
                amount: '12000',
                transactionPointNum: 'pumharjecnuvta',
                productNumber: '4784584665333760',
                qrFormatIndicator: 'nejvifji'
            }
        },
        json: true
    };

    return new Promise((reject, resolve) => {
        request(options, function (error, response, body) {
            if (error) reject(new Error(error));
            else {
                console.log(body);
                resolve(body)
            };
        });
    })
}

const easyPaysaPaymentStatus = async () => {
    console.log("Easypaysa authToken Confirm");
}

module.exports = { easyPaysaPayment, easyPaysaPaymentStatus };