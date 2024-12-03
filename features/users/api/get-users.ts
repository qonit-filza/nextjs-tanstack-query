import { api } from '@/lib/api-client'
import { getQueryClient, QueryConfig } from '@/lib/tanstack-query'
import { queryOptions, useQuery, useSuspenseQuery } from '@tanstack/react-query'
import { User, NormalizedUserFilter } from '@/types/api'
import { createApiFilter } from '@/lib/filter'

export function getUsers(
  filter: NormalizedUserFilter
): Promise<{ users: User[]; total: number; skip: number; limit: number }> {
  const params = createApiFilter(filter)

  return api.get('/users/search', { params })
}

export function getUsersQueryOptions(filter: NormalizedUserFilter) {
  return queryOptions({
    queryKey: ['users', filter],
    queryFn: () => getUsers(filter),
  })
}

type UseUsersOptions = {
  queryConfig?: QueryConfig<typeof getUsersQueryOptions>
  filter: NormalizedUserFilter
}

export function usePrefetchGetUsers({
  filter,
  queryConfig = {},
}: UseUsersOptions) {
  const queryClient = getQueryClient()
  queryClient.prefetchQuery({ ...getUsersQueryOptions(filter), ...queryConfig })
  return queryClient
}

export function useSuspenseGetUsers({
  filter,
  queryConfig = {},
}: UseUsersOptions) {
  return useSuspenseQuery({
    ...getUsersQueryOptions(filter),
    ...queryConfig,
  })
}

export function useGetUsers({ filter, queryConfig = {} }: UseUsersOptions) {
  return useQuery({
    ...getUsersQueryOptions(filter),
    ...queryConfig,
  })
}
