'use client'
import { ColumnDef } from '@tanstack/react-table'
import { User } from '@/types/api'
import { Button } from '@/components/ui/button'

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
  },
  {
    accessorKey: 'firstName',
    header: 'Nama Depan',
  },
  {
    accessorKey: 'lastName',
    header: 'Nama Belakang',
  },
  {
    accessorKey: 'age',
    header: 'Umur',
  },
  {
    accessorKey: 'gender',
    header: 'Gender',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'phone',
    header: 'No HP',
  },
  {
    id: 'action',
    header: 'Action',
    cell: ({ row }) => {
      function handleClick() {
        console.log(row)
      }
      return <Button onClick={handleClick}>Edit</Button>
    },
  },
]
