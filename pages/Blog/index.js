import React, { useEffect, useState } from "react";
import Head from "next/head";
import Script from "next/script";
import Foter from "../../Component/Footer";
import GetData from "../../Api/GetData";
import HeadImage from "../../styles/UI/HeadImage";
import Navbar from "../../Component/Navbar";
import Pagination from "../../Component/BlogPagination";
import TagManager from "react-gtm-module";
import { hotjar } from "react-hotjar";

const Blog = () => {
  const [data, setData] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    TagManager.initialize({ gtmId: "G-H9MYM6Y0B3" });
    hotjar.initialize(3433366, 6);
  }, []);

  /**
   *
   * @param {React.MouseEvent<HTMLButtonElement>} e
   */
  const onFilterChange = (e) => {
    const {
      dataset: { name },
    } = e.currentTarget;
    setSelectedCategory(name);
    setFiltered(
      name === "All"
        ? [...data]
        : [...data.filter((item) => item.category === name)]
    );
  };

  useEffect(() => {
    const response = GetData.BlogComponent();
    const categoriesResponse = GetData.BlogCatagory();
    response.then((value) => {
      if (value) {
        setData(value.data.articles);
        setFiltered(value.data.articles);
        setLoading(false);
      }
    });

    categoriesResponse.then((res) => {
      setCategories([...new Set(res.data.categories.map((item) => item.name))]);
    });
  }, []);
  return (
    <>
      <Head>
        <title>Blog - REI Litics</title>
      </Head>

      <Navbar />
      <HeadImage header="ARTICLES" />
      <div
        className="container "
        style={{ marginTop: "8rem", marginBottom: "22rem" }}
      >
        <div className="row">
          <div className={"blog-categories mt-5"}>
            {["All", ...categories].map((item, idx) => (
              <button
                key={idx}
                className={`blog-categories-btn p-3 border-2 mx-2 ${
                  item === selectedCategory ? "active" : ""
                }`}
                data-name={item}
                onClick={onFilterChange}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
        {loading ? (
          <div className="text-center mt-5">
            <div className="spinner-border" role="status" />
          </div>
        ) : (
          <div className="row my-3 gx-4 gy-3">
            <Pagination
              id={filtered._id}
              data={filtered}
              className="col-sm-4"
              perpage="9"
            />
          </div>
        )}
      </div>
      <Foter />
    </>
  );
};

export default Blog;
