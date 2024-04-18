import ItemList from "@/app/src/components/itemList";
import { getHolidayDestinationsData } from "@/app/src/lib/util";

export default async function Home() {
  const retrieveData = await getHolidayDestinationsData();

  return <ItemList jsonData={retrieveData} />;
}
