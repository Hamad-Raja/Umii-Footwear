const products = require('../data/products');
const Product = require('../models/productModel');
const User = require('../models/userModel');

const seedProductsIfEmpty = async () => {
    const productCount = await Product.countDocuments();

    if (productCount > 0) {
        return;
    }

    let seedUser = await User.findOne({ isAdmin: true });

    if (!seedUser) {
        seedUser = await User.create({
            name: process.env.SEED_ADMIN_NAME || 'Solea Admin',
            email: process.env.SEED_ADMIN_EMAIL || 'seed-admin@soleafootwear.local',
            password: process.env.SEED_ADMIN_PASSWORD || `${Date.now()}-${Math.random()}`,
            isAdmin: true,
        });
    }

    const sampleProducts = products.map((product) => ({
        ...product,
        user: seedUser._id,
    }));

    await Product.insertMany(sampleProducts);
    console.log(`${sampleProducts.length} starter products seeded because the collection was empty.`);
};

module.exports = seedProductsIfEmpty;
