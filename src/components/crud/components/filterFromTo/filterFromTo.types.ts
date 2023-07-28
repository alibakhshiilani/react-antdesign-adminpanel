export interface FilterFromToInterface {
  showDatePickers?: boolean;
  setShowDatePickers?: (state: boolean) => void;
  setFilter?: (filter: any) => void;
  filter?: object | any;
  item?: string;
  reset?: boolean;
  setReset?: (state: boolean) => void;
}
