"use client";

import { useState, useEffect } from "react";
import { ProductWithCategory, Filters} from "@/types/productTypes";
import ProductCard from "@/components/productCard";
import Navbar from "@/components/navbar";
import ProductFilters from "@/components/productFilters";
import Pagination from "@/components/paginations";




export default function ProductsPage() {
  const [products, setProducts] = useState<ProductWithCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
   const [filters, setFilters] = useState<Filters>({});


  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6; // adjust as needed

  // Calculate indexes
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  // Number of pages
  const totalPages = Math.ceil(products.length / productsPerPage);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let url = "/api/products";
        const params=new URLSearchParams();
        if(filters.category)
        {
          params.append("category",filters.category);
        }
        if(filters.minPrice)
        {
          params.append("minPrice",filters.minPrice);
        }
        if(filters.maxPrice)
        {
          params.append("maxPrice",filters.maxPrice)
        }
        if(filters.sortBy)
        {
          params.append("sortBy",filters.sortBy);
        }
        if(filters.order){
          params.append("order",filters.order);
        }
        if(params.toString())
        {
          url+=`?${params.toString()}`
        }
        const res = await fetch(url);
        const data = await res.json();

        if (!res.ok) throw new Error(data.error || "Failed to fetch products");

        setProducts(data.products);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [filters]);

  if (loading) return <p className="text-center mt-10">Loading products...</p>;
  if (error) return <p className="text-center mt-10 text-red-600">{error}</p>;

  return (
    <>
   
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-8">Products</h1>
       <ProductFilters setFilters={setFilters} filters={filters}/>
      {products.length === 0 ? (
        <p className="text-gray-600">No products found.</p>
      ) : (
        <>
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
          {currentProducts.map((product, index) => (
              <ProductCard key={index} product={product} />
            ))}
        </div>
           <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages}/>
          </>
      )}
    </div>
    </>
  );
}
