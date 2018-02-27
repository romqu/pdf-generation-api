export class HashPasswordTask {
  private readonly argon2: any;

  constructor(argon2P: any) {
    this.argon2 = argon2P;
  }

  public async execute(password: string): Promise<string> {
    return await this.argon2.hash(password, {
      type: this.argon2.argon2id,
      timeCost: 1,
      parallelism: 4,
      memoryCost: 5
    });
  }
}
