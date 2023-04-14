import React, { useState, useEffect } from "react";

function ActorPhoto(props) {
  const [photoUrl, setPhotoUrl] = useState("");

  useEffect(() => {
    async function fetchActors() {
      console.log("loading");
      const response = await fetch(`/get_actor_photo?name=${props.list}`);
      const data = await response.json();
      console.log(data);
      setPhotoUrl(data);
    }

    fetchActors();
  }, []);

  return (
    <ul className="row" id="cast">
      {photoUrl &&
        photoUrl.map((item, id) => {
          return (
            <li className="col card p-0 mx-2 text-center" key={id}>
              <img
                src={item.photo_url}
                class="card-img-top"
                style={{ height: "100px" }}
                alt="..."
              />
              <div class="card-body pb-0">
                <h5 class="card-title">{item.actor_name}</h5>
              </div>
            </li>
          );
        })}
    </ul>
  );
}
export default ActorPhoto;
