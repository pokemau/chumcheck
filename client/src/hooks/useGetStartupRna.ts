import { getStartupRna } from "@/services/server/startup.service"
import { useQuery } from "@tanstack/react-query"

export const useGetStartupRna = (startupId: number) => {
  return useQuery({
    queryKey: ['startup', startupId],
    queryFn: () => getStartupRna(startupId),
    enabled: startupId > 0,
    staleTime: 5 * 60 * 1000
  })
}

