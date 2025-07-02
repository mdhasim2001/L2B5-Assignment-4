import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useDeleteBookMutation, useGetBooksQuery } from "@/redux/api/baseApi";
import { Edit, Gift, Trash } from "lucide-react";
import Swal from "sweetalert2";

export function Books() {
  const { data, isLoading } = useGetBooksQuery([]);
  const [deleteBook] = useDeleteBookMutation();
  if (isLoading) {
    return <p>Loading...</p>;
  }

  const handleBookDelete = async (bookId: any) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await deleteBook(bookId);
        if (res) {
          Swal.fire({
            title: "Deleted!",
            text: "Your book has been deleted.",
            icon: "success",
          });
        }
      }
    });
  };

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
                <Trash
                  onClick={() => handleBookDelete(book._id)}
                  className="cursor-pointer"
                />
                <Gift className="cursor-pointer" />
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
}
