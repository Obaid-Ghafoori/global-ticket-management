"use server";
import { promises as fs } from "fs";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { HolidayDestinationItem, getHolidayDestinationsData } from "@/app/src/lib/util";

let database: HolidayDestinationItem[] = await getHolidayDestinationsData();

export async function createItem(formData: FormData) {
  const inputData = {
    title: formData.get("title"),
    description: formData.get("description"),
  };

  try {
    const newEntry = {
      id: database.length + 1,
      title: inputData.title!.toString(),
      description: inputData.description!.toString(),
    };

    database.push(newEntry);

    await fs.writeFile(
      process.cwd() + "/app/src/lib/mockData.json",
      JSON.stringify(database)
    );
    console.log("New item is successfully added");
  } catch (error) {
    console.error("Error adding new data:, ${error}");
    throw new Error("Failed to add item");
  }

  revalidatePath("/");
  redirect("/");
}

export async function updateItem(index: number, formData: FormData) {
  const inputData = {
    title: formData.get("title"),
    description: formData.get("description"),
  };

  try {
    if (inputData.title && inputData.title != "") {
      database[index].title = inputData.title.toString();
    }

    if (inputData.description && inputData.description != "") {
      database[index].description = inputData.description.toString();
    }

    console.log(JSON.stringify(database[index]));

    await fs.writeFile(
      process.cwd() + "/app/src/lib/mockData.json",
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
    const dataIndex = database.findIndex((item) => item.id == id);
    if (dataIndex == -1) {
      console.log("Could not find an item with id ${id}");
      return;
    }

    database.splice(dataIndex!, 1);

    try {
      await fs.writeFile(
        process.cwd() + "/app/src/lib/mockData.json",
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
