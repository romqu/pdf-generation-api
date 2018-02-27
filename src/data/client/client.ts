export class Client {
  constructor(
    private readonly params: {
      readonly id: number;
      readonly forename: string;
      readonly surname: string;
    }
  ) {}
}
