import {
  useReactTable,
  createColumnHelper,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import type { AxiosError } from "axios";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

type Item = {
  cummulativePrice: number;
  info: {
    price: string;
  };
  thumbNail: string;
  title: string;
  _id: string;
  count: number;
  size: string;
};

type Props = {
  order: Order | undefined;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  error: AxiosError<ErrorResponse> | null;
};

const OrderDetailsTable = (props: Props) => {
  const [data, setData] = useState<Item[]>([]);

  useEffect(() => {
    if (props.order) {
      setData(props.order.items);
    }
  }, [props.order]);

  const columnHelper = createColumnHelper<Item>();

  const columns = useMemo(
    () => [
      columnHelper.accessor("title", {
        header: () => "TITLE",
        cell: (info) => (
          <p className="max-w-32 text-balance"> {info.getValue()} </p>
        ),
      }),

      columnHelper.accessor("thumbNail", {
        header: () => "IMAGE",
        cell: (info) => (
          <Image
            src={info.getValue()}
            alt=""
            height={50}
            width={50}
            priority
            quality={100}
          />
        ),
      }),

      columnHelper.accessor("info", {
        header: () => "PRICE",
        cell: (info) => (
          <span>&#8358;{info.renderValue()?.price.toLocaleString()} </span>
        ),
      }),

      columnHelper.accessor("count", {
        header: () => "COUNT",
        cell: (info) => <span className="pl-4">{info.renderValue()} </span>,
      }),

      columnHelper.accessor("cummulativePrice", {
        header: () => "SUB-TOTAL",
        cell: (info) => (
          <span>&#8358;{info.renderValue()?.toLocaleString()} </span>
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
              <th key={header.id} className="border1 py-6 text-start px-4">
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
      ) : props.order && props.order?.items.length < 1 ? (
        <tbody className="h-200">
          <tr>
            <td>There are no items </td>
          </tr>
        </tbody>
      ) : (
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="border1 py-6 text-start px-4">
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

export default OrderDetailsTable;
