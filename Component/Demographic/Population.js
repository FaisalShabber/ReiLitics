import React from "react";
import PopulationGraph from "./PopulationGraph";
import { convertToCurrency } from "./../../helpers/convert-to-currency";

export default function Population(props) {
  return (
    <div className="card my-4 relative">
      <div className="w-100">
        <p className="fs_25 mb-0 ">Population</p>
        {/* <p className='fs-30 mb-0 Gothic_3D'>887,232</p> */}
        <p className="fs_24 mb-0">
          {props?.population[props.population.length - 1]
            ? convertToCurrency(props?.population[props.population.length - 1])
            : "N/A"}
        </p>
      </div>
      <div style={ props.packageName === 'Free' ? { filter: 'blur(40px)' } : {}}>
        <PopulationGraph
          population={props.population}
          populationDate={props.populationDate}
        />
      </div>
      {/* <div className="row container gx-5 my-3">
        <div className="col-sm-12 col-md-6 bg_ligt_new btn_tags d-inline-flex py-4 align-items-center">
          <span className="fs-16 Bold">State</span>
          <span className="ms-auto fs-16">{props?.state}</span>
        </div>
        <div className="col-sm-12 col-md-6 btn_tags d-inline-flex py-4 align-items-center">
          <span className="fs-16 Bold">Growth Since 2010</span>
          <span className="ms-auto fs-16">
            {props?.otherData?.growthSince2010}%
          </span>
        </div>
        <div className="col-sm-12 col-md-6 btn_tags d-inline-flex py-4 align-items-center">
          <span className="fs-16 Bold">County</span>
          <span className="ms-auto w-50 fs-16">
            <p className="text-end">{props?.selectedArea}</p>
            <p className="text-end">Marion County</p>
          </span>
        </div>
        {props?.otherData?.rank && (
          <div className="col-sm-12 col-md-6 btn_tags d-inline-flex py-4 align-items-center">
            <span className="fs-16 Bold">Rank in State</span>
            <span className="ms-auto fs-16"></span>
          </div>
        )}
        {props?.otherData?.landArea && (
          <div className="col-sm-12 col-md-6 bg_ligt_new btn_tags d-inline-flex py-4 align-items-center">
            <span className="fs-16 Bold">Land Area (mi²)</span>
            <span className="ms-auto fs-16"> sq mi</span>
          </div>
        )}
        {props?.otherData?.rank && (
          <div className="col-sm-12 col-md-6 bg_ligt_new btn_tags d-inline-flex py-4 align-items-center">
            <span className="fs-16 Bold">Rank in Country</span>
            <span className="ms-auto fs-16">{props?.otherData?.rank}</span>
          </div>
        )}
        <div className="col-sm-12 col-md-6 bg_ligt_new btn_tags d-inline-flex py-4 align-items-center">
          <span className="fs-16 Bold">Density (mi²)</span>
          <span className="ms-auto fs-16">
            {props?.otherData?.density
              ? convertToCurrency(props?.otherData?.density)
              : ""}
            /sq mi
          </span>
        </div>
        <div className="col-sm-12 col-md-6 bg_ligt_new btn_tags d-inline-flex py-4 align-items-center">
          <span className="fs-16 Bold">Metro Population</span>
          <span className="ms-auto fs-16">
            {props?.otherData?.Pop
              ? convertToCurrency(props?.otherData?.Pop)
              : ""}
          </span>
        </div>
        {props?.otherData?.growthRate && (
          <div className="col-sm-12 col-md-6 bg_ligt_new btn_tags d-inline-flex py-4 align-items-center">
            <span className="fs-16 Bold">2020 Growth Rate</span>
            <span className="ms-auto fs-16"></span>
          </div>
        )}
      </div>
      <div></div> */}
    </div>
  );
}
