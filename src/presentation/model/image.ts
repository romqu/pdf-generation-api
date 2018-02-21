import { autoserialize } from "cerialize";

export class Image {
  @autoserialize public readonly name: string;

  constructor(name: string) {
    this.name = name;
  }
}
