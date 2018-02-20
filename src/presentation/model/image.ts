import { serialize } from "cerialize";

export class Image {
  @serialize public readonly name: string;

  constructor(name: string) {
    this.name = name;
  }
}
