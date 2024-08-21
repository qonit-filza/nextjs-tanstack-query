import { DataTable } from './components/data-table'
import { Payment, columns } from './components/columns'
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

async function getData(): Promise<Payment[]> {
  return [
    {
      id: '728ed52f',
      amount: 100,
      status: 'pending',
      email: 'm@example.com',
    },
    // ...
  ]
}

export default async function Home() {
  const data = await getData()

  return (
    <main className="bg-slate-50 min-h-screen p-10">
      <div className="flex justify-between">
        <Input placeholder="Search" className="max-w-md" />
        <div className="flex gap-2">
          <Button variant="outline">-</Button>
          <Button variant="outline">-</Button>
          <Button variant="outline">-</Button>
        </div>
      </div>
      <div className="mt-10"></div>
      <DataTable columns={columns} data={data} />
      <div className="mt-10 flex justify-between">
        <div className="flex items-center gap-2">
          <span className="shrink-0">Showing 1 to 3 of 3 Rows</span>
          <Select className="w-10">
            <SelectTrigger>
              <SelectValue placeholder="10" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">10</SelectItem>
              <SelectItem value="dark">20</SelectItem>
              <SelectItem value="system">30</SelectItem>
            </SelectContent>
          </Select>
          <span className="shrink-0">records per page</span>
        </div>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </main>
  )
}
