export class Image {
  constructor(private readonly params: { readonly name: string }) {}

  public get name(): string {
    return this.params.name;
  }
}
