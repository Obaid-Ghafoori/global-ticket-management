import { HolidayDestinationItem as item } from "@/app/src/lib/util";
import DeleteButton from "./deleteItemForm";
import Link from "next/link";

export default function ItemList({ jsonData }: { jsonData: item[] }) {
  return (
    <>
      {jsonData.map((item) => (
        <div
          key={item.id}
          className="p-4 my-5 border border-x-0 border-t-0 border-teal-400 flex justify-between items-center"
        >
          <div>
            <h2 className="font-bold text-2xl">{item.title}</h2>
            <p>{item.description}</p>
          </div>
          <div className="flex gap-3">
            <DeleteButton id={item.id} />
            <Link href={`/editItem/${item.id}`}>
              <p className="p-2 font-bold bg-blue-500 hover:bg-blue-300">
                Edit
              </p>
            </Link>
          </div>
        </div>
      ))}
    </>
  );
}
