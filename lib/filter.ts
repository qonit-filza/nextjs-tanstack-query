import { ApiUserFilter, NormalizedUserFilter, RawUserFilter } from '@/types/api'

export function normalizeFilter(
  filter: Partial<RawUserFilter>
): NormalizedUserFilter {
  const page = Array.isArray(filter.page) ? filter.page[0] : filter.page
  const limit = Array.isArray(filter.limit) ? filter.limit[0] : filter.limit
  const q = Array.isArray(filter.q) ? filter.q[0] : filter.q

  const result: NormalizedUserFilter = {
    page: Number(page || 1),
    limit: Number(limit || 10),
  }

  if (q) {
    result.q = q
  }

  return result
}

export function createApiFilter(filter: NormalizedUserFilter): ApiUserFilter {
  return {
    limit: filter.limit,
    skip: (filter.page - 1) * filter.limit,
    q: filter.q,
  }
}
