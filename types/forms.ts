export interface FormField {
  name: string;
  value: string;
  type: string;
  placeholder: string;
  required?: boolean;
  error: string;
};