import { api } from '@/lib/api-client'
import { QueryConfig } from '@/lib/tanstack-query'
import {
  queryOptions,
  useQuery,
  useSuspenseQuery,
  QueryClient,
} from '@tanstack/react-query'
import { User } from '@/types/api'

export function getUsers(): Promise<{ users: User[] }> {
  return api.get('/users')
}

export function getUsersQueryOptions() {
  return queryOptions({
    queryKey: ['users'],
    queryFn: getUsers,
  })
}

type UseUsersOptions = {
  queryConfig?: QueryConfig<typeof getUsersQueryOptions>
}

export function usePrefetchGetUsers(
  queryClient: QueryClient,
  queryConfig: UseUsersOptions = {}
) {
  return queryClient.prefetchQuery({
    ...getUsersQueryOptions(),
    ...queryConfig,
  })
}

export function useSuspenseGetUsers({ queryConfig }: UseUsersOptions = {}) {
  return useSuspenseQuery({
    ...getUsersQueryOptions(),
    ...queryConfig,
  })
}

export function useGetUsers({ queryConfig }: UseUsersOptions = {}) {
  return useQuery({
    ...getUsersQueryOptions(),
    ...queryConfig,
  })
}
