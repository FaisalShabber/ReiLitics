import Link from "next/link";
import blogData from "./Data/BlogData";
import GetData from "../Api/GetData";
import React, { useEffect, useState } from "react";

function Categories() {
  const [data, setData] = useState([]);
  const [categoriesVisible, setcategoriesVisible] = useState(4);

  useEffect(() => {
    const response = GetData.BlogComponent();
    response.then((value) => {
      setData(value.data.articles);
    });
  }, []);

  // const uniqueCategories = [...new Set( blogData.map(obj => obj.category)) ];
  return (
    <div>
      {data.slice(0, categoriesVisible).map((x) => {
        return (
          <>
            <Link href={`/BlogCategory/${x.name}`}>
              <p className="fs-17 catagory">{x.title}</p>
            </Link>
          </>
        );
      })}
      <div className="text-center mt-5">
        {data.length > 3 &&
          (categoriesVisible < data.length ? (
            <button
              className="bg_theme brdr text-white no_brdr"
              onClick={() => setcategoriesVisible(categoriesVisible + 4)}
              style={{ cursor: "pointer" }}
            >
              load More
            </button>
          ) : (
            <button
              className="bg_theme brdr text-white no_brdr"
              onClick={() => setcategoriesVisible(categoriesVisible - 4)}
              style={{ cursor: "pointer" }}
            >
              Show Less
            </button>
          ))}
      </div>
    </div>
  );
}

export default Categories;
