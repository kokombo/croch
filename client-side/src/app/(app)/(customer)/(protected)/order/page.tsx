"use client";

import { useGetCustomerOrders } from "@/utilities/api-interactions/order";
import {
  useReactTable,
  createColumnHelper,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import commaNumber from "comma-number";
import { useEffect, useMemo, useReducer, useState } from "react";

const Order = () => {
  const {
    data: orders,
    isError,
    isLoading,
    isSuccess,
    error,
  } = useGetCustomerOrders("pending");

  let tableValues: Order[] = [];

  if (orders) {
    tableValues = orders;
  }

  const [data, setData] = useState<Order[]>([]);

  useEffect(() => {
    if (orders) {
      setData(orders);
    }
  }, [isSuccess, orders]);

  const columnHelper = createColumnHelper<Order>();

  const columns = useMemo(
    () => [
      columnHelper.accessor("createdAt", {
        header: () => "Date",
        cell: (info) => (
          <span> {new Date(info.getValue()).toDateString()} </span>
        ),
      }),

      columnHelper.accessor("items", {
        header: () => "No. of items",
        cell: (info) => <span>{info.getValue().length} </span>,
      }),

      columnHelper.accessor("brandName", {
        header: () => "Customer",
        cell: (info) => info.getValue(),
      }),

      columnHelper.accessor("totalPrice", {
        header: () => "Price",
        cell: (info) => <span>&#8358;{commaNumber(info.renderValue()!)} </span>,
      }),

      columnHelper.accessor("status", {
        header: () => "Status",
        cell: (info) => info.renderValue(),
      }),
    ],
    [columnHelper]
  );

  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <main className="paddingX py-10">
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        {orders && orders.length > 0 ? (
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        ) : (
          <tbody>
            <tr>
              <td>There are no orders.</td>
            </tr>
          </tbody>
        )}
      </table>
    </main>
  );
};

export default Order;
