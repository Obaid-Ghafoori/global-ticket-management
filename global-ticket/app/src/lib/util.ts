import{promises as fs} from 'fs';

export type HolidayDestinationItem = {
    id: number;
    title: string;
    description: string;
}

export async function getHolidayDestinationsData() {
    try {
        const dataFile = await fs.readFile(process.cwd() + '/app/src/lib/mockData.json', 'utf8');
        const data = JSON.parse(dataFile);
        return data;
    } catch (error) {
        console.error('Error occurred:', error);
        throw new Error('Failed to retrieve holiday destinations data');
    }
}

