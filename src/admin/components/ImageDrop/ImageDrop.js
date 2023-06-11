import { useState } from "react";
import styles from "./imageDrop.module.css";

function DragAndDrop({ imageStartUrl, imageID, update }) {
  const [imageUrl, setImageUrl] = useState(imageStartUrl);
  const [isBig, setBig] = useState(false);

  function handleDragOver(event) {
    event.preventDefault();
    setBig(true);
  }

  function handleDragLeave(event) {
    setBig(false);
  }

  function handleDrop(event) {
    //console.log(update);

    event.preventDefault();
    const file = event.dataTransfer.files[0];
    const fileUrl = URL.createObjectURL(file);
    setImageUrl(fileUrl);
    setBig(false);

    update(imageID, { image: file });
  }

  return (
    <>
      <div
        className={`${styles.dropZone} ${isBig ? styles.big : ""}`}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onDragLeave={handleDragLeave}
      >
        {<img src={imageUrl}></img>}
      </div>
    </>
  );
}

export default DragAndDrop;
