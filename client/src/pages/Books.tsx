import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetBooksQuery } from "@/redux/api/baseApi";
import { Edit, Gift, Trash } from "lucide-react";

export function Books() {
  const { data, isLoading } = useGetBooksQuery([]);
  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead>Author</TableHead>
          <TableHead>Genre</TableHead>
          <TableHead>ISBN</TableHead>
          <TableHead>Copies</TableHead>
          <TableHead>Available</TableHead>
          <TableHead className="text-left">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {!isLoading &&
          data.data.map((book: any) => (
            <TableRow key={book._id}>
              <TableCell>{book.title}</TableCell>
              <TableCell>{book.author}</TableCell>
              <TableCell>{book.genre}</TableCell>
              <TableCell>{book.isbn}</TableCell>
              <TableCell>{book.copies}</TableCell>
              <TableCell>{book.available ? "Yes" : "No"}</TableCell>
              <TableCell className="flex items-center justify-start gap-1">
                <Edit className="cursor-pointer" />
                <Trash className="cursor-pointer" />
                <Gift className="cursor-pointer" />
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
}
