import React from "react";
import Head from "next/head";
import { CSVLink } from "react-csv";
import "antd/dist/antd.css";
import { Table, Button, message } from "antd";
import GetData from "../../Api/GetData";
import { Spin, Tooltip } from "antd";
import withAuth from "../../Component/Auth";
import PostData from "../../Api/PostData";
import DeleteData from "../../Api/DeleteData";
import TableRegionComponent from "../../Component/TableRegionComponent";
import TagManager from "react-gtm-module";
import { convertToCurrency } from "../../helpers/convert-to-currency";
import { setItemToSessionStorage } from "../../helpers/session-storage";
import { withRouter } from "next/router";
import NewSidebar from "../../Component/new.sidebar";
import NewNavbar from "../../Component/new.Navbar";
import { hotjar } from "react-hotjar";
class Aprecation extends React.Component {
  state = {
    filteredInfo: null,
    sortedInfo: null,
    data: [],
    currentPage: 1,
    totalPages: 1,
    favourite: [],
    loading: true,
    region: true,
    regionData: [],
    regionId: "",
    regions: "allStates",
    dataa: false,
    dataRegion: [],
    current_property_tax: 0,
    packageName: "",
  };

  handleChange = (pagination, filters, sorter) => {
    this.tableData(pagination.current);

    this.setState({
      filteredInfo: filters,
      sortedInfo: sorter,
    });
  };
  handleChangee = (e) => {
    console.log(e.target.value);
    this.getRegionId(e.target.value);
    const findStateObj = this.state.regionData.find(
      (item) => item.ZILLOWSTATE === e.target.value
    );
    setItemToSessionStorage("state", findStateObj?.STATENAME);
    this.setState({
      regions: e.target.value,
      current_property_tax: findStateObj?.AVGPropertyTax ?? 0,
    });
  };

  clearFilters = () => {
    this.setState({ filteredInfo: null });
  };

  clearAll = () => {
    this.setState({
      filteredInfo: null,
      sortedInfo: null,
    });
  };

  componentDidMount() {
    this.tableData(1);
    this.favourites();
    this.getRegion();
    this.getUserProfileData();

    TagManager.initialize({ gtmId: "G-H9MYM6Y0B3" });
    hotjar.initialize(3433366, 6);
  }

  getUserProfileData = async () => {
    const response = await GetData.UserProfilGet();
    this.setState({
      ...this.state,
      packageName: response.data?.user?.packageID?.name,
      loading: false
    });
  };

  getRegionId = (region) => {
    if (region === "allStates") {
      const response = GetData.Aprecation(1, region);
      response.then((value) => {
        if (value?.data) {
          const filter = value?.data?.allRecords.filter((props) =>
            props.region.includes(",")
          );
          this.setState({
            data: filter,
            dataRegion: filter,
            totalPages: value?.data?.pages,
            loading: false,
          });
        }
      });
    }
    const response = GetData.AprecationId(region);
    response.then((value) => {
      if (value) {
        this.setState({
          dataRegion: value?.data?.allRecords,
          dataa: true,
          totalPages: value?.data?.pages,
        });
      }
    });
  };

  tableData = (pageNo) => {
    const response = GetData.Aprecation(pageNo, this.state.regions);
    response.then((value) => {
      if (value) {
        const filter = value?.data?.allRecords.filter((props) =>
          props.region.includes(",")
        );
        this.setState({
          data: filter,
          dataRegion: filter,
          totalPages: value?.data?.pages
        });
        var myDiv = document.getElementById("myDiv");
        myDiv.scrollTo({ top: 0, behavior: "smooth" });
      }
    });
  };

  print() {
    var content = document.getElementsByClassName("ant-table-content");
    var pri = document.getElementById("ifmcontentstoprint").contentWindow;
    pri.document.open();
    pri.document.write(content[0].innerHTML);
    pri.document.close();
    pri.focus();
    pri.print();
  }

  favourites = () => {
    const response = GetData.Favourite();

    response.then((value) => {
      if (value) {
        this.setState({
          favourite: value?.data?.favoriteRegions,
        });
      }
    });
  };

  onRegionClick = (e, record) => {
    e.preventDefault();
    const region = record.region.split(", ");
    if (region?.length > 1) {
      const findStateObj = this.state.regionData.find(
        (item) => item.ZILLOWSTATE === region[region.length - 1]
      );
      setItemToSessionStorage("state", findStateObj?.STATENAME ?? "Alabama");
      setItemToSessionStorage("region", record.region);
      setItemToSessionStorage("region_id", record.regionID);
    }
    this.props.router.push(`/MarketStats/${record.regionID}`);
  };

  AddFavourite = (e) => {
    const findState = this.state.regionData.find(
      (props) => props.ZILLOWSTATE === e.region.slice(-2)
    );
    console.log(findState);
    const res = PostData.AddFavouriteCity(e, findState?.STATENAME);
    res
      .then((value) => {
        if (value.data.success) {
          message.success("Added to favourites");
          this.favourites();
        }
      })
      .catch((err) => {
        this.favourites();
      });
  };

  getRegion = () => {
    const response = GetData.MarketRegion();
    response.then((value) => {
      if (value) {
        let race = [];
        for (let key in value.data.Data) {
          race.push(value.data.Data[key]);
          this.setState({
            regionData: race,
            regionId: value.data.Data[key].ZILLOWSTATE,
          });
        }
      }
    });
  };

  DeleteFavrt = (id) => {
    const response = DeleteData.DeleteFavourite(id);
    response
      .then((value) => {
        if (value) {
          message.success("Removed from favourites");

          this.favourites();
        }
        //   setLoading(false);
      })
      .catch((err) => {
        this.favourites();
      });
  };

  render() {
    let { sortedInfo, filteredInfo } = this.state;
    sortedInfo = sortedInfo || {};
    filteredInfo = filteredInfo || {};

    const Info = () => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="12.824"
        height="12.824"
        viewBox="0 0 14.824 14.824"
      >
        <path
          id="info"
          d="M11.912,4.5a7.412,7.412,0,1,0,7.412,7.413A7.412,7.412,0,0,0,11.912,4.5Zm.756,11.535a.258.258,0,0,1-.258.258h-1a.258.258,0,0,1-.258-.258V11.248a.258.258,0,0,1,.258-.258h1a.258.258,0,0,1,.258.258Zm-.763-6.113a.9.9,0,0,1-.893-.9.9.9,0,0,1,1.8,0,.9.9,0,0,1-.9.9Z"
          transform="translate(-4.5 -4.5)"
          fill="#EF6921"
        />
      </svg>
    );
    const columns = [
      {
        title: "Region",
        info: "zxcvbn",
        key: "region",
        width: "11%",
        onFilter: (value, record) => record.region.startsWith(value),
        filteredValue: filteredInfo.value || null,
        sortOrder: sortedInfo.columnKey === "region" && sortedInfo.order,
        sorter: (a, b) => a.region.localeCompare(b.region),
        sortDirections: ["ascend", "descend"],
        ellipsis: true,
        showSorterTooltip: false,
        render: (record) => (
          <Tooltip
            placement="top"
            color="#E8F2FF"
            title="Click on any region for more information"
          >
            <div className="d-flex">
              <Button className="info_class" />
              <TableRegionComponent
                record={record}
                favourites={this.state.favourite}
                DeleteFavrt={this.DeleteFavrt}
                AddFavourite={this.AddFavourite}
                onClick={this.onRegionClick}
              />
            </div>
          </Tooltip>
        ),
      },
      {
        title: () => {
          return (
            <div className="d-flex align-items-center">
              <span style={{ marginRight: "8px" }}>Appreciation</span>
              <Tooltip
                placement="top"
                color="#E8F2FF"
                title="Estimated average yearly property appreciation 2018-present"
              >
                <Button className="info_class">
                  <Info />
                </Button>
              </Tooltip>
            </div>
          );
        },
        bordered: true,
        render: (record) => <>{Math.round(record.avgGrowth * 100) / 100}%</>,
        key: "avgGrowth",
        width: "10%",
        sorter: (a, b) => a.avgGrowth - b.avgGrowth,
        sortDirections: ["ascend", "descend"],
        sortOrder: sortedInfo.columnKey === "avgGrowth" && sortedInfo.order,
        showSorterTooltip: false,
        ellipsis: true,
      },
      {
        title: "2018",
        render: (record) => <>{Math.round(record.y2018 * 100) / 100}%</>,
        key: "y2018",
        sorter: (a, b) => a.y2018 - b.y2018,
        sortDirections: ["ascend", "descend"],
        sortOrder: sortedInfo.columnKey === "y2018" && sortedInfo.order,
        showSorterTooltip: false,
        ellipsis: true,
        width: "6%",
      },
      {
        title: "2019",
        render: (record) => <>{Math.round(record.y2019 * 100) / 100}%</>,
        key: "y2019",
        width: "6%",
        sorter: (a, b) => a.y2019 - b.y2019,
        sortDirections: ["ascend", "descend"],
        sortOrder: sortedInfo.columnKey === "y2019" && sortedInfo.order,
        showSorterTooltip: false,
        ellipsis: true,
      },
      {
        title: "2020",
        render: (record) => <>{Math.round(record.y2020 * 100) / 100}%</>,
        key: "y2020",
        width: "6%",
        sorter: (a, b) => a.y2020 - b.y2020,
        sortDirections: ["ascend", "descend"],
        sortOrder: sortedInfo.columnKey === "y2020" && sortedInfo.order,
        showSorterTooltip: false,
        ellipsis: true,
      },
      {
        title: "2021",
        render: (record) => <>{Math.round(record.y2021 * 100) / 100}%</>,
        key: "y2021",
        width: "6%",
        sorter: (a, b) => a.y2021 - b.y2021,
        sortDirections: ["ascend", "descend"],
        sortOrder: sortedInfo.columnKey === "y2021" && sortedInfo.order,
        showSorterTooltip: false,
        ellipsis: true,
      },
      {
        title: "2022",
        render: (record) => <>{Math.round(record.y2022 * 100) / 100}%</>,
        key: "y2022",
        width: "6%",
        sorter: (a, b) => a.y2022 - b.y2022,
        sortDirections: ["ascend", "descend"],
        sortOrder: sortedInfo.columnKey === "y2022" && sortedInfo.order,
        showSorterTooltip: false,
        ellipsis: true,
      },
      {
        title: "2023",
        render: (record) => <>{Math.round(record.Y2023 * 100) / 100}%</>,
        key: "Y2023",
        width: "6%",
        sorter: (a, b) => a.Y2023 - b.Y2023,
        sortDirections: ["ascend", "descend"],
        sortOrder: sortedInfo.columnKey === "Y2023" && sortedInfo.order,
        showSorterTooltip: false,
        ellipsis: true,
      },
      {
        title: () => {
          return (
            <div className="d-flex align-items-center">
              <span style={{ marginRight: "8px" }}>Price</span>
              <Tooltip
                placement="top"
                color="#E8F2FF"
                title="Estimated median sale price of a single family home."
              >
                <Button className="info_class">
                  <Info />
                </Button>
              </Tooltip>
            </div>
          );
        },
        dataIndex: "median",
        key: "median",
        width: "7%",
        render: (record) => {
          return <>${convertToCurrency(Math.round(record).toString())}</>;
        },
        sorter: (a, b) => a.median - b.median,
        sortDirections: ["ascend", "descend"],
        sortOrder: sortedInfo.columnKey === "median" && sortedInfo.order,
        showSorterTooltip: false,
        ellipsis: true,
      },
      {
        title: () => {
          return (
            <div className="d-flex align-items-center">
              <span style={{ marginRight: "8px" }}>Tax</span>
              <Tooltip
                placement="top"
                color="#E8F2FF"
                title="Estimated average property tax as a percent to property value (at State level)"
              >
                <Button className="info_class">
                  {" "}
                  <Info />
                </Button>
              </Tooltip>
            </div>
          );
        },
        // dataIndex: 'avgTax',
        key: "avgTax",
        width: "5%",
        render: (record, _text, _index) => {
          if (_index === 3 && (this.state.packageName === "Free" || this.state.packageName === undefined)) {
            return (
              <>
                <span
                  style={
                    (this.state.packageName === "Free" || this.state.packageName === undefined)
                      ? { filter: "blur(6px)", pointerEvents: "none" }
                      : {}
                  }
                >
                  <>
                    {Math.round(
                      (record.avgTax ?? this.state.current_property_tax) * 100
                    ) / 100}
                    %
                  </>
                </span>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginLeft: "3.5rem",
                    zIndex: "100",
                    position: "absolute",
                  }}
                >
                  <button
                    style={{
                      borderRadius: "20px",
                      marginLeft: "5px",
                      padding: "0.5rem 2.5rem",
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
          return (
            <span
              style={
                (this.state.packageName === "Free" || this.state.packageName === undefined)
                  ? { filter: "blur(6px)", pointerEvents: "none" }
                  : {}
              }
            >
              <>
                {Math.round(
                  (record.avgTax ?? this.state.current_property_tax) * 100
                ) / 100}
                %
              </>
            </span>
          );
        },
        sorter: (a, b) => a.avgTax - b.avgTax,
        sortDirections: ["ascend", "descend"],
        sortOrder: sortedInfo.columnKey === "avgTax" && sortedInfo.order,
        showSorterTooltip: false,
        ellipsis: true,
      },
      {
        title: () => {
          return <div className="">Estimated Population</div>;
        },
        dataIndex: "population",
        key: "population",
        width: "13%",
        render: (record) => (
          <span
            style={
              (this.state.packageName === "Free" || this.state.packageName === undefined)
                ? { filter: "blur(6px)", pointerEvents: "none" }
                : {}
            }
          >
            {record?.toLocaleString(record.population)}
          </span>
        ),
        showSorterTooltip: false,
        sorter: (a, b) => a.population - b.population,
        sortDirections: ["ascend", "descend"],
        sortOrder: sortedInfo.columnKey === "population" && sortedInfo.order,
        ellipsis: true,
      },
    ];

    console.log('this.packageName =>>> ', this.packageName)

    return (
      <>
        <Head>
          <title>Appreciation - REI Litics</title>
        </Head>
        <NewNavbar />
        <div
          className="d-inline-flex w-100"
          style={{ background: "#FAFBFF", padding: "18px 20px" }}
        >
          <NewSidebar />

          <div
            style={{ width: "inherit" }}
            className="overflow_class"
            id="myDiv"
          >
            <div className="container mx-auto mt-3 px-md-5">
              <p className="fs-40 Gothic_3D fot-mon">Market Appreciation</p>
              <p
                style={{
                  marginTop: "8px",
                  fontSize: "15px",
                  color: "#676767",
                }}
              >
                <span
                  style={{
                    color: "#EF6921",
                    fontWeight: "bold",
                  }}
                >
                  Tip:
                </span>{" "}
                Click on a region name for more information.
              </p>
              <div className="my-3 d-flex">
                <div className="my-auto row w-100">
                  <div className="p-0 d-block col-12">
                    <label className="orangetxt fs-13">Select State</label>
                    <select
                      className="form-control form-select form-control-sm"
                      value={this.state.regions}
                      onChange={this.handleChangee}
                      style={{
                        width: "100%",
                        maxWidth: "200px",
                      }}
                    >
                      <option value={"allStates"}>All</option>
                      {this.state.regionData.map((state) => {
                        return (
                          <option
                            key={state.STATENAME}
                            value={state.ZILLOWSTATE}
                          >
                            {state.STATENAME}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>
              </div>
              <div
                className="my-3 ms-auto"
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <button
                  className="px-4 btn btn-orange fs-14"
                  onClick={this.print}
                  disabled={(this.state.packageName === "Free" || this.state.packageName === undefined)}
                >
                  Print
                </button>
                <CSVLink
                  filename={"Market_Appreciation_Table.csv"}
                  className="px-4 btn btn-orange fs-14 ms-2"
                  data={this.state.data}
                  onClick={() => {
                    message.success("The file is downloading...");
                  }}
                  style={(this.state.packageName === "Free" || this.state.packageName === undefined) ? { opacity: '0.7', pointerEvents: 'none' } : {}}
                  disabled={(this.state.packageName === "Free" || this.state.packageName === undefined)}
                >
                  Download CSV
                </CSVLink>
              </div>
              {this.state.loading ? (
                <div className="mt-5 text-center">
                  <Spin />
                </div>
              ) : (
                <div>
                  {this.state.dataa ? (
                    <Table
                      columns={columns}
                      colors={["#123123", "rgba(123,123,123,12)"]}
                      averageDuplicates
                      inferBlanks
                      pagination={{
                        pageSize: 100,
                        defaultCurrent: this.state.currentPage,
                        total: this.state.totalPages * 100,
                      }}
                      dataSource={this.state.dataRegion}
                      onChange={this.handleChange}
                      scroll={{ x: 1200 }}
                      responsive={true}
                    />
                  ) : (
                    <Table
                      columns={columns}
                      colors={["#123123", "rgba(123,123,123,12)"]}
                      averageDuplicates
                      inferBlanks
                      pagination={{
                        pageSize: 100,
                        defaultCurrent: this.state.currentPage,
                        total: this.state.totalPages * 100,
                      }}
                      dataSource={this.state.data}
                      onChange={this.handleChange}
                      scroll={{ x: 1200 }}
                      responsive={true}
                    />
                  )}
                  <iframe
                    id="ifmcontentstoprint"
                    style={{
                      height: "100%",
                      width: "100%",
                      position: "absolute",
                      display: "none",
                    }}
                  ></iframe>
                </div>
              )}
            </div>
          </div>
        </div>
      </>
    );
  }
}
export default withRouter(withAuth(Aprecation));
