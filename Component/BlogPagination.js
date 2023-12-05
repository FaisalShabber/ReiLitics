import React from "react";
import ReactPaginate from "react-paginate";
import { useState } from "react";
import BlogComponent from "./BlogComponent";

const Pagination = (props) => {
  const [pageNumber, setPageNumber] = useState(0);

  const userPerPage = props.perpage;
  const pagesVisited = pageNumber * userPerPage;

  const displayUsers = props.data
    .slice(pagesVisited, pagesVisited + userPerPage)
    .map((user) => {
      return (
        <div className={props.className} key={Math.random()}>
          <BlogComponent data={user} />
        </div>
      );
    });
  const pageCount = Math.ceil(props.data.length / userPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };
  return (
    <>
      {displayUsers}
      <div>
        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          pageCount={pageCount}
          onPageChange={changePage}
          containerClassName={`text-white paginationBtn`}
          previousLinkClassName={"nextBttn"}
          nextLinkClassName={"nextBttn"}
          disabledClassName={"paginationDisabled"}
          activeClassName={"paginationActive"}
        />
      </div>
    </>
  );
};

export default Pagination;
