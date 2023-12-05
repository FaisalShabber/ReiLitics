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
class FilterPopulation extends React.Component {
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

  // setRegionSort = () => {
  //   this.setState({
  //     sortedInfo: {
  //       order: 'ascend',
  //       columnKey: 'Region',
  //     },
  //   });
  // };
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

          // totalPagess: value?.data?.pages,
        });
      }
    });
  };
  tableData = (pageNo) => {
    const response = GetData.Aprecation(pageNo);

    response.then((value) => {
      if (value) {
        // console.log("filter", value?.data?.allRecords);xxx
        let filter = value?.data?.allRecords.filter((props) =>
          props.region.includes(",")
        );

        filter = filter.filter(
          (props) =>
            props.population > this.props.router.query.start &&
            props.population < this.props.router.query.end
        );

        this.setState({
          data: filter,
          dataRegion: filter,
          totalPages: value?.data?.pages,
          loading: false,
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

    response.then(
      (value) => {
        if (value) {
          this.setState({
            favourite: value?.data?.favoriteRegions,
          });
        }
      }
      //   setLoading(false);
    );
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
        title: "REGION",
        info: "zxcvbn",
        fixed: "left",
        key: "region",
        width: "15%",
        onFilter: (value, record) => record.region.startsWith(value),
        filteredValue: filteredInfo.value || null,
        sortOrder: sortedInfo.columnKey === "region" && sortedInfo.order,
        sorter: (a, b) => a.region.localeCompare(b.region),
        sortDirections: ["ascend", "descend"],
        ellipsis: true,
        showSorterTooltip: false,
        render: (record, text, index) => (
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
            <div className="text-uppercase">
              property appreciation
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
        render: (record, text, index) => (
          <>{Math.round(record.avgGrowth * 100) / 100}%</>
        ),
        key: "avgGrowth",
        width: "14%",
        sorter: (a, b) => a.avgGrowth - b.avgGrowth,
        sortDirections: ["ascend", "descend"],
        sortOrder: sortedInfo.columnKey === "avgGrowth" && sortedInfo.order,
        showSorterTooltip: false,
        ellipsis: true,
      },
      {
        title: "2018",
        render: (record, text, index) => (
          <>{Math.round(record.y2018 * 100) / 100}%</>
        ),
        key: "y2018",
        // filters: [
        //   { text: 'London', value: 'London' },
        //   { text: 'New York', value: 'New York' },
        // ],
        // filteredValue: filteredInfo.2018 || null,
        // onFilter: (value, record) => record.address.includes(value),
        sorter: (a, b) => a.y2018 - b.y2018,
        sortDirections: ["ascend", "descend"],
        sortOrder: sortedInfo.columnKey === "y2018" && sortedInfo.order,
        showSorterTooltip: false,
        ellipsis: true,
        width: "10%",
      },
      {
        title: "2019",
        render: (record, text, index) => (
          <>{Math.round(record.y2019 * 100) / 100}%</>
        ),
        key: "y2019",
        width: "10%",
        sorter: (a, b) => a.y2019 - b.y2019,
        sortDirections: ["ascend", "descend"],
        sortOrder: sortedInfo.columnKey === "y2019" && sortedInfo.order,
        showSorterTooltip: false,
        ellipsis: true,
      },
      {
        title: "2020",
        render: (record, text, index) => (
          <>{Math.round(record.y2020 * 100) / 100}%</>
        ),
        key: "y2020",
        width: "10%",
        // filters: [
        //   { text: 'London', value: 'London' },
        //   { text: 'New York', value: 'New York' },
        // ],
        // filteredValue: filteredInfo.address || null,
        // onFilter: (value, record) => record.address.includes(value),
        sorter: (a, b) => a.y2020 - b.y2020,
        sortDirections: ["ascend", "descend"],
        sortOrder: sortedInfo.columnKey === "y2020" && sortedInfo.order,
        showSorterTooltip: false,
        ellipsis: true,
      },
      {
        title: "2021",
        render: (record, text, index) => (
          <>{Math.round(record.y2021 * 100) / 100}%</>
        ),
        key: "y2021",
        width: "10%",
        // filters: [
        //   { text: 'London', value: 'London' },
        //   { text: 'New York', value: 'New York' },
        // ],
        // filteredValue: filteredInfo.address || null,
        // onFilter: (value, record) => record.address.includes(value),
        sorter: (a, b) => a.y2021 - b.y2021,
        sortDirections: ["ascend", "descend"],
        sortOrder: sortedInfo.columnKey === "y2021" && sortedInfo.order,
        showSorterTooltip: false,
        ellipsis: true,
      },
      {
        title: "2022",
        render: (record, text, index) => (
          <>{Math.round(record.y2022 * 100) / 100}%</>
        ),
        key: "y2022",
        width: "10%",
        // filters: [
        //   { text: 'London', value: 'London' },
        //   { text: 'New York', value: 'New York' },
        // ],
        // filteredValue: filteredInfo.address || null,
        // onFilter: (value, record) => record.address.includes(value),
        sorter: (a, b) => a.y2022 - b.y2022,
        sortDirections: ["ascend", "descend"],
        sortOrder: sortedInfo.columnKey === "y2022" && sortedInfo.order,
        showSorterTooltip: false,
        ellipsis: true,
      },
      {
        title: () => {
          return (
            <div className="text-uppercase">
              Median Sale Price{" "}
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
        width: "11%",
        render: (record) => {
          return <>${convertToCurrency(Math.round(record).toString())}</>;
        },
        // filters: [
        //   { text: 'London', value: 'London' },
        //   { text: 'New York', value: 'New York' },
        // ],
        // filteredValue: filteredInfo.address || null,
        // onFilter: (value, record) => record.address.includes(value),
        sorter: (a, b) => a.median - b.median,
        sortDirections: ["ascend", "descend"],
        sortOrder: sortedInfo.columnKey === "median" && sortedInfo.order,
        showSorterTooltip: false,
        ellipsis: true,
      },
      {
        title: () => {
          return (
            <div className="text-uppercase">
              property tax{" "}
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
        width: "13%",
        render: (record, _text, _index) => (
          <>
            {Math.round(
              (record.avgTax ?? this.state.current_property_tax) * 100
            ) / 100}
            %
          </>
        ),
        // filters: [
        //   { text: 'London', value: 'London' },
        //   { text: 'New York', value: 'New York' },
        // ],
        // filteredValue: filteredInfo.address || null,
        // onFilter: (value, record) => record.address.includes(value),
        sorter: (a, b) => a.avgTax - b.avgTax,
        sortDirections: ["ascend", "descend"],
        sortOrder: sortedInfo.columnKey === "avgTax" && sortedInfo.order,
        showSorterTooltip: false,
        ellipsis: true,
      },
      {
        title: () => {
          return (
            <div className="text-uppercase">
              Estimated Population{" "}
              {/* <Tooltip
                placement="top"
                color="#E8F2FF"
                title="Estimated Population"
              >
                <Button className="info_class">
                  {" "}
                  <Info />
                </Button>
              </Tooltip> */}
            </div>
          );
        },
        dataIndex: "population",
        key: "population",
        width: "13%",
        // filters: [
        //   { text: 'London', value: 'London' },
        //   { text: 'New York', value: 'New York' },
        // ],
        // filteredValue: filteredInfo.address || null,
        // onFilter: (value, record) => record.address.includes(value),
        // comma: () => population?.toLocaleString(),
        render: (record) => record?.toLocaleString(record.population),
        showSorterTooltip: false,
        sorter: (a, b) => a.population - b.population,
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
            {/* <div className='container'> */}
            <div className="container mx-auto mt-3 px-md-5">
              <p className="fs-40 Gothic_3D fot-mon">Search Result</p>
              <div className="my-3 d-flex">
                <div className="my-auto ms-auto">
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
                        pageSize: 200,
                        defaultCurrent: this.state.currentPage,
                        total: this.state.totalPages * 200,
                      }}
                      dataSource={this.state.dataRegion}
                      onChange={this.handleChange}
                      scroll={{ x: 576 }}
                    />
                  ) : (
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
                      dataSource={this.state.data}
                      onChange={this.handleChange}
                      scroll={{ x: 576 }}
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
          {/* </div>    */}
        </div>
      </>
    );
  }
}
export default withRouter(withAuth(FilterPopulation));
