export interface SQLQuery{
  columns: string[]
  rows: any[]
}
export interface NoSQLQuery{
  data: any
}
export const isSQLQuery = (result: QueryResult): result is SQLQuery => {
  return !!result && 'columns' in result && 'rows' in result;
};
export const isNoSQLQuery = (result: QueryResult): result is NoSQLQuery => {
  return !!result && 'data' in result;
};
export type QueryResult = (SQLQuery | NoSQLQuery) | null;