import type { Toast } from "react-hot-toast";
interface AlertPropType {
  toast: Toast;
}

export interface ErrorAlertProps extends AlertPropType {
  errorText: string;
}

export interface SuccessAlertProps extends AlertPropType {
  successText: string;
}

export interface NetworkErrorAlertProps extends AlertPropType {}
