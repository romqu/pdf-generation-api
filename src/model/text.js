class Text {
  constructor({ margin, text, fontSize, isBold = false }) {
    return {
      margin,
      text: text,
      fontSize: fontSize,
      bold: isBold
    };
  }
}

module.exports = Text;
