"use client";
import DatePickerComponent from "@/components/common/DatePicker";
import DatePicker from "@/components/common/DatePicker";
import PlacePicker from "@/components/common/PlacePicker";
import TimePickerComponent from "@/components/common/TimePicker";
import TimePicker from "@/components/common/TimePicker";
import Image from "next/image";
import React, { useState, useRef } from "react";
import ModalVideo from "react-modal-video";
import Link from "next/link";
import {
  useLoadScript,
  GoogleMap,
  Marker,
  Autocomplete,
} from "@react-google-maps/api";

export default function Hero() {
  const [fromValue, setFromValue] = useState("");
  const [toValue, setToValue] = useState("");
  const [directionResponse, setDirectionResponse] = useState("");
  const [duration, setDuration] = useState("");
  const [distance, setDistance] = useState("");

  const originRef = useRef();
  const destinationRef = useRef();

  console.log(fromValue, "from");
  console.log(toValue, "toValue");

  console.log(distance, "distance");
  console.log(duration, "duration");

  const [isOpen, setIsOpen] = useState(false);
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY,
    libraries: ["places"],
  });

  if (!isLoaded) {
    return null;
  }

  const calculateRoute = async () => {
    if (originRef.current.value === "" || destinationRef.current.value === "") {
      return;
    }
    const directionService = new google.maps.DirectionsService();

    const result = await directionService.route({
      origin: originRef.current.value,
      destination: destinationRef.current.value,
      travelMode: google.maps.TravelMode.DRIVING,
    });
    setDirectionResponse(result);
    setDistance(result.routes[0].legs[0].distance.text);
    setDuration(result.routes[0].legs[0].duration.text);
  };
  return (
    <>
      <section className="section banner-home1 banner-home10">
        <div
          className="box-cover-image boxBgImage"
          style={{
            backgroundImage:
              "url(/assets/imgs/page/homepage10/dubai-aiport-transfer.png)",
          }}
        >
          <div className="box-banner-info d-flex justify-content-between align-items-center">
            <div className="banner-info-left">
              <h2 className="heading-52-medium color-white wow fadeInUp">
                Dubai Rides <br className="d-none d-lg-block" />
                Seamless Airport Transfers and City Travel
              </h2>
              <p className="text-16 color-white wow fadeInUp">
                Choose from Our Range of Luxurious and
                <br className="d-none d-lg-block" />
                Affordable Vehicles for Every Trip.
              </p>
            </div>
          </div>
        </div>
        <div className="box-search-ride box-search-ride-style-6 wow fadeInUp">
          <div className="box-search-tabs">
            <div className="head-tabs">
              <ul className="nav nav-tabs nav-tabs-search" role="tablist">
                <li>
                  <a
                    className="active"
                    href="#tab-distance"
                    data-bs-toggle="tab"
                    role="tab"
                    aria-controls="tab-distance"
                    aria-selected="true"
                  >
                    Distance
                  </a>
                </li>
                <li>
                  <a
                    href="#tab-hourly"
                    data-bs-toggle="tab"
                    role="tab"
                    aria-controls="tab-hourly"
                    aria-selected="false"
                  >
                    Hourly
                  </a>
                </li>
                <li>
                  <a
                    href="#tab-rate"
                    data-bs-toggle="tab"
                    role="tab"
                    aria-controls="tab-rate"
                    aria-selected="false"
                  >
                    Flat Rate
                  </a>
                </li>
              </ul>
            </div>
            <div className="tab-content">
              <div
                className="tab-pane fade active show"
                id="tab-distance"
                role="tabpanel"
                aria-labelledby="tab-distance"
              >
                <div className="box-form-search">
                  <div className="search-item search-date">
                    <div className="search-icon">
                      <span className="item-icon icon-date"> </span>
                    </div>
                    <div className="search-inputs">
                      <label className="text-14 color-grey">Date</label>
                      <DatePicker />
                    </div>
                  </div>
                  <div className="search-item search-time">
                    <div className="search-icon">
                      <span className="item-icon icon-time"> </span>
                    </div>
                    <div className="search-inputs">
                      <label className="text-14 color-grey">Time</label>
                      <TimePicker />
                    </div>
                  </div>
                  <div
                    className={`form-group ${fromValue ? "focused" : ""}`}
                    style={{
                      marginBottom: "0px",
                      width: "100%",
                      marginRight: "15px",
                    }}
                  >
                    <label class="form-label" for="fullname">
                      From
                    </label>
                    <Autocomplete>
                      <input
                        style={{ backgroundColor: "#fff" }}
                        placeholder=""
                        className={`form-control ${fromValue ? "filled" : ""}`}
                        ref={originRef}
                        type="text"
                      />
                    </Autocomplete>
                  </div>
                  <div
                    className={`form-group ${toValue ? "focused" : ""}`}
                    style={{
                      marginBottom: "0px",
                      width: "100%",
                      marginRight: "15px",
                    }}
                  >
                    <label class="form-label" for="fullname">
                      To
                    </label>
                    <Autocomplete>
                      <input
                        ref={destinationRef}
                        style={{ backgroundColor: "#fff" }}
                        placeholder=""
                        className={`form-control ${toValue ? "filled" : ""}`}
                        id="fullname"
                        type="text"
                        value={toValue}
                        onChange={(e) => setToValue(e.target.value)}
                      />
                    </Autocomplete>
                  </div>
                  <div className="search-item search-button mb-0">
                    {/* <Link className="d-flex" href="/booking-vehicle"> */}
                    <button
                      className="btn btn-search"
                      type="submit"
                      onClick={calculateRoute}
                    >
                      <Image
                        width={20}
                        height={20}
                        src="/assets/imgs/template/icons/search.svg"
                        alt="luxride"
                      />
                      Search
                    </button>
                    {/* </Link> */}
                  </div>
                </div>
              </div>
              <div
                className="tab-pane fade"
                id="tab-hourly"
                role="tabpanel"
                aria-labelledby="tab-hourly"
              >
                <div className="box-form-search">
                  <div className="search-item search-time">
                    <div className="search-icon">
                      <span className="item-icon icon-time"> </span>
                    </div>
                    <div className="search-inputs">
                      <label className="text-14 color-grey">Time</label>
                      <TimePickerComponent />
                    </div>
                  </div>
                  <div className="search-item search-date">
                    <div className="search-icon">
                      <span className="item-icon icon-date"> </span>
                    </div>
                    <div className="search-inputs">
                      <label className="text-14 color-grey">Date</label>
                      <DatePickerComponent />
                    </div>
                  </div>
                  <div className="search-item search-from">
                    <div className="search-icon">
                      <span className="item-icon icon-from"> </span>
                    </div>
                    <div className="search-inputs">
                      <label className="text-14 color-grey">From</label>
                      <PlacePicker />
                    </div>
                  </div>
                  <div className="search-item search-to">
                    <div className="search-icon">
                      <span className="item-icon icon-to"> </span>
                    </div>
                    <div className="search-inputs">
                      <label className="text-14 color-grey">To</label>
                      <PlacePicker />
                    </div>
                  </div>
                  <div className="search-item search-button mb-0">
                    <button className="btn btn-search" type="submit">
                      <Image
                        width={20}
                        height={20}
                        src="/assets/imgs/template/icons/search.svg"
                        alt="luxride"
                      />
                      Search
                    </button>
                  </div>
                </div>
              </div>
              <div
                className="tab-pane fade"
                id="tab-rate"
                role="tabpanel"
                aria-labelledby="tab-rate"
              >
                <div className="box-form-search">
                  <div className="search-item search-date">
                    <div className="search-icon">
                      <span className="item-icon icon-date"> </span>
                    </div>
                    <div className="search-inputs">
                      <label className="text-14 color-grey">Date</label>
                      <DatePickerComponent />
                    </div>
                  </div>
                  <div className="search-item search-time">
                    <div className="search-icon">
                      <span className="item-icon icon-time"> </span>
                    </div>
                    <div className="search-inputs">
                      <label className="text-14 color-grey">Time</label>
                      <TimePickerComponent />
                    </div>
                  </div>
                  <div className="search-item search-from">
                    <div className="search-icon">
                      <span className="item-icon icon-from"> </span>
                    </div>
                    <div className="search-inputs">
                      <label className="text-14 color-grey">From</label>
                      <PlacePicker />
                    </div>
                  </div>
                  <div className="search-item search-to">
                    <div className="search-icon">
                      <span className="item-icon icon-to"> </span>
                    </div>
                    <div className="search-inputs">
                      <label className="text-14 color-grey">To</label>
                      <PlacePicker />
                    </div>
                  </div>
                  <div className="search-item search-button mb-0">
                    <button className="btn btn-search" type="submit">
                      <Image
                        width={20}
                        height={20}
                        src="/assets/imgs/template/icons/search.svg"
                        alt="luxride"
                      />
                      Search
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <ModalVideo
        channel="youtube"
        youtube={{ mute: 0, autoplay: 0 }}
        isOpen={isOpen}
        videoId="sVPYIRF9RCQ"
        onClose={() => setIsOpen(false)}
      />
    </>
  );
}
