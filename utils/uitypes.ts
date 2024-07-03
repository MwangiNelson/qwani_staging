export interface ISwitch {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
export type SetState<T> = React.Dispatch<React.SetStateAction<T>>;
