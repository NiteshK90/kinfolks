export interface Places {
  id: string;
  name: string;
  timeToVisit: string;
  description: string;
  locationId: string;
  createdAt: string;
}

export interface Locations {
  id: string;
  name: string;
  places: Places[];
  createdAt: string;
}
