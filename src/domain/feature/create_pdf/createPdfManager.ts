import PdfPrinter = require("pdfmake");

import { provide } from "../../../ioc/ioc";
import { call } from "../../../util/failableUtil";
import { DefectList } from "../../model/document/defectList";
import { Doc } from "../../model/pdfmake/doc";
import { Response } from "../../model/response";
import { CreateDoc } from "./createDoc";
import { createFooter } from "./createFooter";
import { createHeader } from "./createHeader";
import { CreatePdfFileTask } from "./createPdfFileTask";

const fonts = {
  Roboto: {
    normal: "./assets/fonts/Roboto-Regular.ttf",
    bold: "./assets/fonts/Roboto-Medium.ttf",
    italics: "./assets/fonts/Roboto-Italic.ttf",
    bolditalics: "./assets/fonts/Roboto-MediumItalic.ttf"
  }
};

const lorem =
  "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.";

@provide(CreatePdfManager)
  .inSingletonScope()
  .done()
export class CreatePdfManager {
  private readonly createPdfFileTask: CreatePdfFileTask;

  constructor(createPdfFileTask: CreatePdfFileTask) {
    this.createPdfFileTask = createPdfFileTask;
  }

  public execute(defectList: DefectList, folderPath: string): Response<string> {
    return call(({ success, run }) => {
      const createDoc: CreateDoc = new CreateDoc({
        imageBasePath: "./assets/images/"
      });

      const pdfPrinter = new PdfPrinter(fonts);

      const doc = new Doc({
        docHeader: createHeader,
        docBody: createDoc.execute(defectList),
        docFooter: createFooter
      });

      const pdfDoc = pdfPrinter.createPdfKitDocument(doc.docDefinition());

      run(this.createPdfFileTask.execute(folderPath, "test.pdf", pdfDoc));

      return success(folderPath);
    });
  }
}
