import { defaultDocTableLayout } from "../constants";
import { Defect } from "../model/defect";
import { DocEntry } from "../model/pdfmake/docEntry";
import { DocMargin } from "../model/pdfmake/docMargin";
import { DocTable } from "../model/pdfmake/docTable";
import { DocTableBody } from "../model/pdfmake/docTableBody";
import { DocTableBodyRow } from "../model/pdfmake/docTableBodyRow";
import { DocText } from "../model/pdfmake/docText";

const description: string = "Beschreibung";
const personInCharge: string = "Verantwortlicher";
const doneTill: string = "Erledigt bis";

export function createDefectTextTable(defect: Defect): DocEntry {
  const docTableList: DocTable[] = [];
  const leftTextList: string[] = [description, personInCharge, doneTill];

  const docEntry: DocEntry = new DocEntry();
  let rightText: string = "";

  for (const leftText of leftTextList) {
    switch (leftText) {
      case description:
        rightText = defect.description;
        break;
      case personInCharge:
        rightText = defect.personInCharge;
        break;
      case doneTill:
        rightText = defect.doneTill;
        break;
    }

    docTableList.push(
      new DocTable({
        body: new DocTableBody({
          rows: [
            new DocTableBodyRow({
              entries: [
                new DocEntry({
                  docModels: [
                    new DocText({
                      docMargin: new DocMargin(),
                      text: leftText + ":"
                    })
                  ]
                }),
                new DocEntry({
                  docModels: [
                    new DocText({
                      docMargin: new DocMargin(),
                      text: rightText
                    })
                  ]
                })
              ]
            })
          ]
        }),
        docLayout: defaultDocTableLayout
      })
    );
  }

  docEntry.addDocModelList(docTableList);

  return docEntry;
}