import React, { useState, useEffect } from "react";

function Review(props) {
  const [fetched, setFetched] = useState(false);
  const [result, setResult] = useState([]);
  useEffect(() => {
    handleSubmit();
  }, []);

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append("jsonArr", props.name);
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
      <ul>
        {fetched
          ? result.map((item, index) => {
              return (
                <li
                  key={index}
                  style={{
                    color: `${item.sentiment === "0" ? "red" : "green"}`,
                  }}
                >
                  {item.review}-{item.sentiment}
                </li>
              );
            })
          : "Loading"}
      </ul>
    </div>
  );
}

export default Review;
