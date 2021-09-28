const express = require('express');
const router = express.Router();
const { easyPaysaPayment } = require('../../utils/easypaysa');

router.post('/', async (req, res) => {
    await easyPaysaPayment(req);
    res.send({ message: "asodaoshdoasihd" })
})

router.get("/confirm", async (req, res) => {
    await easyPaysaPaymentConfirm(req);
    res.send({ message: "asodaoshdoasihd" })
})

module.exports = router;