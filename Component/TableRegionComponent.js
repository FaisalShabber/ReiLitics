/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";
import Link from "next/link";

const TableRegionComponent = ({ onClick, ...props }) => {
  const [isFavourite, setIsFavourite] = useState(false);

  useEffect(() => {
    if (
      props.favourites.some(
        (el) => el.regionID === Number(props.record.regionID)
      )
    ) {
      setIsFavourite(true);
    } else {
      setIsFavourite(false);
    }
  }, [props.favourites, props.record.regionID]);

  const DeleteFavrt = (id) => {
    setIsFavourite(false);
    props.DeleteFavrt(id);
  };

  const AddFavourite = (id) => {
    setIsFavourite(true);
    props.AddFavourite(id);
  };
  return (
    <>
      <div className="d-flex my-auto hover w-100 p-1 hover_Bold pointer-cursor">
        <Link href={`/MarketStats/${props.record.regionID}`} passHref>
          <p
            className="my-auto me-auto"
            onClick={(e) => onClick(e, props.record)}
          >
            {props.record.region}
          </p>
        </Link>
        {isFavourite ? (
          <img
            alt="filledHeart"
            src="/filledHeart.svg"
            onClick={() => DeleteFavrt(props.record.regionID)}
            className="ms-auto my-auto"
          />
        ) : (
          <img
            alt="unfilledHeart"
            src="/unfilledHeart.svg"
            onClick={() => AddFavourite(props.record)}
            className="ms-auto"
          />
        )}
      </div>
    </>
  );
};

export default TableRegionComponent;
