export type CalendarRef = {
  show: () => any;
  close: () => any;
};

export type CalendarProps = {
  value?: any;
  onSelect?: (m: any) => any;
}