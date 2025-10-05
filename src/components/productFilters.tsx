"use client";

import { useEffect, useState } from "react";
import { Filters } from "@/types/productTypes";


export default function ProductFilters({
  setFilters,
  filters,
}: {
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
  filters: Filters;
})  {
  const [category, setCategory] = useState("");
  const [minPrice, setMinPrice] = useState<number | "">("");
  const [maxPrice, setMaxPrice] = useState<number | "">("");
  const [sortBy, setSortBy] = useState("createdAt");
  const [order, setOrder] = useState("desc");

  const handleChange = () => {
      setFilters(prev => ({
        ...prev,
        category: category || "",    // overwrite even if empty
        minPrice: minPrice || 0,
        maxPrice:maxPrice || 0,
        sortBy: sortBy || "",
        order: order || ""
      }));

    
  };
  useEffect(()=>{
     handleChange();
  },[category,minPrice,maxPrice,sortBy,order])

  return (
    <div className="flex flex-wrap gap-4 mb-6 p-4 bg-gray-100 rounded-lg shadow">
      {/* Category */}
      <select
        className="border p-2 rounded"
        value={category}
        onChange={(e) => {
          setCategory(e.target.value);
          
        }}
      >
        <option value="">All Categories</option>
        <option value="electronics">Electronics</option>
        <option value="men's clothing">Men's Clothing</option>
        <option value="women's clothing">Women's Clothing</option>
        <option value="jewelery">Jewelery</option>
      </select>

      {/* Price Inputs */}
      <input
        type="number"
        placeholder="Min Price"
        className="border p-2 rounded w-28"
        value={minPrice}
        onChange={(e) => {
          setMinPrice(e.target.value === "" ? "" : Number(e.target.value))
          
        }}
      />
      <input
        type="number"
        placeholder="Max Price"
        className="border p-2 rounded w-28"
        value={maxPrice}
        onChange={(e) => {
         setMaxPrice(e.target.value === "" ? "" : Number(e.target.value))
          
        }}
      />

      {/* Sort Options */}
      <select
        className="border p-2 rounded"
        value={sortBy}
        onChange={(e) => {
          setSortBy(e.target.value);
          
        }}
      >
        <option value="createdAt">Newest</option>
        <option value="price">Price</option>
        <option value="name">Name</option>
      </select>

      {/* Order */}
      <select
        className="border p-2 rounded"
        value={order}
        onChange={(e) => {
          setOrder(e.target.value);
          
        }}
      >
        <option value="desc">Desc</option>
        <option value="asc">Asc</option>
      </select>
    </div>
  );
}
