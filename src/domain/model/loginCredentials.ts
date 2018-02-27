export class LoginCredentials {
  constructor(
    private readonly params: {
      readonly email: string;
      readonly password: string;
    }
  ) {}

  public get email(): string {
    return this.params.email;
  }

  public get password(): string {
    return this.params.password;
  }
}
