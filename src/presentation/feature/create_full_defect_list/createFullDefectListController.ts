import { CreateDefectImageFilesTask } from "../../../domain/feature/create_defect_list/createDefectImageFilesTask";
import { CreateDefectListManager } from "../../../domain/feature/create_defect_list/createDefectListManager";
import { DefectList } from "../../../domain/model/document/defectList";
import { provide } from "../../../ioc/ioc";
import { callAsync, matchResponse } from "../../../util/failableUtil";
import { parseDeserializeSafeObject } from "../../../util/jsonUtil";

@provide(CreateFullDefectListController)
  .inSingletonScope()
  .done()
export class CreateFullDefectListController {
  private readonly createDefectImageFilesTask: CreateDefectImageFilesTask;
  private readonly createDefectListManager: CreateDefectListManager;

  constructor(
    createDefectImageFilesTask: CreateDefectImageFilesTask,
    createDefectListManager: CreateDefectListManager
  ) {
    this.createDefectImageFilesTask = createDefectImageFilesTask;
    this.createDefectListManager = createDefectListManager;
  }

  public async execute(data: any): Promise<string> {
    let map: Map<string, string>;
    const response = await callAsync<string>(async ({ success, run }) => {
      let part: any;
      // tslint:disable-next-line:no-conditional-assignment
      while ((part = await data)) {
        if (part.length) {
          map = run(
            await this.createDefectListManager.execute(
              parseDeserializeSafeObject(part[1], DefectList)
            )
          );
        } else {
          const result = run(
            this.createDefectImageFilesTask.execute(
              "/tmp/" + map.get(part.filename),
              part
            )
          );
        }
      }

      // create actual pdf document

      return success("./pdfs/lukas_jakobs_pdf_prototype.pdf");
    });

    return matchResponse(response, value => value, error => "");
  }
}
