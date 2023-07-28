export interface CustomFileManagerInterface {
  value?: string;
  onChange?: (fileId: string | string[] | undefined) => void;
  accept?: string;
}
