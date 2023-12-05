import React, { useCallback, useEffect, useState } from "react";
import "antd/dist/antd.css";
import { Table } from "antd";
import GetData from '../../Api/GetData';

export default function RentalTableComponent(props) {
  const [packageName, setPackageName] = useState("");
  const [loading, setLoading] = useState(false);

  const getUserProfileData = useCallback(async () => {
    setLoading(true);
    const response = await GetData.UserProfilGet();
    setPackageName(response.data?.user?.packageID?.name);
    setLoading(false);
  }, []);

  const columns = [
    {
      title: "Average rental growth",
      render: (record) => (
        <p className="mb-0" style={(packageName === 'Free' || packageName === undefined || packageName === '') ? { filter: 'blur(6px)', pointerEvents: 'none' } : {}}>
          {Math.round((record?.avgGrowth ?? 1) * 100) / 100}%
        </p>
      ),
      width: "20%",
      bordered: true,
    },
    {
      title: "2018",
      width: "10%",
      render: (record) => <span style={(packageName === 'Free' || packageName === undefined || packageName === '') ? { filter: 'blur(6px)', pointerEvents: 'none' } : {}}>{Math.round((record?.y2018 ?? 1) * 100) / 100}%</span>,
    },
    {
      title: "2019",
      width: "10%",
      render: (record) => <span style={(packageName === 'Free' || packageName === undefined || packageName === '') ? { filter: 'blur(6px)', pointerEvents: 'none' } : {}}>{Math.round((record?.y2019 ?? 1) * 100) / 100}%</span>,
    },
    {
      title: "2020",
      width: "10%",
      render: (_, record, index) => {
        if (index === 0 && (packageName === 'Free' || packageName === undefined || packageName === '')) {
          return (
            <>
              <span style={(packageName === 'Free' || packageName === undefined || packageName === '') ? { filter: 'blur(6px)', pointerEvents: 'none' } : {}}>{Math.round((record?.y2020 ?? 1) * 100) / 100}%</span>
              <div style={{ display: 'flex', justifyContent: 'center', zIndex: '100', position: 'absolute', marginLeft: '3rem', marginTop: '-3rem' }}>
              <button
                    style={{
                      borderRadius: "20px",
                      marginLeft: '5px',
                      padding: '0.5rem 2.5rem'
                    }}
                    className="no_brdr fs-15 btnYelow"
                    onClick={() => {
                      window.location.href = `/#Prices`;
                    }}
                  >
                    Unlock
                  </button>
            </div>
            </>
          );
        }
        return <span style={(packageName === 'Free' || packageName === undefined || packageName === '') ? { filter: 'blur(6px)', pointerEvents: 'none' } : {}}>{Math.round((record?.y2020 ?? 1) * 100) / 100}%</span>;
      },
    },
    {
      title: "2021",
      width: "10%",
      render: (record) => <span style={(packageName === 'Free' || packageName === undefined || packageName === '') ? { filter: 'blur(6px)', pointerEvents: 'none' } : {}}>{Math.round((record?.y2021 ?? 1) * 100) / 100}%</span>,
    },
    {
      title: "2022",
      width: "10%",
      render: (record) => <span style={(packageName === 'Free' || packageName === undefined || packageName === '') ? { filter: 'blur(6px)', pointerEvents: 'none' } : {}}>{Math.round((record?.y2022 ?? 1) * 100) / 100}%</span>,
    },
    {
      title: "2023",
      width: "10%",
      render: (record) => <span style={(packageName === 'Free' || packageName === undefined || packageName === '') ? { filter: 'blur(6px)', pointerEvents: 'none' } : {}}>{Math.round((record?.y2023 ?? 1) * 100) / 100}%</span>,
    },
    {
      title: "Current Median Rental",
      width: "20%",
      dataIndex: "median",
      render: (record) => <span style={(packageName === 'Free' || packageName === undefined || packageName === '') ? { filter: 'blur(6px)', pointerEvents: 'none' } : {}}>${Number(record)?.toLocaleString()}</span>,
    },
  ];

  useEffect(() => {
    getUserProfileData();
  }, [getUserProfileData]);

  return (
    <div>
      <Table
        columns={columns}
        dataSource={loading ? [] : props.rental}
        size="small"
        scroll={{ x: true }}
        responsive={true}
        loading={loading}
      />
    </div>
  );
}
