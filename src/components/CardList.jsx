import React, { useState, useEffect } from "react";
import Card from "./Card";
import Button from "./Button";
import Search from "./Search";

const limit = 10;

const CardList = ({ data }) => {
  const defaultDataset = data.slice(0, limit);
  const [offset, setOffset] = useState(0);
  const [products, setProducts] = useState(defaultDataset);
  const [filteredData, setFilteredData] = useState(data);

  useEffect(() => {
    setProducts(filteredData.slice(offset, offset + limit));
  }, [offset, limit, filteredData]);

  // Single handler for both Previous and Next (Task 2a)
  const handlePageChange = (direction) => {
    setOffset((prev) => prev + direction * limit);
  };

  // Filter by tags (Task 1)
  const filterTags = (searchTerm) => {
    const term = searchTerm.toLowerCase();
    const filtered = data.filter((product) =>
      product.tags && product.tags.some((tag) =>
        tag.toLowerCase().includes(term)
      )
    );
    setFilteredData(filtered);
    setOffset(0);
  };

  return (
    <div className="cf pa2">
      {/* Task 1a: Search above cards */}
      <Search handleSearch={filterTags} />

      <div className="mt2 mb2">
        {products.map((product) => (
          <Card key={product._id} {...product} />
        ))}
      </div>

      {/* Pagination Buttons */}
      <div className="flex items-center justify-center pa4">
        <Button
          text="Previous"
          handleClick={() => handlePageChange(-1)}
          disabled={offset === 0}
        />
        <Button
          text="Next"
          handleClick={() => handlePageChange(1)}
          disabled={offset + limit >= filteredData.length}  // Task 2b: disable at end
        />
      </div>
    </div>
  );
};

export default CardList;