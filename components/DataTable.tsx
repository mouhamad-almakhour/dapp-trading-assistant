import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

const DataTable = <T,>({ columns, data, rowKey }: DataTableProps<T>) => {
  return (
    <Table className="custom-scrollbar">
      <TableHeader>
        <TableRow className="hover:bg-transparent!">
          {columns.map((column, i) => (
            <TableHead
              key={i}
              className="bg-dark-400 text-purple-100 py-4 first:pl-5 last:pr-5"
            >
              {column.header}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((row, rowIndex) => (
          <TableRow
            key={rowKey(row, rowIndex)}
            className="overflow-hidden rounded-lg border-b border-purple-100/5 hover:bg-dark-400/30! relative"
          >
            {columns.map((column, columnIndex) => (
              <TableCell
                key={columnIndex}
                className="py-4 first:pl-5 last:pr-5"
              >
                {column.cell(row, rowIndex)}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default DataTable;
