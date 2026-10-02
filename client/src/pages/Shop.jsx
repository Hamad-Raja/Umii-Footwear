import React, { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Filter, ChevronDown } from 'lucide-react'
import { useGetProductsQuery } from '../slices/productsApiSlice'

const categoryOptions = [
  { label: "Men's Sneakers", value: 'Mens Sneakers' },
  { label: "Women's Sneakers", value: 'Womens Sneakers' },
]

const Shop = () => {
  const [filterOpen, setFilterOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedCategory = searchParams.get('category') || '';
  const selectedSort = searchParams.get('sort') || '';
  const { data: products, isLoading, error } = useGetProductsQuery({
    category: selectedCategory || undefined,
    sort: selectedSort || undefined,
  });

  const updateParam = (key, value) => {
    const nextParams = new URLSearchParams(searchParams);
    if (value) {
      nextParams.set(key, value);
    } else {
      nextParams.delete(key);
    }
    setSearchParams(nextParams);
  };

  return (
    <div className="bg-offwhite">
      <section className="bg-onyx text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-20">
          <p className="text-gold font-bold tracking-[0.35em] uppercase text-xs mb-4">Solea Collection</p>
          <h1 className="text-4xl md:text-6xl font-heading font-black text-white mb-4">
            {selectedCategory || 'All Footwear'}
          </h1>
          <p className="text-gray-400 max-w-2xl leading-relaxed">
            Shop refined sneakers selected for comfort, movement, and everyday styling.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 border-b border-gray-200 pb-6 gap-6">
        <div>
          <h2 className="text-2xl font-heading font-extrabold text-charcoal mb-2">Browse Products</h2>
          <p className="text-gray-500 text-sm">Showing {products?.length || 0} results</p>
        </div>
        <div className="flex gap-4 mt-6 md:mt-0">
          <button 
            onClick={() => setFilterOpen(!filterOpen)}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-sm hover:border-charcoal transition-colors"
          >
            <Filter size={18} /> Filters
          </button>
          <div className="relative">
            <select
              value={selectedSort}
              onChange={(e) => updateParam('sort', e.target.value)}
              className="appearance-none bg-transparent border border-gray-300 rounded-sm px-4 py-2 pr-10 hover:border-charcoal transition-colors cursor-pointer focus:outline-none"
            >
              <option value="">Sort by: Featured</option>
              <option value="lowest">Price: Low to High</option>
              <option value="highest">Price: High to Low</option>
              <option value="newest">Newest Arrivals</option>
            </select>
            <ChevronDown size={18} className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-400" />
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        
        {/* Filters Sidebar */}
        {filterOpen && (
          <div className="w-full md:w-64 flex-shrink-0 animate-fade-in-up">
            <div className="mb-6">
              <h3 className="font-heading font-bold text-lg mb-3">Category</h3>
              <ul className="space-y-2 text-sm text-gray-500">
                <li className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="category"
                    checked={!selectedCategory}
                    onChange={() => updateParam('category', '')}
                    className="accent-electric"
                  />
                  All Footwear
                </li>
                {categoryOptions.map((category) => (
                  <li key={category.value} className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="category"
                      checked={selectedCategory === category.value}
                      onChange={() => updateParam('category', category.value)}
                      className="accent-electric"
                    />
                    {category.label}
                  </li>
                ))}
              </ul>
            </div>
            <div className="mb-6">
              <h3 className="font-heading font-bold text-lg mb-3">Size</h3>
              <div className="grid grid-cols-4 gap-2">
                {[7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5].map(size => (
                  <button key={size} className="border border-gray-300 text-xs py-2 hover:border-charcoal hover:bg-charcoal hover:text-white transition-colors">
                    {size}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-heading font-bold text-lg mb-3">Price Range</h3>
              <input type="range" className="w-full accent-electric" min="50" max="300" />
              <div className="flex justify-between text-xs text-gray-500 mt-2">
                <span>$50</span>
                <span>$300+</span>
              </div>
            </div>
          </div>
        )}

        {/* Product Grid */}
        <div className="flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {isLoading ? (
                <div className="col-span-full py-24 text-center text-gray-500">Loading collection...</div>
            ) : error ? (
                <p className="col-span-full text-red-500">{error?.data?.message || error.error}</p>
            ) : products?.length === 0 ? (
                <div className="col-span-full py-24 text-center bg-white border border-gray-200">
                  <h3 className="text-xl font-heading font-bold mb-2">No products found</h3>
                  <p className="text-gray-500 mb-6">Try clearing the category or sort filters.</p>
                  <button onClick={() => setSearchParams({})} className="btn-luxury">Clear Filters</button>
                </div>
            ) : products?.map((product) => (
              <Link to={`/product/${product._id}`} key={product._id} className="group cursor-pointer text-decoration-none">
                <div className="relative overflow-hidden bg-white aspect-w-4 aspect-h-5 mb-4 rounded-sm shadow-sm">
                  <img 
                    src={product.images?.[0] || 'https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=1200&auto=format&fit=crop'} 
                    alt={product.name} 
                    className="w-full h-[300px] object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=1200&auto=format&fit=crop'
                    }}
                  />
                  <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-heading font-bold text-charcoal">{product.name}</h3>
                    <p className="text-gray-400 text-sm lowercase first-letter:uppercase">{product.category}</p>
                  </div>
                  <p className="text-charcoal font-medium">${product.price?.toFixed(2)}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </div>
    </div>
  )
}

export default Shop
