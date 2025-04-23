import { atom } from 'jotai';
import type { SelectOption } from 'rizzui';

export const filterAtom = atom<{
  filtered_pumps: SelectOption[];
  filtered_tanks: SelectOption[];
  filtered_nozzles: SelectOption[];
  filtered_products: SelectOption[];
  filtered_stations: SelectOption[];
  start_date: string;
  end_date: string;
  license_plate: string;
  card_id: string;
  tag_id: string;
}>({
  filtered_pumps: [],
  filtered_tanks: [],
  filtered_nozzles: [],
  filtered_products: [],
  filtered_stations:[],
  start_date: '',
  end_date: '',
  license_plate: '',
  card_id: '',
  tag_id: '',
});
