import { updateItem } from "@/app/src/lib/actions";
import {
  HolidayDestinationItem,
  getHolidayDestinationsData,
} from "@/app/src/lib/util";
import { redirect } from "next/navigation";

export default async function EditItem({ params }: { params: { id: string } }) {
  const id = Number(params.id);
  const database: HolidayDestinationItem[] = await getHolidayDestinationsData();

  const itemIndex = database.findIndex((item) => item.id == id);

  if (itemIndex == -1) {
    console.log(`No such item found with the id ${id}`);
    redirect("/");
  }

  const item = database[itemIndex];
  const updateItemByIndex = updateItem.bind(null, itemIndex);

  return (
    <form action={updateItemByIndex} className="flex flex-col gap-3">
      <p> Current title: {item.title}</p>
      <input
        className="border border-teal-400 px-3 py-2"
        name="title"
        type="text"
        placeholder="New item title"
      />

      <p> Current description: {item.description}</p>

      <input
        className="border border-teal-400 px-3 py-2"
        name="description"
        type="text"
        placeholder="New item description"
      />

      <button className="bg-teal-400 font-bold py-3 px-6 w-fit">
        EDIT ITEM
      </button>
    </form>
  );
}
