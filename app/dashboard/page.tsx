import { usePrefetchGetUsers } from '@/features/users/api/get-users'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import { getQueryClient } from '@/lib/tanstack-query'
import Dashboard from './dashboard'

export default function DashboardPage() {
  const queryClient = getQueryClient()
  usePrefetchGetUsers(queryClient)

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Dashboard />
    </HydrationBoundary>
  )
}
