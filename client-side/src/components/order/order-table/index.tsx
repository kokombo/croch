import {
  useReactTable,
  createColumnHelper,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import { AxiosError } from "axios";
import commaNumber from "comma-number";
import { useEffect, useMemo, useState } from "react";

type Props = {
  orders: Order[] | undefined;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  error: AxiosError<ErrorResponse, any> | null;
};

const OrderTable = (props: Props) => {
  const [data, setData] = useState<Order[]>([]);

  useEffect(() => {
    if (props.orders) {
      setData(props.orders);
    }
  }, [props.isSuccess, props.orders]);

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
        cell: (info) => (
          <span
            className={`${info.renderValue() === "pending" ? "text-orange" : "fulfilled" ? "text-lightgreen" : "text-red"}`}
          >
            {info.renderValue()}
          </span>
        ),
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
    <table className="border_grey_1 w-full">
      <thead className="bg-gray">
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th key={header.id} className="border1 py-6 text-left px-12">
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

      {props.isLoading ? (
        <tbody className="h-200">
          <tr>
            <td>Loading...</td>
          </tr>
        </tbody>
      ) : props.isError ? (
        <tbody className="h-200">
          <tr>
            <td>Error</td>
          </tr>
        </tbody>
      ) : props.orders && props.orders.length < 1 ? (
        <tbody className="h-200">
          <tr>
            <td>There are no orders.</td>
          </tr>
        </tbody>
      ) : (
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              className="cursor-pointer hover:bg-gray"
              onClick={() => {}}
            >
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="border1 py-6 text-left px-12 ">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      )}
    </table>
  );
};

export default OrderTable;
