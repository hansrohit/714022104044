import React from "react";
import { useState, useRef } from "react";
import { shortenUrl } from "../services/api";
const Home = () => {
  const [] = useState("");
  const ogUrlRef = useRef();
  const shortRef = useRef();
  const dateRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(ogUrlRef.current.value);
    console.log(shortRef.current.value);
    console.log(dateRef.current.value);
    console.log("submitted");
    const response = await shortenUrl({
      originalUrl: ogUrlRef.current.value,
      keyword: shortRef.current.value,
      expiryTime: dateRef.current.value,
    });
    console.log(response);
  };
  return (
    <>
      <div className="container">
        <div className="box1">
          <div className="boxTitle">
            <h2>Create Short-Url</h2>
          </div>
          <div className="boxContent">
            <form method="post" className="form" onSubmit={handleSubmit}>
              <div className="label1">
                <label htmlFor="ogUrl">
                  <h2>Original Url:</h2>
                </label>
                <input
                  ref={ogUrlRef}
                  type="text"
                  name="ogUrl"
                  id="ogUrl"
                  className="input"
                />
              </div>
              <div className="label2">
                <label htmlFor="keyword">
                  <h2>Keyword:</h2>
                </label>
                <input
                  ref={shortRef}
                  type="text"
                  name="keyword"
                  id="keyword"
                  className="input"
                />
              </div>
              <div className="label1">
                <label htmlFor="expiry">
                  <h2>Expiry Date:</h2>
                </label>
                <input
                  ref={dateRef}
                  type="date"
                  name="date"
                  id="date"
                  className="input"
                />
              </div>
              <button className="boxBtn">submit</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
