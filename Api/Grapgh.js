import { axiosInstance } from "../pages/_app";

class GraphData {
  constructor() {
    this.result = [];
  }
  Inventory = (id, year) => {
    const res = async () => {
      const resp = await axiosInstance
        .post("/market/inventry", {
          regionID: id,
          year: year,
        })

        .catch(function(error) {
          console.error(error);
        });
      return resp;
    };
    return res();
  };
  Pending = (id, year) => {
    const res = async () => {
      const resp = await axiosInstance
        .post("/market/median_days_to_pending", {
          regionID: id,
          year: year,
        })

        .catch(function(error) {});
      return resp;
    };
    return res();
  };
  ListPrice = (id, year) => {
    const res = async () => {
      const resp = await axiosInstance
        .post("/market/median_list_vs_sale_price", {
          regionID: id,
          year: year,
        })

        .catch(function(error) {
          console.error(error);
        });
      return resp;
    };
    return res();
  };
  RentalAprecation = (id) => {
    const res = async () => {
      const resp = await axiosInstance
        .post("/market/rental_appreciation", {
          regionID: id,
        })

        .catch(function(error) {
          console.error(error);
        });
      return resp;
    };
    return res();
  };
  ShareListing = (id, year) => {
    const res = async () => {
      const resp = await axiosInstance
        .post("/market/share_price_cut", {
          regionID: id,
          year: year,
        })

        .catch(function(error) {
          console.error(error);
        });
      return resp;
    };
    return res();
  };
  PriceCut = (id, yaer) => {
    const res = async () => {
      const resp = await axiosInstance
        .post("/market/median_price_cut", {
          regionID: id,
          year: yaer,
        })
        .catch(function(error) {
          console.error(error);
        });
      return resp;
    };
    return res();
  };
  MedianRental = (id, year) => {
    const res = async () => {
      const resp = await axiosInstance
        .post("/market/median_rental", {
          regionID: id,
          year: year,
        })
        .catch(function(error) {
          console.error(error);
        });
      return resp;
    };
    return res();
  };

  unEmployment = (region) => {
    const res = async () => {
      const resp = await axiosInstance
        .post("/economic/unemployment_rate", {
          Region: region,
        })

        .catch(function(error) {
          console.error(error);
        });
      return resp;
    };
    return res();
  };

  populationRegion = (id, year) => {
    const res = async () => {
      const resp = await axiosInstance
        .get("/demographic/regions")

        .catch(function(error) {
          console.error(error);
        });
      return resp;
    };
    return res();
  };
  marketRegion = (id, year) => {
    const res = async () => {
      const resp = await axiosInstance
        .get("/market/region_names")

        .catch(function(error) {
          console.error(error);
        });
      return resp;
    };
    return res();
  };
  population = (region) => {
    const res = async () => {
      const resp = await axiosInstance
        .post("/demographic/population", {
          Region: region,
        })

        .catch(function(error) {
          console.error(error);
        });
      return resp;
    };
    return res();
  };
  populationEconomic = (region) => {
    const res = async () => {
      const resp = await axiosInstance
        .get("/economic/regions")

        .catch(function(error) {
          console.error(error);
        });
      return resp;
    };
    return res();
  };
  industary = (region) => {
    const res = async () => {
      const resp = await axiosInstance
        .post("/economic/industry", {
          Region: region,
        })

        .catch(function(error) {
          console.error(error);
        });
      return resp;
    };
    return res();
  };
  education = (region) => {
    const res = async () => {
      const resp = await axiosInstance
        .post("/demographic/educational_attainment", {
          Region: region,
        })

        .catch(function(error) {
          console.error(error);
        });
      return resp;
    };
    return res();
  };
  populationAge = (region) => {
    const res = async () => {
      const resp = await axiosInstance
        .post("/demographic/population_by_age", {
          Region: region,
        })

        .catch(function(error) {
          console.error(error);
        });
      return resp;
    };
    return res();
  };
  Renter = (region) => {
    const res = async () => {
      const resp = await axiosInstance
        .post("/demographic/renterVsOwner", {
          Region: region,
        })

        .catch(function(error) {
          console.error(error);
        });
      return resp;
    };
    return res();
  };
  incomeHouse = (region) => {
    const res = async () => {
      const resp = await axiosInstance
        .post("/demographic/income_by_household_type", {
          Region: region,
        })

        .catch(function(error) {
          console.error(error);
        });
      return resp;
    };
    return res();
  };
  HouseType = (region) => {
    const res = async () => {
      const resp = await axiosInstance
        .post("/demographic/household_by_type", {
          Region: region,
        })

        .catch(function(error) {
          console.error(error);
        });
      return resp;
    };
    return res();
  };
  populationRace = (region) => {
    const res = async () => {
      const resp = await axiosInstance
        .post("/demographic/population_by_race", {
          Region: region,
        })

        .catch(function(error) {
          console.error(error);
        });
      return resp;
    };
    return res();
  };

  Return() {
    return this.result;
  }
}
export default new GraphData();
