import { CreateDefectImageFilesTask } from "../../../domain/feature/create_defect_list/createDefectImageFilesTask";
import {
  CreateDefectListManager,
  ICreateDefectListResponse
} from "../../../domain/feature/create_defect_list/createDefectListManager";
import { CreatePdfManager } from "../../../domain/feature/create_pdf/createPdfManager";
import { DefectList } from "../../../domain/model/document/defectList";
import { provide } from "../../../ioc/ioc";
import { callAsync, matchResponse } from "../../../util/failableUtil";
import { parseDeserializeSafeObject } from "../../../util/jsonUtil";

@provide(CreateDefectListController)
  .inSingletonScope()
  .done()
export class CreateDefectListController {
  private readonly createDefectImageFilesTask: CreateDefectImageFilesTask;
  private readonly createDefectListManager: CreateDefectListManager;
  private readonly createPdfManager: CreatePdfManager;

  constructor(
    createDefectImageFilesTask: CreateDefectImageFilesTask,
    createDefectListManager: CreateDefectListManager,
    createPdfManager: CreatePdfManager
  ) {
    this.createDefectImageFilesTask = createDefectImageFilesTask;
    this.createDefectListManager = createDefectListManager;
    this.createPdfManager = createPdfManager;
  }

  public async execute(data: any): Promise<string> {
    let createDefectListResponse: ICreateDefectListResponse;
    const response = await callAsync<string>(async ({ success, run }) => {
      let part: any;
      // tslint:disable-next-line:no-conditional-assignment
      while ((part = await data)) {
        if (part.length) {
          createDefectListResponse = run(
            await this.createDefectListManager.execute(
              parseDeserializeSafeObject(part[1], DefectList)
            )
          );
        } else {
          run(
            this.createDefectImageFilesTask.execute(
              createDefectListResponse.defectListFolderName,
              createDefectListResponse.allDefectImageNamesMap.get(
                part.filename
              )!,
              part
            )
          );
        }
      }

      // this.createPdfManager.execute();

      // create actual pdf document

      return success("./pdfs/lukas_jakobs_pdf_prototype.pdf");
    });

    return matchResponse(response, value => value, _ => "");
  }
}
