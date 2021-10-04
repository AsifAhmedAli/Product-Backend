const StarsCategory = require('../../model/StarsCategory');

const dashboardStarsCategoryController = {
    getStarCategories: async (req, res) => {
        try {
            const StarsCategorys = await StarsCategory.find({});
            return res.status(200).json(StarsCategorys);

        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // addStarsCategory: async (req, res) => {
    //     const { category, newStarsCategoryPrice } = req.body;

    //     if (!category || !newStarsCategoryPrice) {
    //         return res.status(400).json({ error: 'Please provide all the fields' });
    //     }

    //     try {
    //         const starsCategories = await StarsCategory.find({});
    //         StarsCategory.updateOne({ _id: starsCategories[0]._id }, { $set: { [category]: newStarsCategoryPrice } });

    //         return res.status(200).json(starsCategories);

    //     } catch (error) {
    //         res.status(500).json({ error: error.message });
    //     }
    // },

    updateStarsCategory: async (req, res) => {
        const { category, newStars } = req.body;

        if (!category || !newStars) {
            return res.status(400).json({ error: 'Please provide all the fields' });
        }

        try {
            const starsCategories = await StarsCategory.find({});
            starsCategories[0][category] = newStars;

            await starsCategories[0].save();
            return res.status(200).json(starsCategories);

        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = dashboardStarsCategoryController;