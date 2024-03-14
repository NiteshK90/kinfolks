import { Option } from "../../components/common/form-elements/types";

export interface CreateVisitorProps {
  name: string;
  email: string;
  mobile: number;
  places: Option[];
  whenToVisit: string;
  isValidVisitor?: boolean;
}
