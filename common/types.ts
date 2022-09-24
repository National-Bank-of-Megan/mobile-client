import {SubAccountCurrencyBalance} from "../screens/TransfersScreen";

export interface FormProps {
  showDialog: () => void;
  subAccountBalanceList: SubAccountCurrencyBalance[];
  selectedCurrencyName: string;
}