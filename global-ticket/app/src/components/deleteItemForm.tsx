import { deleteItem } from "../lib/actions";

export default function DeleteButton({ id }: { id: number }) {
  const deleteItemById = deleteItem.bind(null, id);
  return (
    <form action={deleteItemById}>
      <button className="p-2 bg-red-800 font-bold hover:bg-red-950">
        Delete
      </button>
    </form>
  );
}
