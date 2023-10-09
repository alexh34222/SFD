import React, { useState, useEffect } from "react";
import "./assets/css/currentcalls.css";
import axios from "axios";

function formatDatetime(datetimeString) {
  const date = new Date(datetimeString);
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  const formattedHours = hours % 12 || 12;
  //   const seconds = date.getSeconds().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const year = date.getFullYear();

  return `${formattedHours}:${minutes}:${ampm} ${month}/${day}/${year}`;
}

function CurrentCalls() {
  const [data, setData] = useState([]);
   

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        "https://data.seattle.gov/resource/grwu-wqtk.json"
      );
      setData(result.data);
      console.log(result.data);
    };
    fetchData();
  }, []);

  return (
    <div className="main">
      <h3 className="secondaryTitle">Current Calls:</h3>
      {data.length === 0 ? (
        <p>Loading...</p>
      ) : (
        <div>
          {data.slice(0, 40).map((call, index) => (
            <div key={index} className="callBox">
              <h4 className="callTitle">
                {call ? formatDatetime(call.datetime) : ""}
              </h4>
              <p className="callText">{call ? call.address : ""}</p>
              <p className="callText">{call ? call.type : ""}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CurrentCalls;
