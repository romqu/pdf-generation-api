class Line {
  constructor({ type = "line", x1, y1, x2, y2, lineWidth, margin }) {
    return {
      margin,
      canvas: [
        {
          type: type,
          x1: x1,
          y1: y1,
          x2: x2,
          y2: y2,
          lineWidth: lineWidth
        }
      ]
    };
  }
}

module.exports = Line;
