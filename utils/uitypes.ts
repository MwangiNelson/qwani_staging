export interface ISwitch {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
export type SetState<T> = React.Dispatch<React.SetStateAction<T>>;
export type Props = {
  params: {
    [key: string]: string | string[];
  };
  searchParams: { [key: string]: string | string[] | undefined };
};

export type PageProps<T extends string> = {
  params: Record<T, string>;
  searchParams: { [key: string]: string | string[] | undefined };
};
