export class LoginCredentialsEntity {
  constructor(
    private readonly params: {
      readonly id: number;
      readonly email: string;
      readonly passwordHash: string;
    }
  ) {}

  get email(): string {
    return this.params.email;
  }

  get passwordHash(): string {
    return this.params.passwordHash;
  }
}
