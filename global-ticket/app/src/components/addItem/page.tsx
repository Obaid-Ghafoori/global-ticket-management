import { createItem } from "@/app/src/lib/actions";

export default function AddItem() {
  return (
    <form action={createItem} className="flex flex-col gap-3">
      <input
        className="border border-teal-400 px-3 py-2"
        name="title"
        type="text"
        placeholder="New item title"
      />

      <input
        className="border border-teal-400 px-3 py-2"
        name="description"
        type="text"
        placeholder="New item description"
      />

      <button className="bg-teal-400 font-bold py-3 px-6 w-fit">
        ADD NEW ITEM
      </button>
    </form>
  );
}
