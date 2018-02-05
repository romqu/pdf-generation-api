import { logger } from "../../logger";
export class DocTableBody {
  constructor(private readonly params: { body: object[] }) {}

  public get docDefinition(): object[] {
    // logger.info([this.params.body]);
    return this.params.body;
  }

  public append(params: { body: object[] }): DocTableBody {
    if (this.params.body.length === 0) {
      return new DocTableBody({ body: [params.body] });
    } else {
      return new DocTableBody({
        body: [...this.params.body, ...params.body]
      });
    }
  }
}
