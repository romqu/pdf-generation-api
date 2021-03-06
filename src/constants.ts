import { DocMargin } from "./domain/model/pdfmake/docMargin";
import { DocTableLayout } from "./domain/model/pdfmake/docTableLayout";

export const defaultDocTableLayout: DocTableLayout = new DocTableLayout({
  hLineWidth: (_: number, __: object): number => {
    return 0;
  },
  vLineWidth: (_: number, __: object): number => {
    return 0;
  },
  hLineColor: (_: number, __: object): string => {
    return "black";
  },
  vLineColor: (_: number, __: object): string => {
    return "black";
  },
  paddingLeft: (_: number, __: object): number => {
    return 0;
  },
  paddingRight: (_: number, __: object): number => {
    return 0;
  },
  paddingTop: (_: number, __: object): number => {
    return 0;
  },
  paddingBottom: (_: number, __: object): number => {
    return 0;
  }
});

export const defaultDocMargin: DocMargin = new DocMargin({
  left: 2,
  top: 2,
  right: 2,
  bottom: 2
});

export const enum ErrorTag {
  DB = "DB",
  SERIALIZATION = "SERIALIZATION",
  DESERIALIZATION = "DESERIALIZATION",
  ARGON2_HASH = "ARGON2_HASH",
  ARGON2_HASH_VERIFY = "ARGON2_HASH_VERIFY",
  EMAIL_EXISTS = "EMAIL_EXISTS"
}

export const enum ErrorKey {
  DB = "DB",
  SERIALIZATION = "SERIALIZATION",
  DESERIALIZATION = "DESERIALIZATION",
  ARGON2_HASH = "ARGON2_HASH",
  ARGON2_HASH_VERIFY = "ARGON2_HASH_VERIFY",
  EMAIL_EXISTS = "EMAIL_EXISTS"
}

export const enum Folder {
  UPLOAD_FOLDER_BASE_PATH = "./uploads/",
  IMAGES_FOLDER_NAME = "images"
}

export const enum FsModeOctal {
  DEFAULT = 0o600
}

export const guestPathAccessMap = new Map<string, boolean>([["/test", true]]);
