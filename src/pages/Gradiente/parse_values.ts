export function parseFormValues(formValues: any): any {
  return {
    quota_value: parseInt(formValues.quota_value),
    g: parseInt(formValues.g),
    interest: parseFloat(formValues.interest),
    n: parseInt(formValues.n),
  };
}
