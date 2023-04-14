import React, { useState } from "react";

function SentimentAnalyser() {
  const [searchTerm, setSearchTerm] = useState("");
  const [fetched, setFetched] = useState(false);
  const [result, setResult] = useState([]);
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    console.log(searchTerm);
    formData.append("jsonArr", searchTerm);
    if (!fetched) {
      fetch("/analyse", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setResult(data);
          setFetched(true);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Search:
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
      <ul>
        {fetched
          ? result.map((item, index) => {
              return (
                <li key={index}>
                  {item.review}-{item.sentiment}
                </li>
              );
            })
          : "Loading"}
      </ul>
    </div>
  );
}

export default SentimentAnalyser;
