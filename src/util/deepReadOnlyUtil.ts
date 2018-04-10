type NonFunctionPropertyNames<T> = {
  [// tslint:disable-next-line:ban-types
  K in keyof T]: T[K] extends Function ? never : K
}[keyof T];

type DeepReadonlyObject<T> = {
  readonly [P in NonFunctionPropertyNames<T>]: DeepReadonly<T[P]>
};

// tslint:disable-next-line:interface-name
interface DeepReadonlyArray<T> extends ReadonlyArray<DeepReadonly<T>> {}

export type DeepReadonly<T> = T extends any[]
  ? DeepReadonlyArray<T[number]>
  : T extends object ? DeepReadonlyObject<T> : T;
