export class ClientEntity {
  public readonly id: number;
  public readonly forename: string;
  public readonly surname: string;

  constructor(id: number = 0, forename: string, surname: string) {
    this.id = id;
    this.forename = forename;
    this.surname = surname;
  }
}
