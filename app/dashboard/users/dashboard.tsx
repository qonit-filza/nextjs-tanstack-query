'use client'
import { DataTable } from './_components/data-table'
import { columns } from './_components/columns'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useSuspenseGetUsers } from '@/features/users/api/get-users'
import { usePathname, useSearchParams, useRouter } from 'next/navigation'
import { normalizeFilter } from '@/lib/filter'
import { useMemo, useTransition } from 'react'
import { NormalizedUserFilter } from '@/types/api'

export default function Dashboard() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const filter = normalizeFilter({
    page: searchParams.get('page'),
    limit: searchParams.get('limit'),
    q: searchParams.get('q'),
  })
  console.log(filter)

  function createQueryString(
    filter: keyof NormalizedUserFilter,
    value: string
  ) {
    console.log({ filter, value })

    const params = new URLSearchParams(searchParams.toString())

    if (filter === 'q') {
      params.delete('page')
      params.delete('limit')
    }

    if (value) {
      params.set(filter, value)
    } else {
      params.delete(filter)
    }

    return params.toString()
  }

  const { data } = useSuspenseGetUsers({ filter })
  const totalPage = Math.ceil(data.total / filter.limit)
  const paginations = useMemo(() => {
    const result: Array<{
      page: number | 'ellipsis-start' | 'ellipsis-end'
      query?: NormalizedUserFilter
    }> = []

    if (filter.page >= 4) {
      result.push({
        page: 1,
        query: { ...filter, page: 1 },
      })
    }
    if (filter.page >= 5) {
      result.push({ page: 'ellipsis-start' })
    }

    Array.from({ length: totalPage }, (_, i) => i + 1).forEach((page) => {
      if (page >= filter.page - 2 && page <= filter.page + 2) {
        result.push({
          page,
          query: { ...filter, page },
        })
      }
    })

    if (filter.page <= totalPage - 5) {
      result.push({ page: 'ellipsis-end' })
    }

    if (filter.page <= totalPage - 4) {
      result.push({
        page: totalPage,
        query: { ...filter, page: totalPage },
      })
    }
    return result
  }, [filter, totalPage])

  const [isPending, startTransition] = useTransition()

  return (
    <main className="bg-muted min-h-screen p-10">
      <div className="flex justify-between">
        <Input
          placeholder="Search"
          className="max-w-md"
          defaultValue={filter.q}
          onChange={(e) => {
            // startTransition(() => {

            router.push(`${pathname}?${createQueryString('q', e.target.value)}`)
            // })
          }}
        />
        <div className="flex gap-2">
          <Button variant="outline">-</Button>
          <Button variant="outline">-</Button>
          <Button variant="outline">-</Button>
        </div>
      </div>
      <div className="mt-10 relative">
        <DataTable columns={columns} data={data.users} />
        {isPending && (
          <div className="bg-background w-full h-full absolute top-0 left-0 bg-opacity-80 grid place-items-center">
            Loading...
          </div>
        )}
      </div>

      <div className="mt-10 flex justify-between">
        <div className="flex items-center gap-2">
          <span className="shrink-0">
            {`Showing ${data.skip + 1} to ${data.skip + data.users.length} of ${
              data.total
            } rows`}
          </span>
          <Select
            value={filter.limit.toString()}
            onValueChange={(value) => {
              startTransition(() => {
                router.push(`${pathname}?${createQueryString('limit', value)}`)
              })
            }}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="30">30</SelectItem>
            </SelectContent>
          </Select>
          <span className="shrink-0">records per page</span>
        </div>

        <Pagination>
          <PaginationContent>
            {filter.page > 1 && (
              <PaginationItem>
                <PaginationPrevious
                  href={{
                    query: {
                      ...filter,
                      page: filter.page - 1,
                    },
                  }}
                />
              </PaginationItem>
            )}

            {paginations.map((p) => (
              <>
                {typeof p.page === 'number' ? (
                  <PaginationItem key={p.page}>
                    <PaginationLink
                      href={{ query: p.query }}
                      isActive={p.page === filter.page}
                    >
                      {p.page}
                    </PaginationLink>
                  </PaginationItem>
                ) : (
                  <PaginationItem key={p.page}>
                    <PaginationEllipsis />
                  </PaginationItem>
                )}
              </>
            ))}

            {filter.page < totalPage && (
              <PaginationItem>
                <PaginationNext
                  href={{
                    query: {
                      ...filter,
                      page: filter.page + 1,
                    },
                  }}
                />
              </PaginationItem>
            )}
          </PaginationContent>
        </Pagination>
      </div>
    </main>
  )
}
