import React, { useState, useEffect } from "react";
import "./assets/css/currentcalls.css";
import axios from "axios";

function CurrentCalls() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        "https://data.seattle.gov/resource/grwu-wqtk.json"
      );
      setData(result.data);
    };
    fetchData();
  }, []);

  // Check if data[0] exists before rendering
  const call1 = data.length > 0 ? data[0] : null;
  const call2 = data.length > 1 ? data[1] : null;
  const call3 = data.length > 2 ? data[2] : null;
  const call4 = data.length > 3 ? data[3] : null;
  const call5 = data.length > 4 ? data[4] : null;
  const call6 = data.length > 5 ? data[5] : null;
  const call7 = data.length > 6 ? data[6] : null;
  const call8 = data.length > 7 ? data[7] : null;
  const call9 = data.length > 8 ? data[8] : null;
  const call10 = data.length > 9 ? data[9] : null;

  return (
    <div>
      <h3 className="secondaryTitle">Current Calls:</h3>
      <div>
        <div className="callBox">
          <h4 className="callTitle">CALL 1:</h4>
          <p className="callText">{call1 ? call1.address : ""}</p>
          <p className="callText">{call1 ? call1.type : ""}</p>
        </div>

        <div className="callBox">
          <h4 className="callTitle">CALL 2:</h4>
          <p className="callText">{call2 ? call2.address : ""}</p>
          <p className="callText">{call2 ? call2.type : ""}</p>
        </div>

        <div className="callBox">
          <h4 className="callTitle">CALL 3:</h4>
          <p className="callText">{call3 ? call3.address : ""}</p>
          <p className="callText">{call3 ? call3.type : ""}</p>
        </div>

        <div className="callBox">
          <h4 className="callTitle">CALL 4:</h4>
          <p className="callText">{call4 ? call4.address : ""}</p>
          <p className="callText">{call4 ? call4.type : ""}</p>
        </div>

        <div className="callBox">
          <h4 className="callTitle">CALL 5:</h4>
          <p className="callText">{call5 ? call5.address : ""}</p>
          <p className="callText">{call5 ? call5.type : ""}</p>
        </div>
      </div>
    </div>
  );
}

export default CurrentCalls;
