import React, { useState, useEffect } from 'react';
import EconomicGraphs from './EconomicGraphs';
import GraphData from "../../Api/Grapgh"
import GraphComponent from '../GraphCard';
import BlurGraphComponent from '../BlurGraphComponent';
import Link from 'next/link';

export default function Economic() {
    const [regionName, setRegionName] = useState([])
    const [updatedRegionName, setUpdatedRegionName] = useState([]);
    const [region, setRegion] = useState([]);
    const [updatedRegion, setUpdatedRegion] = useState([]);
    const [unEmploymentData, setUnEmploymentData] = useState([])
    const [employmentDate, setEmploymentDate] = useState([])
    const [sector, setSector] = useState([])
    const [sectorDate, setSectorDate] = useState([])
    const [user, setUser] = useState('')
    const [states, setstates] = useState(false)
    const [isoCode, setisoCode] = useState(false)
    const [area, setarea] = useState(false)

    function handleChange(e) {
        setRegion(e.target.value);
        setUpdatedRegion(e.target.value);
        unEmployment(e.target.value);
        industry(e.target.value);
    }
    // const router = useRouter();

    // const eventId = router.query.id
    useEffect(() => {
        if (typeof window !== 'undefined') {

            setUser(JSON.parse(localStorage.getItem('user')))
        }
        RegionGet()
        setRegion('Alabama');
        setUpdatedRegion('Alabama');
        unEmployment('Alabama');
        industry('Alabama');
        console.log("okakjhedkj");
    }, []);
    function getStates() {
        const response 
    }
    const RegionGet = () => {
        const response = GraphData.populationEconomic();
        response.then(value => {
            if (value) {
                setRegionName(value.data.Data);
                setUpdatedRegionName(value.data.Data);

            }
        })
    }
    const unEmployment = (region) => {
        const response = GraphData.unEmployment(region);
        response.then(value => {
            if (value) {
                let data1 = []
                let data2 = []
                for (const key in value.data.Data) {
                    data1.push(key)
                    data2.push(value.data.Data[key]);
                }

                setEmploymentDate(data1)
                setUnEmploymentData(data2)

            }
        })
    }
    const industry = (region) => {
        const response = GraphData.industary(region);
        response.then(value => {
            if (value) {
                let data1 = []
                let data2 = []
                for (const key in value.data.Data) {
                    data1.push(key)
                    data2.push(value.data.Data[key].replace(",", "").replace(",", ""));
                }
                setSectorDate(data1)
                setSector(data2)

            }
        })
    }
    const print = () => {

        var content = document.getElementsByClassName('Economic_pg');
        var pri = document.getElementById('ifmcontentstoprint').contentWindow;
        pri.document.open();
        pri.document.write(content[0].innerHTML);
        pri.document.close();
        pri.focus();
        pri.print();
    }

    return (
        <div>
            <p className='fs-40 Gothic_3D my-3'>{region}</p>
            <div className='d-flex my-3'>
                <div className='row w-25 my-auto'>
                    <div className='d-block col-6'>
                        <label className='orangetxt fs-13'>Select State</label>
                        <select className="form-control form-select form-control-sm" onChange={handleChange} value={region}>
                            <option value={"state"}>{"state"}</option>
                        </select>
                    </div>
                    <div className='d-block col-6'>
                        <label className='orangetxt fs-13'>Select Area</label>
                        <select className="form-control form-select form-control-sm" onChange={handleChange} value={region}>
                            {regionName?.areas?.map((state) => {
                                return (
                                    <option value={state}>{state}</option>
                                )
                            })}
                        </select>
                    </div>
                </div>
                <div className='ms-auto my-auto'>
                    <button onClick={() => window.open("https://www.zillow.com/")} className='btn btn-orange px-4 fs-14 m-1'  >Search properties on  Zillow </button>
                    {user.packageID == 'shuihshsu' ?
                        <>
                            <button className='btn greyBtn px-4 fs-14 m-1' disabled>Add to Favourite <img src='/unfilledHeart1.svg' className='ms-2 my-auto' /></button>
                            <button className='btn greyBtn px-4 fs-14 m-1' disabled>Print and Download<img src={'/print.svg'} className='ms-2 my-auto' /></button>
                        </>

                        :

                        <>
                            <button className='btn btn-orange px-4 fs-14 m-1'>Add to Favourite <img src='/unfilledHeart1.svg' className='ms-2 my-auto' /></button>
                            <button className='btn btn-orange px-4 fs-14 m-1' onClick={print}>Print and Download<img src={'/print.svg'} className='ms-2 my-auto' /></button>
                        </>


                    }
                </div>
            </div>
            <div className='Economic_pg'>
                <div className=''>
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
                        <EconomicGraphs
                            employmentDate={employmentDate}
                            unEmploymentData={unEmploymentData}
                            sector={sector}
                            sectorDate={sectorDate}
                            onChange={handleChange}
                            regionName={updatedRegionName}
                            region={updatedRegion} />


                    }
                </div>
                <footer className='text-center mt-5'>
                    <p>DISCLAIMER - Data is provided “as is” via the Public Records API.</p>
                    <p>© Zillow, Inc. 2006-2020. Use is subject to Term of Use.</p>
                </footer>
                <iframe id="ifmcontentstoprint" style={{
                    height: '100%',
                    width: '100%',
                    position: 'absolute',
                    display: 'none',
                }}></iframe>
            </div>
        </div>
    );
}
