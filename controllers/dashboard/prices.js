const Price = require('../../model/Price');

const dashboardPriceController = {
    getPrices: async (req, res) => {
        try {
            const prices = await Price.find({});
            return res.status(200).json(prices);

        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    updatePrice: async (req, res) => {
        const { category, newPrice } = req.body;
        try {
            const prices = await Price.find({});
            prices[0][category] = newPrice;
            await prices[0].save();
            return res.status(200).json(prices);

        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = dashboardPriceController;