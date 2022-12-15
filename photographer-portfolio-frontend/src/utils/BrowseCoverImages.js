import { useState } from '../imports';

import photographyData from "../data/staticData.json";

const BrowseCoverImages = () => {

  const [coverImageIndex, setCoverImageIndex] = useState(4);

  const prevImage = () => {
    if (coverImageIndex - 1 > 0) {
      setCoverImageIndex(coverImageIndex - 1);
    } else {
      setCoverImageIndex(photographyData.images.length - 1);
    }
  };

  const nextImage = () => {
    if (coverImageIndex + 1 < photographyData.images.length) {
      setCoverImageIndex(coverImageIndex + 1);
    } else {
      setCoverImageIndex(0);
    }
  };

  function autoScroll() {
    setInterval(() => {
      nextImage();
    }, 5000);
  }

  return { coverImageIndex, prevImage, nextImage, autoScroll };
};

export default BrowseCoverImages