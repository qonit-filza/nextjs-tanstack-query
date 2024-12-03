import { usePrefetchGetUsers } from '@/features/users/api/get-users'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import { RawUserFilter } from '@/types/api'
import Dashboard from './dashboard'
import { normalizeFilter } from '@/lib/filter'

type DashboardPageProps = {
  searchParams: Partial<RawUserFilter>
}

export default function DashboardPage({ searchParams }: DashboardPageProps) {
  const filter = normalizeFilter(searchParams)
  const queryClient = usePrefetchGetUsers({ filter })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Dashboard />
    </HydrationBoundary>
  )
}
