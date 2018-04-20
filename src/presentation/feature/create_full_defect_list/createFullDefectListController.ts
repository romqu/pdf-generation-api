import { CreateDefectImageFilesTask } from "../../../domain/feature/create_defect_list/createDefectImageFilesTask";
import { provide } from "../../../ioc/ioc";

@provide(CreateFullDefectListController)
  .inSingletonScope()
  .done()
export class CreateFullDefectListController {
  private readonly createDefectImageFilesTask: CreateDefectImageFilesTask;

  constructor(createDefectImageFilesTask: CreateDefectImageFilesTask) {
    this.createDefectImageFilesTask = createDefectImageFilesTask;
  }

  public async execute(data: any): Promise<void> {
    let part;
    // tslint:disable-next-line:no-conditional-assignment
    while ((part = await data)) {
      if (part.length) {
        // const resultt = await manager.execute(
        //   Deserialize(JSON.parse(part[1]), DefectList)!
        // );
      } else {
        part.pipe(fs.createWriteStream("/tmp/BBBBBBBBB_" + part.filename));
      }
    }
  }
}
