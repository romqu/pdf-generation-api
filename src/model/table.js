class Table {
  constructor({ margin, widths, body, layout = {} }) {
    return {
      margin: margin,
      table: {
        widths: widths,
        body: [body]
      },
      layout: layout
    };
  }
}

module.exports = Table;
