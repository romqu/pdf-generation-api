"use strict";

var fonts = {
  Roboto: {
    normal:
      "/home/roman/git-projects/immo-pdf-generation/rest-api/assets/fonts/Roboto-Regular.ttf",
    bold:
      "/home/roman/git-projects/immo-pdf-generation/rest-api/assets/fonts/Roboto-Medium.ttf",
    italics:
      "/home/roman/git-projects/immo-pdf-generation/rest-api/assets/fonts/Roboto-Italic.ttf",
    bolditalics:
      "/home/roman/git-projects/immo-pdf-generation/rest-api/assets/fonts/Roboto-MediumItalic.ttf"
  }
};

const lorem =
  "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.";

var PdfPrinter = require("pdfmake");
var printer = new PdfPrinter(fonts);
var fs = require("fs");

var docDefinition2 = {
  pageSize: "A4",
  pageMargins: [40, 60, 40, 40],
  info: {
    title: "title",
    author: "author",
    creationDate: "1"
  },
  header: [
    {
      columns: [
        {
          text: "Left\nLeft\nLeft",
          alignment: "left",
          fontSize: 10,
          // margin: [left, top, right, bottom]
          margin: [40, 20, 0, 0]
        },
        {
          text: "Right\nRight\nRight",
          alignment: "right",
          fontSize: 10,
          margin: [0, 20, 40, 0]
        }
      ]
    }
  ],

  content: [
    {
      margin: [0, 5, 0, 0],
      canvas: [
        {
          type: "line",
          x1: 0,
          y1: 0,
          x2: 595 - 2 * 40,
          y2: 0,
          lineWidth: 0.5
        }
      ]
    },
    {
      margin: [0, 20, 0, 0],
      table: {
        widths: "*",

        body: [
          [
            {
              table: {
                widths: ["60%", "40%"],
                body: [
                  [
                    {
                      image:
                        "/home/roman/git-projects/immo-pdf-generation/rest-api/assets/images/sampleImage.jpg",
                      fit: [250, 200]
                    },
                    [
                      {
                        table: {
                          widths: ["50%", "50%"],
                          body: [
                            [
                              { text: "Text", fontSize: 10 },
                              {
                                text:
                                  "Text Text Text Text Text Text Text Text Text",
                                fontSize: 10
                              }
                            ]
                          ]
                        }
                      },
                      {
                        table: {
                          widths: ["50%", "50%"],
                          body: [
                            [
                              { text: "Text", fontSize: 10 },
                              {
                                text:
                                  "Text Text Text Text Text Text Text Text Text",
                                fontSize: 10
                              }
                            ]
                          ]
                        }
                      },
                      {
                        table: {
                          widths: ["50%", "50%"],
                          body: [
                            [
                              { text: "Text", fontSize: 10 },
                              {
                                text:
                                  "Text Text Text Text Text Text Text Text Text",
                                fontSize: 10
                              }
                            ]
                          ]
                        }
                      }
                    ]
                  ]
                ]
              },
              layout: {
                hLineWidth: function(i, node) {
                  return 1;
                },
                vLineWidth: function(i, node) {
                  return 1;
                },
                hLineColor: function(i, node) {
                  return "black";
                },
                vLineColor: function(i, node) {
                  return "black";
                },
                paddingLeft: function(i, node) {
                  return 0;
                },
                paddingRight: function(i, node) {
                  return 0;
                },
                paddingTop: function(i, node) {
                  return 0;
                },
                paddingBottom: function(i, node) {
                  return 0;
                }
              }
            }
          ],
          [
            {
              table: {
                widths: ["50%", "50%"],
                body: [
                  [
                    {
                      image:
                        "/home/roman/git-projects/immo-pdf-generation/rest-api/assets/images/sampleImage.jpg",
                      fit: [250, 200]
                    },
                    {
                      image:
                        "/home/roman/git-projects/immo-pdf-generation/rest-api/assets/images/sampleImage.jpg",
                      fit: [250, 200],
                      alignment: "right"
                    }
                  ]
                ]
              },
              layout: {
                hLineWidth: function(i, node) {
                  return 0.5;
                },
                vLineWidth: function(i, node) {
                  return 1;
                },
                hLineColor: function(i, node) {
                  return "black";
                },
                vLineColor: function(i, node) {
                  return "black";
                },
                paddingLeft: function(i, node) {
                  return 0;
                },
                paddingRight: function(i, node) {
                  return 0;
                },
                paddingTop: function(i, node) {
                  return 0;
                },
                paddingBottom: function(i, node) {
                  return 0;
                }
              }
            }
          ]
        ]
      },

      layout: {
        hLineWidth: function(i, node) {
          return 0;
        },
        vLineWidth: function(i, node) {
          return 0;
        },
        hLineColor: function(i, node) {
          return "black";
        },
        vLineColor: function(i, node) {
          return "black";
        },
        paddingLeft: function(i, node) {
          return 0;
        },
        paddingRight: function(i, node) {
          return 0;
        },
        paddingTop: function(i, node) {
          return 0;
        },
        paddingBottom: function(i, node) {
          return 0;
        }
      }
    }
  ],

  footer: function(currentPage, pageCount) {
    return {
      alignment: "center",
      text: currentPage.toString() + " von " + pageCount,
      fontSize: 9,
      margin: [0, 20, 0, 0]
    };
  }
};

var docDefinition3 = {
  pageSize: "LETTER",
  pageMargins: [25, 25, 25, 35],

  defaultStyle: {
    fontSize: 12,
    columnGap: 20
  },

  // Page Layout

  content: {
    // This table will contain ALL content
    table: {
      // Defining the top 2 rows as the "sticky" header rows
      headerRows: 2,
      // One column, full width
      widths: ["*"],
      body: [
        // Header Row One
        // An array with just one "cell"
        [
          // Just because I only have one cell, doesn't mean I can't have
          // multiple columns!
          {
            columns: [
              {
                width: "*",
                text: "Delivery Company, Inc.",
                fontSize: 12,
                bold: true
              },
              {
                width: "*",
                text: [
                  { text: "Delivery Slip\n", fontSize: 12 },
                  { text: "Date ", bold: true },
                  "2/16/2015   ",
                  { text: "Arrived ", bold: true },
                  "11:05 AM   ",
                  { text: "Left ", bold: true },
                  "11:21 AM"
                ],
                fontSize: 10,
                alignment: "right"
              }
            ]
          }
        ],

        // Second Header Row

        [
          {
            columns: [
              {
                width: "auto",
                margin: [0, 0, 10, 0],
                text: [
                  {
                    text: "CUSTOMER\n",
                    fontSize: 8,
                    bold: true,
                    color: "#bbbbbb"
                  },
                  { text: "John Doe", fontSize: 12 }
                ]
              },
              {
                width: "auto",
                margin: [0, 0, 10, 0],
                text: [
                  {
                    text: "INVOICE #\n",
                    fontSize: 8,
                    bold: true,
                    color: "#bbbbbb"
                  },
                  { text: "123456", fontSize: 12 }
                ]
              }
            ]
          }
        ],

        // Now you can break your content out into the remaining rows.
        // Or you could have one row with one cell that contains
        // all of your content

        // Content Row(s)

        [
          {
            fontSize: 10,
            stack: [
              // Content

              { text: "this is content", pageBreak: "after" },
              { text: "this is more content", pageBreak: "after" },
              { text: "this is third page content" }
            ]
          }
        ],

        [
          {
            fontSize: 10,
            stack: [
              // Content

              { text: "this is content", pageBreak: "after" },
              { text: "this is more content", pageBreak: "after" },
              { text: "this is third page content" }
            ]
          }
        ]
      ]
    },

    // Table Styles

    layout: {
      hLineWidth: function(i, node) {
        return i === 1 || i === 2 ? 1 : 0;
      },
      vLineWidth: function(i, node) {
        return 0;
      },
      hLineColor: function(i, node) {
        return i === 1 || i === 2 ? "#eeeeee" : "white";
      },
      vLineColor: function(i, node) {
        return "white";
      },
      paddingBottom: function(i, node) {
        switch (i) {
          case 0:
            return 5;
          case 1:
            return 2;
          default:
            return 0;
        }
      },
      paddingTop: function(i, node) {
        switch (i) {
          case 0:
            return 0;
          case 1:
            return 2;
          default:
            return 10;
        }
      }
    }
  },

  // Page Footer

  footer: function(currentPage, pageCount) {
    return {
      alignment: "center",
      text: currentPage.toString() + " von " + pageCount,
      fontSize: 8
    };
  }
};

var pdfDoc = printer.createPdfKitDocument(docDefinition2);

pdfDoc.pipe(
  fs.createWriteStream(
    "/home/roman/git-projects/immo-pdf-generation/rest-api/pdfs/basics.pdf"
  )
);

pdfDoc.end();
