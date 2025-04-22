export const useQueriesState = (queries: any) => {
  const isLoading = queries.some((query: any) => query.isLoading);
  const isError = queries.some((query: any) => query.isError);

  return { isLoading, isError };
};
