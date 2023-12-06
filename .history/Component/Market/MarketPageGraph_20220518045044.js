import React from 'react';
import GraphComponent from '../GraphCard.js';
import ApexMedianChart from './ApexMedianChart.js';
import SaleInventoryGraph from './SaleInventoryGraph.js';
import SharePriceCutGraph from './SharePriceCutGraph.js';
import MedianPriceCut from './MedianPriceCut.js';
import MedianRental from './MedianRental.js';
import { useEffect, useState } from 'react';
import Link from "next/link"
import GraphData from '../../Api/Grapgh'
import { useRouter } from "next/router";

import MedianDaystoPendingGraph from './MedianDaystoPendingGraph.js';
import BlurGraphComponent from '../BlurGraphComponent.js';

export default function MedianGraph(props) {

    const [inventryDate, setInventryDate] = useState([])
    const [inventry, setInventry] = useState([])
    const [pending, setPending] = useState([])
    const [pendingDate, setPendingDate] = useState([])
    const [list, setList] = useState([])
    const [listDate, setListDate] = useState([])
    const [sales, setSales] = useState([])
    const [salesDate, setSalesDate] = useState([])
    const [ShareListings, setShareListings] = useState([])
    const [ShareListingDate, setShareListingDate] = useState([])
    const [priceCut, setPriceCut] = useState([])
    const [priceCutDate, setPriceCutDate] = useState([])
    const [median, setMedian] = useState([])
    const [medianDate, setMedianDate] = useState([])
    const [user, setUser] = useState('')

    { console.log(props.year) }
    useEffect(() => {
        if (typeof window !== 'undefined') {

            setUser(JSON.parse(localStorage.getItem('user')))
        }
        inventary()
    }, [props.id, props.year])


    const listPrice = () => {
        const response = GraphData.ListPrice(props.id, props.year);
        // { console.log({ year }) }
        // console.log(props.id)
        response.then(value => {
            if (value) {
                // console.log(value.data.Data.listing)

                let data1 = []
                let data2 = []
                for (const key in value.data.Data.listing) {
                    data1.push(key)
                    data2.push(value.data.Data.listing[key]);
                }

                setListDate(data1)
                setList(data2)

                let data3 = []
                let data4 = []
                for (const key in value.data.Data.sales) {
                    data3.push(key)
                    data4.push(value.data.Data.sales[key]);
                }
                setSalesDate(data3)
                setSales(data4)


            }
        })
    }

    const inventary = () => {
        const response = GraphData.Inventory(props.id, props.year);
        // console.log(response)
        response.then(value => {
            console.log(value)
            if (value) {
                // console.log(value.data.Data)
                let data1 = []
                let data2 = []
                for (const key in value.data.Data) {
                    data1.push(key)
                    data2.push(parseInt(value.data.Data[key].replace(',', "").replace('$', "")));
                }

                setInventryDate(data1)
                setInventry(data2)
                console.log("inventart", inventry)

            }
        })
        pendingData();
        listPrice();
        ShareListing();
        PriceCut();
        Median();
    }

    const pendingData = () => {
        const response = GraphData.Pending(props.id, props.year);
        // console.log(props.id)
        response.then(value => {
            console.log("pending", value)
            if (value) {
                // console.log(value.data.Data)

                let data1 = []
                let data2 = []
                for (const key in value.data.Data) {
                    data1.push(key)
                    data2.push(value.data.Data[key]);
                }

                setPendingDate(data1)
                setPending(data2)

            }
        })
    }

    const ShareListing = () => {
        const response = GraphData.ShareListing(props.id, props.year);
        response.then(value => {
            if (value) {
                // console.log(value.data.Data.listing)

                let data1 = []
                let data2 = []
                for (const key in value.data.Data) {
                    data1.push(key)
                    data2.push(value.data.Data[key]);
                }

                setShareListingDate(data1)
                setShareListings(data2)




            }
        })
    }
    const PriceCut = () => {
        const response = GraphData.PriceCut(props.id, props.year);
        response.then(value => {
            console.log(value)
            if (value) {
                // console.log(value.data.Data.listing)
                let data1 = []
                let data2 = []
                for (const key in value.data.Data) {
                    data1.push(key)
                    data2.push(value.data.Data[key]);
                }
                setPriceCutDate(data1)
                setPriceCut(data2)
            }
        })
    }
    const Median = () => {
        const response = GraphData.MedianRental(props.id, props.year);
        response.then(value => {
            console.log(value)
            if (value) {
                // console.log(value.data.Data.listing)

                let data1 = []
                let data2 = []
                for (const key in value.data.Data) {
                    data1.push(key)
                    data2.push(value.data.Data[key]);
                }
                setMedianDate(data1)
                setMedian(data2)
            }
        })
    }

    // data by year




    return (
    <div style={{backgroundColor:'red'}}>
        <GraphComponent
            listPrice={listPrice}
            heading='Median list price vs median sale price'>
            <ApexMedianChart sales={sales} salesDate={salesDate} list={list} listDate={listDate} />
        </GraphComponent>
        <GraphComponent
            listPrice={inventary}
            heading='For sale inventory'>
            <SaleInventoryGraph inventryDate={inventryDate} inventry={inventry} />
        </GraphComponent>
        <GraphComponent
            listPrice={pendingData}
            heading='Median days to pending'>
            <MedianDaystoPendingGraph pendingDate={pendingDate} pending={pending} />
        </GraphComponent>

        {user.packageID == 'shuihshsu' ?
            <GraphComponent>
                <div className='container_'>
                    <div className='graph'>
                        <BlurGraphComponent />
                    </div>
                    <Link href={`/`}>
                        <button className='btn btn-success cetered_ btnYelow px-5'>Unlock</button>
                    </Link>

                </div>
            </GraphComponent>

            :
            <GraphComponent
                listPrice={ShareListing}
                heading='Share of listings with price cut'>
                <SharePriceCutGraph shareList={ShareListings} shareDate={ShareListingDate} />
            </GraphComponent>

        }
        {user.packageID == 'shuihshsu' ?
            <GraphComponent>
                <div className='container_'>
                    <div className='graph'>
                        <BlurGraphComponent />
                    </div>
                    <Link href={`/`}>
                        <button className='btn btn-success cetered_ btnYelow px-5'>Unlock</button>
                    </Link>

                </div>
            </GraphComponent>

            :

            <GraphComponent
                listPrice={PriceCut}
                heading='Median price cut'>
                <MedianPriceCut priceCut={priceCut} priceCutDate={priceCutDate} />
            </GraphComponent>
        }
        {user.packageID == 'shuihshsu' ?
            <GraphComponent>
                <div className='container_'>
                    <div className='graph'>
                        <BlurGraphComponent />
                    </div>
                    <Link href={`/updatePackage`}>
                        <button className='btn btn-success cetered_ btnYelow px-5'>Unlock</button>
                    </Link>

                </div>
            </GraphComponent>

            :
            <GraphComponent
                listPrice={Median}
                heading='Median rental'>
                <MedianRental median={median} medianDate={medianDate} />
            </GraphComponent>

        }
    </div>)
}
