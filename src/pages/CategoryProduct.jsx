import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import productCategory from "../helpers/productCategory";
import SummerApi from "../common";
import SearchVerticalProductCard from "../components/SearchVerticalProductCard";

const CategoryProduct = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const [filterCategory, setFilterCategory] = useState([]);
  const location = useLocation();
  const urlSearch = new URLSearchParams(location.search);
  const urlCategoryArrayList = urlSearch
    .getAll("category")
    .map((el) => el.toLowerCase());
  const urlCategoryObject = {};
  const navigate = useNavigate();
  const [sortBy,setSortBy] = useState("");

  urlCategoryArrayList.forEach((el) => {
    urlCategoryObject[el] = true;
  });

  const [selectCategory, setSelectCategory] = useState(urlCategoryObject);

  const handleChecked = (e) => {
    const { name, value, checked } = e.target;
    setSelectCategory((prev) => {
      return { ...prev, [value]: checked };
    });
  };

  const fetchData = async () => {
    const fetchRes = await fetch(SummerApi.filterProduct.url, {
      method: SummerApi.filterProduct.method,
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        category: filterCategory,
      }),
    });
    const resData = await fetchRes.json();
    if (resData.success) {
      setData(resData.data);
    }
  };

  useEffect(() => {
    fetchData();
  }, [filterCategory]);

  useEffect(() => {
    const categoryFilter = Object.keys(selectCategory)
      .map((categoryKeyName) => {
        if (selectCategory[categoryKeyName]) {
          return categoryKeyName;
        }
        return null;
      })
      .filter((el) => el);
    setFilterCategory(categoryFilter);

    const urlFormat = categoryFilter.map((el, index) => {
      if (categoryFilter.length - 1 === index) {
        return `category=${el}`;
      }
      return `category=${el}&`;
    });

    navigate(`/category-product?${urlFormat.join("")}`);
  }, [selectCategory]);

  const handleSortBy = (e)=>{
    const {value} = e.target;
    setSortBy(value);
    if(value === "asc"){
      setData(prev=>prev.sort((a,b)=>a.sellingPrice - b.sellingPrice))
    } else if(value === "dsc"){
      setData(prev=>prev.sort((a,b)=>b.sellingPrice - a.sellingPrice))
    }
  }

  return (
    <div className="container mx-auto p-4">
      {/** Desktop version */}
      <div className="hidden lg:grid grid-cols-[200px,1fr] ">
        {/** Left Side */}
        <div className="bg-white p-2 min-h-[calc(100vh-120px)] max-h-[calc(100vh-120px)] overflow-y-scroll ">
          <div>
            <h3 className="text-base font-medium text-slate-500 uppercase border-b border-slate-300 pb-2">
              Sort by
            </h3>
            <form className="flex flex-col gap-3 py-2">
              <div className="flex items-center gap-2">
                <input type="radio" name="sortBy" id="sortBy1" value="asc" onChange={handleSortBy} checked={sortBy === "asc"} />
                <label htmlFor="sortBy1" >Price - Low To Hight</label>
              </div>
              <div className="flex items-center gap-2">
                <input type="radio" name="sortBy" id="sortBy2" value="dsc" onChange={handleSortBy} checked={sortBy === "dsc"} />
                <label htmlFor="sortBy2" >Price - Hight To Low</label>
              </div>

              {/** Filter By */}
              <div className="my-2 flex flex-col gap-2">
                <h3 className="text-base font-medium text-slate-500 uppercase border-b border-slate-300 pb-2">
                  Category
                </h3>
                {productCategory.map((category, i) => {
                  return (
                    <div
                      className="flex gap-2 items-center"
                      key={category.label}
                    >
                      <input
                        type="checkbox"
                        name={"category"}
                        id={`category-${category.value}`}
                        value={category.value}
                        checked={selectCategory[category.value]}
                        onChange={handleChecked}
                      />
                      <label
                        htmlFor={`category-${category.value}`}
                        className="text-lg"
                      >
                        {category.label}
                      </label>
                    </div>
                  );
                })}
              </div>
            </form>
          </div>
        </div>
        {/** Right Side */}
        <div className="p-2">
          <p className="font-medium text-lg text-slate-800 my-2">Search Result: {data.length}</p>
          <div className="max-h-[calc(100vh-120px)] overflow-y-scroll">
          {data.length !== 0 && (
            <SearchVerticalProductCard data={data} loading={loading} />
          )}
          </div>
       
        </div>
      </div>
    </div>
  );
};

export default CategoryProduct;
