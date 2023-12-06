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
import TagManager from "react-gtm-module";
import TableRegionComponent from "../../Component/TableRegionComponent";
import { convertToCurrency } from "../../helpers/convert-to-currency";
import { setItemToSessionStorage } from "../../helpers/session-storage";
import { withRouter } from "next/router";
import NewSidebar from "../../Component/new.sidebar";
import NewNavbar from "../../Component/new.Navbar";
import { hotjar } from "react-hotjar";
class AverageAprication extends React.Component {
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
    packageName: ""
  };

  handleChange = (pagination, filters, sorter) => {
    if (pagination.current !== 1) {
      this.tableData(pagination.current);
    }

    this.setState({
      filteredInfo: filters,
      sortedInfo: sorter,
    });
  };
  handleChangee = (e) => {
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
    hotjar.initialize(3433366, 6);
    TagManager.initialize({ gtmId: "G-H9MYM6Y0B3" });
  }
  
  getUserProfileData = async () => {
    const response = await GetData.UserProfilGet();
    this.setState({
      ...this.state,
      packageName: response.data?.user?.packageID?.name,
      loading: false,
    });
  };

  getRegionId = (region) => {
    if (region === "allStates") {
      this.tableData(1);
      return;
    }
    const response = GetData.AprecationId(region);
    response.then((value) => {
      if (value) {
        this.setState({
          dataRegion: value?.data?.allRecords,
          dataa: true,
        });
      }
    });
  };

  tableData = () => {
    const response = GetData.AprecationMerged();

    response.then((value) => {
      if (value) {
        let filterdata;
        filterdata = value.data.Data.filter((props) => {
          return this.props.router.query.medianPrice === "0"
            ? props.median
            : props.median < this.props.router.query.medianPrice;
        });

        filterdata = filterdata.filter((props) => {
          return props.avgTax < this.props.router.query.tax;
        });

        filterdata = filterdata.filter((props) => {
          return Number(props.LLfriendly) < this.props.router.query.score;
        });

        filterdata = filterdata.filter((props) => {
          return (
            Number(props.population) > this.props.router.query.start &&
            Number(props.population) <= this.props.router.query.end
          );
        });

        filterdata = filterdata.filter((props) => {
          return this.props.router.query.average &&
            this.props.router.query.rental
            ? props.avgGrowth > this.props.router.query.average &&
                props.rentalGrowth > this.props.router.query.rental
            : this.props.router.query.rental
            ? props.rentalGrowth > this.props.router.query.rental
            : this.props.router.query.average &&
              props.avgGrowth > this.props.router.query.average;
        });

        this.setState({
          data: filterdata,
          dataRegion: filterdata,
          totalPages: value?.data?.pages,
        });
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
    //
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
        // fixed: "left",
        key: "region",
        width: "14%",
        font: "bold",
        onFilter: (value, record) => record.region.startsWith(value),
        filteredValue: filteredInfo.value || null,
        sortOrder: sortedInfo.columnKey === "region" && sortedInfo.order,
        sorter: (a, b) => a.region.localeCompare(b.region),
        sortDirections: ["ascend", "descend"],
        ellipsis: true,
        showSorterTooltip: false,
        render: (record, _text, _index) => {
          return (
            <span
              style={
                ((this.state.packageName === "Free" || this.state.packageName === '' || this.state.packageName === undefined) || this.state.packageName === undefined)
                  ? { filter: "blur(6px)", pointerEvents: "none" }
                  : {}
              }
            >
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
            </span>
          );
        }
      },
      {
        title: () => {
          return (
            <div style={{width: 'max-content' }}>
              Growth{" "}
              <Tooltip
                Tooltip
                placement="top"
                color="#E8F2FF"
                title="Estimated average yearly rental growth 2018-present"
              >
                <Button className="info_class">
                  {" "}
                  <Info />
                </Button>
              </Tooltip>
            </div>
          );
        },
        bordered: true,
        render: (record, _text, _index) => {
          return (
            <span
              style={
                ((this.state.packageName === "Free" || this.state.packageName === '' || this.state.packageName === undefined) || this.state.packageName === undefined)
                  ? { filter: "blur(6px)", pointerEvents: "none" }
                  : {}
              }
            >
              <>{record.rentalGrowth}</>
            </span>
          );
        },
        key: "rentalGrowth",
        width: "12%",
        // sorter: (a, b) => a.rentalGrowth - b.rentalGrowth,
        sortDirections: ["ascend", "descend"],
        sortOrder: sortedInfo.columnKey === "rentalGrowth" && sortedInfo.order,
        showSorterTooltip: false,
        ellipsis: true,
      },

      {
        title: () => {
          return (
            <div style={{     width: 'max-content' }}>
              Median{" "}
              <Tooltip
                Tooltip
                placement="top"
                color="#E8F2FF"
                title="Estimated median property rental"
              >
                <Button className="info_class">
                  {" "}
                  <Info />
                </Button>
              </Tooltip>
            </div>
          );
        },
        bordered: true,
        render: (record, _text, _index) => {
          return (
            <span
              style={
                ((this.state.packageName === "Free" || this.state.packageName === '' || this.state.packageName === undefined) || this.state.packageName === undefined)
                  ? { filter: "blur(6px)", pointerEvents: "none" }
                  : {}
              }
            >
              <>
                ${convertToCurrency(Math.round(record.median_rental).toString())}
              </>
            </span>
          );
        },
        key: "median_rental",
        width: "12%",
        showSorterTooltip: false,
        ellipsis: true,
      },

      {
        title: () => {
          return (
            <div style={{ width: 'max-content'}}>
              Score{" "}
              <Tooltip
                Tooltip
                placement="top"
                color="#E8F2FF"
                title="Legislation to protect landlords (at State level) 1 - Most Landlord friendly state. 5 - Least landlord friendly state."
              >
                <Button className="info_class">
                  {" "}
                  <Info />
                </Button>
              </Tooltip>
            </div>
          );
        },
        bordered: true,
        render: (record, _text, _index) => {
          if (_index === 0 && ((this.state.packageName === "Free" || this.state.packageName === '' || this.state.packageName === undefined) || this.state.packageName === undefined)) {
            return (
              <>
                <span
                  style={
                    ((this.state.packageName === "Free" || this.state.packageName === '' || this.state.packageName === undefined) || this.state.packageName === undefined)
                      ? { filter: "blur(6px)", pointerEvents: "none" }
                      : {}
                  }
                >
                  <>{record.LLfriendly}</>
                </span>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginLeft: "5.5rem",
                    zIndex: "100",
                    position: "absolute",
                    marginTop: '-2.5rem'
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
                ((this.state.packageName === "Free" || this.state.packageName === '' || this.state.packageName === undefined) || this.state.packageName === undefined)
                  ? { filter: "blur(6px)", pointerEvents: "none" }
                  : {}
              }
            >
              <>{record.LLfriendly}</>
            </span>
          );
        },
        key: "LLfriendly",
        width: "12%",
        // sorter: (a, b) => a.LLfriendly - b.LLfriendly,
        sortDirections: ["ascend", "descend"],
        sortOrder: sortedInfo.columnKey === "avgGrowth" && sortedInfo.order,
        showSorterTooltip: false,
        ellipsis: true,
      },
      {
        title: () => {
          return (
            <div style={{ width: 'max-content'     }}>
              Appreciation{" "}
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
        render: (record, _text, _index) => {
          return (
            <span
              style={
                ((this.state.packageName === "Free" || this.state.packageName === '' || this.state.packageName === undefined) || this.state.packageName === undefined)
                  ? { filter: "blur(6px)", pointerEvents: "none" }
                  : {}
              }
            >
              <>{record.avgGrowth}</>
            </span>
          );
        },
        key: "avgGrowth",
        width: "14%",
        // sorter: (a, b) => a.avgGrowth - b.avgGrowth,
        sortDirections: ["ascend", "descend"],
        sortOrder: sortedInfo.columnKey === "avgGrowth" && sortedInfo.order,
        showSorterTooltip: false,
        ellipsis: true,
      },
      {
        title: () => {
          return (
            <div style={{width: 'max-content', fontSize:'14px', fontWeight:'bold' }}>
              Tax{" "}
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
        width: "12%",
        render: (record, _text, _index) => {
          return (
            <span
              style={
                ((this.state.packageName === "Free" || this.state.packageName === '' || this.state.packageName === undefined) || this.state.packageName === undefined)
                  ? { filter: "blur(6px)", pointerEvents: "none" }
                  : {}
              }
            >
              <>{record.avgTax}</>
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
          return (
            <div style={{     width: 'max-content' }}>
              Price{" "}
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
        width: "12%",
        render: (record, _text, _index) => {
          return (
            <span
              style={
                ((this.state.packageName === "Free" || this.state.packageName === '' || this.state.packageName === undefined) || this.state.packageName === undefined)
                  ? { filter: "blur(6px)", pointerEvents: "none" }
                  : {}
              }
            >
              <>${convertToCurrency(Math.round(record).toString())}</>
            </span>
          );
        },
        // sorter: (a, b) => a.median - b.median,
        sortDirections: ["ascend", "descend"],
        sortOrder: sortedInfo.columnKey === "median" && sortedInfo.order,
        showSorterTooltip: false,
        ellipsis: true,
      },

      {
        title: () => {
          return (
            <div style={{     width: 'max-content' }}>
              Population{" "}
              <Tooltip
                Tooltip
                placement="top"
                color="#E8F2FF"
                title="Estimated Population"
              >
                <Button className="info_class">
                  {" "}
                  <Info />
                </Button>
              </Tooltip>
            </div>
          );
        },
        dataIndex: "population",
        key: "population",
        width: "12%",
        render: (record, _text, _index) => {
          const numderData = Number(record);
          return (
            <span
              style={
                ((this.state.packageName === "Free" || this.state.packageName === '' || this.state.packageName === undefined) || this.state.packageName === undefined)
                  ? { filter: "blur(6px)", pointerEvents: "none" }
                  : {}
              }
            >
              <div>
                {numderData?.toLocaleString()}
              </div>
            </span>
          );
        },
        showSorterTooltip: false,
        // sorter: (a, b) => a.population - b.population,
        sortDirections: ["ascend", "descend"],
        sortOrder: sortedInfo.columnKey === "population" && sortedInfo.order,
        ellipsis: true,
      },
    ];
    return (
      <>
        <Head>
          <title>Search Result - REI Litics</title>
        </Head>
        <NewNavbar />
        <div
          className="d-inline-flex w-100"
          style={{ background: "#FAFBFF", padding: "18px 20px" }}
        >
          <NewSidebar />
          <div style={{ width: "inherit" }} className="overflow_class">
            <div className="container mx-auto mt-3 px-md-5">
              <p className="fs-40 Gothic_3D fot-mon">Search Result</p>
              <div className="my-3 d-flex">
                <div className="my-auto ms-auto">
                  <button
                    className="px-4 btn btn-orange fs-14"
                    onClick={this.print}
                    disabled={((this.state.packageName === "Free" || this.state.packageName === '' || this.state.packageName === undefined) || this.state.packageName === undefined)}
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
                    style={((this.state.packageName === "Free" || this.state.packageName === '' || this.state.packageName === undefined) || this.state.packageName === undefined) ? { opacity: '0.7', pointerEvents: 'none' } : {}}
                    disabled={((this.state.packageName === "Free" || this.state.packageName === '' || this.state.packageName === undefined) || this.state.packageName === undefined)}
                  >
                    Download CSV
                  </CSVLink>
                </div>
              </div>
              {this.state.loading ? (
                <div className="mt-5 text-center">
                  <Spin />
                </div>
              ) : (
                <div> 
                  {this.state.data ? (
                    <Table
                      columns={columns}
                      colors={["#123123", "rgba(123,123,123,12)"]}
                      averageDuplicates
                      inferBlanks
                      pagination={{
                        pageSize: 200,
                        defaultCurrent: this.state.currentPage,
                        total: this.state.totalPages * 200,
                      }}
                      dataSource={this.state.dataRegion}
                      onChange={this.handleChange}
                      scroll={{ x: 1200 }}

                    />
                  ) : (
                    <div
                      style={{
                        textAlign: "center",
                        fontSize: "20px",
                        fontWeight: "bold",
                        color: "#000",
                      }}
                    >
                      There is No data with these filters!
                    </div>
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
export default withRouter(withAuth(AverageAprication));
