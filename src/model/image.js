class Image {
  constructor({ margin, imageUrl, fit }) {
    return {
      margin,
      image: imageUrl,
      fit: fit
    };
  }
}

module.exports = Image;
