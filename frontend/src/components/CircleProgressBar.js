import React, { useState, useEffect } from "react";

function CircleProgressBar(props) {
  const [progress, setProgress] = useState(props.percent);
  const [value, setValue] = useState(0);

  useEffect(() => {
    setProgress(props.percent);
    let t = props.percent.indexOf(".");
    if (t !== -1) {
      setValue(props.percent);
      setProgress(props.percent.slice(0, t) + props.percent.slice(t + 1));
    }
  }, []);

  let strokeColor = "#4CAF50"; // Default green color for percentage greater than 85
  if (progress < 50) {
    strokeColor = "#FF0000"; // Red color for percentage less than 50
  } else if (progress < 85) {
    strokeColor = "#FFC107"; // Yellow color for percentage less than 85
  }

  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <svg className="progress-bar" width="100" height="100">
      <circle className="progress-bar__background" r={radius} cx="50" cy="50" />
      <circle
        className="progress-bar__foreground"
        r={radius}
        cx="50"
        cy="50"
        style={{
          stroke: strokeColor,
          strokeDasharray: `${circumference} ${circumference}`,
          strokeDashoffset: offset,
        }}
      />
      <text className="progress-bar__text" x="50" y="50">
        {value === 0 ? `${progress}﹪` : `${value}/₁₀`}
      </text>
    </svg>
  );
}

export default CircleProgressBar;
