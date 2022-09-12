import { useState } from "react";

import photographyData from "../data/data.json";

const BrowseCoverImages = () => {

  const [coverImageIndex, setCoverImageIndex] = useState(4);

  const prevImage = () => {
    if (coverImageIndex - 1 > 0) {
      setCoverImageIndex(coverImageIndex - 1);
    } else {
      setCoverImageIndex(photographyData.images.length - 1);
      // console.log("beginning of list. image index at 0");
    }
  };

  const nextImage = () => {
    if (coverImageIndex + 1 < photographyData.images.length) {
      setCoverImageIndex(coverImageIndex + 1);
    } else {
      setCoverImageIndex(0);
      // console.log("end of list. image index at " + coverImage);
    }
  };

  function autoScroll() {
    setInterval(() => {
      nextImage();
      // console.log("image index: " + coverImage);
    }, 5000);
  }

  return { coverImageIndex, prevImage, nextImage, autoScroll };
};

export default BrowseCoverImages

//old variant for swapping the hero image from data.json list by index
// const BrowseCoverImages = () => {

//   const [coverImageIndex, setCoverImageIndex] = useState(4);

//   const prevImage = () => {
//     if (coverImageIndex - 1 > 0) {
//       setCoverImageIndex(coverImageIndex - 1);
//     } else {
//       setCoverImageIndex(photographyData.images.length - 1);
//       // console.log("beginning of list. image index at 0");
//     }
//   };

//   const nextImage = () => {
//     if (coverImageIndex + 1 < photographyData.images.length) {
//       setCoverImageIndex(coverImageIndex + 1);
//     } else {
//       setCoverImageIndex(0);
//       // console.log("end of list. image index at " + coverImage);
//     }
//   };

//   function autoScroll() {
//     setInterval(() => {
//       nextImage();
//       // console.log("image index: " + coverImage);
//     }, 5000);
//   }

//   return { coverImageIndex, prevImage, nextImage, autoScroll };
// };
