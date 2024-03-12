export interface Visitor {
  _id?: string;
  name: string;
  email: string;
  mobile: number;
  places: string[];
  whenToVisit: string;
  isValidVisitor?: boolean;
}
