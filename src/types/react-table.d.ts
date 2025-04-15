import '@tanstack/react-table';

declare module '@tanstack/react-table' {
  interface ColumnMeta<TData extends Record<string, any> = unknown, TValue = unknown> {
    isExtra?: boolean;
  }
}