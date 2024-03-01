import { NextPage } from "next";
import { useForm } from "react-hook-form";
import { PlacesOptions } from "./constants";

interface InquiryFormType {
  name: string;
  email: string;
  contact: number;
  places: string[];
  whenToVisit: string;
}

const Inquiry: NextPage = () => {
  const { register, handleSubmit } = useForm<InquiryFormType>({
    defaultValues: {
      name: "",
      email: "",
      contact: 0,
      places: [],
      whenToVisit: "",
    },
  });

  const onSubmit = (data: InquiryFormType) => {
    console.log(data);
  };
  return (
    <div>
      <header className="text-center py-6">
        <h1>Inquiry Page</h1>
      </header>
      <div className="flex justify-end">
        <div className="w-1/2">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="pb-4">
              <input
                type="text"
                className="border rounded p-1 text-sm"
                {...register("name")}
              />
            </div>
            <div className="pb-4">
              <input
                type="email"
                className="border rounded p-1 text-sm"
                {...register("email")}
              />
            </div>
            <div className="pb-4">
              <input
                type="number"
                className="border rounded p-1 text-sm"
                {...register("contact")}
              />
            </div>
            <div className="pb-4">
              <select
                placeholder="Select places"
                className="border rounded p-1 text-sm"
                {...register("places")}
                multiple
              >
                {PlacesOptions.map((option, index) => (
                  <option
                    key={`place-option-${index}`}
                    value={option}
                    className="p-1 text-sm"
                  >
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div className="pb-4">
              <input
                className="border rounded p-1 text-sm"
                {...register("whenToVisit")}
              />
            </div>
            <div className="flex gap-2 items-center">
              <button type="submit">Submit</button>
              <button type="reset">Reset</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Inquiry;
