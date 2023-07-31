import React, { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import axios from "axios";
import Loading from "./Spinner/Loading";
//import { PuffLoader } from "react-spinners";

const Table = () => {
  const columnDefs = [
    {
      headerName: "Symbol",
      field: "symbol",
      filter: true,
      floatingFilter: true,
    },
    { headerName: "Price Change", field: "priceChange" },
    { headerName: "Price Change Percent", field: "priceChangePercent" },
    { headerName: "Average Price", field: "averagePrice" },
    { headerName: "Previous Close Price", field: "prevClosePrice" },
    { headerName: "Open Time", field: "openTime"},
    { headerName: "Close Time", field: "closeTime"},
  ];

  const manageTable = { sortable: true, flex: 1 };

  const [result, setResult] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getResults();
  }, []); 

  const getResults = async () => {
    try {
      const response = await axios.get(
        "https://data.binance.com/api/v3/ticker/24hr"
      );
      console.log(response.data);
      const results = response.data.map((result) => {
        return {
          symbol: result.symbol,
          priceChange: result.priceChange,
          priceChangePercent: result.priceChangePercent,
          averagePrice: result.weightedAvgPrice,
          prevClosePrice: result.prevClosePrice,
          openTime: new Date(result.openTime).toLocaleDateString("en-GB"),
          closeTime: new Date(result.closeTime).toLocaleDateString("en-GB"),
        };
      });
      setResult(results);
      setIsLoading(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="ag-theme-alpine-dark"
      style={{ height: "100vh", width: "100%" }}
    >
      {isLoading ? (
        <AgGridReact
          pagination={true}
          paginationAutoPageSize={true}
          rowData={result}
          columnDefs={columnDefs}
          defaultColDef={manageTable}
        ></AgGridReact>
      ) : <Loading />}
      
    </div>
  );
};

export default Table;
