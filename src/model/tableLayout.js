class TableLayout {
  constructor({
    hLineWidth,
    vLineWidth,
    hLineColor,
    vLineColor,
    paddingLeft,
    paddingRight,
    paddingTop,
    paddingBottom
  }) {
    return {
      hLineWidth: hLineWidth,
      vLineWidth: vLineWidth,
      hLineColor: hLineColor,
      vLineColor: vLineColor,
      paddingLeft: paddingLeft,
      paddingRight: paddingRight,
      paddingTop: paddingTop,
      paddingBottom: paddingBottom
    };
  }
}

module.exports = TableLayout;
