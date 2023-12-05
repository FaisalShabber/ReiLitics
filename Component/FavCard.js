/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { setItemToSessionStorage } from "../helpers/session-storage";

function FavCard(props) {
  const router = useRouter();
  const onClick = (e) => {
    e.preventDefault();
    setItemToSessionStorage("region", props.city);
    setItemToSessionStorage("state", props.state);
    setItemToSessionStorage("region_id", props.id);
    router.push(`/MarketStats/${props.id}`);
  };
  return (
    <>
      <div className="col-lg-3 col-md-4 col-6">
        <div className="bg-dash brdr p-4 hover" style={{ height: "200px" }}>
          <div className="d-flex">
            <img
              src="./filledHeart.svg"
              onClick={() => props.DeleteFavrt(props.id)}
              className="ms-auto icon-w"
              style={{ cursor: "pointer" }}
            />
          </div>
          <Link href={`/MarketStats/${props.id}`} passHref>
            <div className="text-center my-3" onClick={onClick}>
              <img src="./bx-stats.svg" className="my-2" />
              <p className="fs-18">{props.city}</p>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}

export default FavCard;
