"use client"

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { ArrowUpRightFromSquareIcon, Loader2Icon } from "lucide-react"
import Link from "next/link"
import {CustomTableMeta} from '../types/Columns'

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  initialResult: number
  finalResult: number,
  useremail:string,
}

export function DataTable<TData, TValue>({
  columns,
  data,
  initialResult,
  finalResult,
  useremail
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    meta: { useremail} as CustomTableMeta
  })

  return (
    <>
    <div className="rounded-md border w-3/4">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {data && table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                <Loader2Icon className="animate-spin h-10 w-10 mx-auto"/>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
      <div className="w-3/4 mt-4 text-center flex justify-center space-x-2">
      <p>Showing {initialResult} of {finalResult}</p>
      <Link href={'/dashboard'} className='dark:text-white text-[#030315] underline'>See More <ArrowUpRightFromSquareIcon className="inline" size={18}/></Link>
      </div>
      </>
  )
  
}
