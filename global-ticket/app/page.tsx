import Image from "next/image";
import ItemList from "./src/components/itemList";
import { getHolidayDestinationsData } from "./src/lib/util";

export default async function Home() {
  const retrieceData = await getHolidayDestinationsData();

  return <ItemList jsonData={retrieceData}></ItemList>;
}
