'use server';
import { promises as fs } from "fs";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { HolidayDestinationItem, getHolidayDestinationsData } from "./util";


let database: HolidayDestinationItem[];

export async function createItem(formData: FormData) {
  const input = {
    title: formData.get("title") as string,
    description: formData.get("description") as string,
  };
  try {
    database = await getHolidayDestinationsData();
    const newEntry: HolidayDestinationItem = {
      id: database.length + 1,
      title: input.title,
      description: input.description,
    };
    database.push(newEntry);

    await fs.writeFile(
      process.cwd() + "/app/lib/mockData.json",
      JSON.stringify(database)
    );
  } catch (error) {
    console.error("Error adding new data:, ${error}");
    throw new Error("Failed to add item");
  }
  revalidatePath("/");
  redirect("/");
}

export async function updateItem(index: number, formData: FormData) {
  const id = index + 1;
  const inputData: HolidayDestinationItem = {
    id, // Add this line to include the 'id' in inputData
    title: formData.get("title") as string,
    description: formData.get("description") as string,
  };
  try {
    database = await getHolidayDestinationsData();

    if (index === -1) {
      throw new Error("Item not found");
    }

    if (inputData.title && inputData.title != "") {
      database[index].title = inputData.title;
    }
    if (inputData.description && inputData.description != "") {
      database[index].description = inputData.description;
    }

    console.log(JSON.stringify(database[index]));
    await fs.writeFile(
      process.cwd() + "/app/lib/mockData.json",
      JSON.stringify(database)
    );

    console.log("New item is successfully updated!");
  } catch (error) {
    console.error(`Error updating data: ${error}`);
    throw new Error("Failed to update item");
  }
  revalidatePath("/");
  redirect("/");
}

export async function deleteItem(id: number) {
  try {
    database = await getHolidayDestinationsData();
    const itemIndex = database.findIndex((item) => item.id === id);
    if (itemIndex === -1) {
      throw new Error("Could not find an item with id ${id}");
    }

    database.splice(itemIndex!, 1);

    await fs.writeFile(
      process.cwd() + "/app/lib/mockData.json",
      JSON.stringify(database)
    );
    console.log(`Item with id ${id} is successfully deleted!`);
  } catch (error) {
    console.error(`Error deleting data: ${error}`);
    throw new Error("Failed to delete item");
  }
  revalidatePath("/");
  redirect("/");
}
