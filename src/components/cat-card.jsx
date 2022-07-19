import React, { useState, useEffect, useRef } from "react";

const imgStyle = {
  width: 600,
  cursor: "pointer",
};
const loadingImageSrc = "/loading-text.png";

const getMeACat = () =>
  fetch("https://aws.random.cat/meow")
    .then((response) => response.json())
    .then((data) => data.file)
    .catch(console.error);

export default function CatCard() {
  let [count, setCount] = useState(0);
  let [loading, setLoading] = useState(true);
  let [catImageSrc, setCatImageSrc] = useState(loadingImageSrc);

  useEffect(() => {
    setLoading(true);
    setCatImageSrc(loadingImageSrc);
    getMeACat().then(setCatImageSrc);
  }, [count]);

  const handleClick = () => !loading && setCount(count + 1);
  const onImgLoad = (e) =>
    !e.target.src.endsWith(loadingImageSrc) && setLoading(false);

  return (
    <td>
      <img
        style={imgStyle}
        onClick={handleClick}
        onLoad={onImgLoad}
        src={catImageSrc}
      />
      <p>
        Clicked this {count} time{count === 1 ? "" : "s"}
      </p>
    </td>
  );
}
