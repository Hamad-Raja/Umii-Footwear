const products = require('../data/products');

const fallbackProducts = products.map((product, index) => ({
    ...product,
    _id: `seed-${index + 1}`,
    createdAt: new Date(2026, 0, index + 1).toISOString(),
    updatedAt: new Date(2026, 0, index + 1).toISOString(),
}));

const getFallbackProducts = ({ keyword, category, sort } = {}) => {
    let filteredProducts = [...fallbackProducts];

    if (keyword) {
        const search = String(keyword).toLowerCase();
        filteredProducts = filteredProducts.filter((product) =>
            product.name.toLowerCase().includes(search)
        );
    }

    if (category) {
        filteredProducts = filteredProducts.filter(
            (product) => product.category === category
        );
    }

    if (sort === 'lowest') {
        filteredProducts.sort((a, b) => a.price - b.price);
    } else if (sort === 'highest') {
        filteredProducts.sort((a, b) => b.price - a.price);
    } else {
        filteredProducts.reverse();
    }

    return filteredProducts;
};

const getFallbackProductById = (id) =>
    fallbackProducts.find((product) => product._id === id);

module.exports = {
    getFallbackProducts,
    getFallbackProductById,
};
