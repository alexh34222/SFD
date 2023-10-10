import React, { useState, useEffect } from "react";
import "./assets/css/currentcalls.css";
import axios from "axios";
import { Loader } from "@googlemaps/js-api-loader";

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
  useEffect(() => {
    // const callIcons = {
    //   "Aid Response": 'https://img.icons8.com/ios-filled/50/doctors-bag.png',
    //   "Car Fire": 'https://img.icons8.com/ios-filled/50/car-fire.png',
    //   "Medic Response":
    //     'https://img.icons8.com/ios-filled/50/ambulance--v1.png',
    //   "Alarm Bell": 'https://img.icons8.com/ios-glyphs/30/alarm.png',
    // };

    const loader = new Loader({
      apiKey: "AIzaSyD4fnStc7yOcWyT8HmF9wQ2NBFsjSRoB1I",
      version: "weekly",
    });

    loader
      .load()
      .then(() => {
        const styles = {
          default: [],
          hide: [
            {
              featureType: "poi.business",
              elementType: "labels.icon",
              stylers: [{ visibility: "off" }],
            },
          ],
        };
        if (typeof window.google !== "undefined") {
          const map = new window.google.maps.Map(
            document.getElementById("map"),
            {
              center: { lat: 47.6062, lng: -122.3321 },
              zoom: 12,
              mapTypeControl: false,
              mapTypeId: "roadmap",
              styles: styles,
            }
          );

          data.slice(0, 20).forEach((call) => {
            // const iconUrl = callIcons[call.type] || null;
            const marker = new window.google.maps.Marker({
              position: {
                lat: parseFloat(call.latitude),
                lng: parseFloat(call.longitude),
              },
              map,
              title: call.type,
              // icon: {
              //   url: iconUrl,
              //   scaledSize: new window.google.maps.Size(30, 30),
              // },
            });

            marker.addListener("click", () => {
              const infowindow = new window.google.maps.InfoWindow({
                content: `
                <h3><strong>${call.type}</strong></h3>
                <p>${formatDatetime(call.datetime)}</p>
                <a href="http://www.google.com/maps?q=${
                  call ? call.address : ""
                }" class="callText" target="_blank" rel="noreferrer">
                  ${call ? call.address : ""}
                </a>
              `,
              });
              infowindow.open(map, marker);
            });
          });
        } else {
          console.error("Google Maps API not loaded.");
        }
      })
      .catch((error) => {
        console.error("Error loading Google Maps API:", error);
      });
  }, [data]);

  return (
    <div className="main">
      <h3 className="secondaryTitle">Calls:</h3>

      <div id="map" height="400px" width="100%"></div>

      {data.length === 0 ? (
        <p>Loading...</p>
      ) : (
        <div className="callList">
          {data.slice(0, 20).map((call, index) => (
            <div key={index} className="callBox">
              <p className={'callText callType'}>{call ? call.type : ""}</p>

              <a
                href={`http://www.google.com/maps?q=${
                  call ? call.address : ""
                }`}
                className={'callText callAddress'}
                target="_blank"
                rel="noreferrer"
              >
                {call ? call.address : ""}
              </a>
              <p className={'callText callTime'}>
                {call ? formatDatetime(call.datetime) : ""}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CurrentCalls;
