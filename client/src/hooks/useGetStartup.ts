import { getStartupById } from "@/services/server/startup.service"
import { useQuery } from "@tanstack/react-query"

export const useGetStartupData = (startupId: number, enabled: boolean = true) => {
  return useQuery({
    queryKey: ['startup', startupId],
    queryFn: () => getStartupById(startupId),
    enabled: enabled && startupId > 0,
    staleTime: 5 * 60 * 1000
  })
}
