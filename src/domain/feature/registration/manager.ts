import { callAsync } from "../../../util/failableUtil";
import { Registration } from "../../model/registration";
import { DoesEmailExistTask } from "./doesEmailExistTask";

export class Manager {
  private readonly doesEmailExistTask: DoesEmailExistTask;

  public execute(registration: Registration): void {
    callAsync<number>(async ({ failure, success, run }) => {
      return success(1);
    });
  }
}
