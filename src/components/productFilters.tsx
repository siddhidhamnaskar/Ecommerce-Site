"use client";

import { useEffect, useState } from "react";
import { Filters } from "@/types/productTypes";
import { ChevronDown, ChevronUp } from "lucide-react";

type ProductFiltersProps = {
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
  filters: Filters;
};

export default function ProductFilters({ setFilters, filters }: ProductFiltersProps) {
  const [category, setCategory] = useState("");
  const [minPrice, setMinPrice] = useState<number | "">("");
  const [maxPrice, setMaxPrice] = useState<number | "">("");
  const [sortBy, setSortBy] = useState("createdAt");
  const [order, setOrder] = useState("desc");
  const [isExpanded, setIsExpanded] = useState(false);

  const handleChange = () => {
    setFilters(prev => ({
      ...prev,
      category: category || "",
      minPrice: minPrice || 0,
      maxPrice: maxPrice || 0,
      sortBy: sortBy || "",
      order: order || ""
    }));
  };

  useEffect(() => {
    handleChange();
  }, [category, minPrice, maxPrice, sortBy, order]);

  const clearFilters = () => {
    setCategory("");
    setMinPrice("");
    setMaxPrice("");
    setSortBy("createdAt");
    setOrder("desc");
  };

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-md p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Filters</h3>
        <div className="flex items-center gap-2">
          <button
            onClick={clearFilters}
            className="text-sm text-blue-600 hover:text-blue-800 underline hidden lg:block"
          >
            Clear All
          </button>
          <button
            onClick={toggleExpanded}
            className="lg:hidden flex items-center gap-1 text-sm text-gray-600 hover:text-gray-800"
          >
            {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            {isExpanded ? "Hide" : "Show"} Filters
          </button>
        </div>
      </div>

      <div className={`grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4 ${isExpanded ? 'block' : 'hidden lg:grid'}`}>
        {/* Category */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">Category</label>
          <select
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            <option value="electronics">Electronics</option>
            <option value="men's clothing">Men&apos;s Clothing</option>
            <option value="women's clothing">Women&apos;s Clothing</option>
            <option value="jewelery">Jewelery</option>
          </select>
        </div>

        {/* Min Price */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">Min Price</label>
          <input
            type="number"
            placeholder="0"
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value === "" ? "" : Number(e.target.value))}
          />
        </div>

        {/* Max Price */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">Max Price</label>
          <input
            type="number"
            placeholder="10000"
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value === "" ? "" : Number(e.target.value))}
          />
        </div>

        {/* Sort By */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">Sort By</label>
          <select
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="createdAt">Newest</option>
            <option value="price">Price</option>
            <option value="name">Name</option>
          </select>
        </div>

        {/* Order */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">Order</label>
          <select
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={order}
            onChange={(e) => setOrder(e.target.value)}
          >
            <option value="desc">Descending</option>
            <option value="asc">Ascending</option>
          </select>
        </div>
      </div>

      {isExpanded && (
        <div className="mt-4 pt-4 border-t border-gray-200 lg:hidden">
          <button
            onClick={clearFilters}
            className="text-sm text-blue-600 hover:text-blue-800 underline"
          >
            Clear All
          </button>
        </div>
      )}
    </div>
  );
}
