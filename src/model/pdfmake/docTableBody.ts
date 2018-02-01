export class DocTableBody {
  constructor(private readonly params: { body: object[] }) {}

  public get docDefinition(): object {
    return this.params;
  }

  public append(params: { body: object }): DocTableBody {
    if(params.body === {}){
      return new DocTableBody({ body: [this.params] });
    }else{
      return new DocTableBody({{body: this.params}})
    }
    
  }
}
