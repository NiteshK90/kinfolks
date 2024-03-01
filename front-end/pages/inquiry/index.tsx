import { NextPage } from "next";
import { useForm } from "react-hook-form";
import { PlacesOptions } from "./constants";
import { useCreateVisitor } from "../../hooks/visitors.hooks";
import { Visitor } from "../../services/visitors.service/types";

const Inquiry: NextPage = () => {
  const { mutate: createVisitor } = useCreateVisitor();
  const { register, handleSubmit, reset } = useForm<Visitor>({
    defaultValues: {
      name: "",
      email: "",
      mobile: 0,
      places: [],
      whenToVisit: "",
    },
  });

  const onSubmit = async (data: Visitor) => {
    await createVisitor(data, {
      onSuccess: () => {
        console.log("Your details are stored successfully");
      },
      onError: (err) => {
        console.log(err);
      },
    });
    reset();
  };
  return (
    <div>
      <header className="text-center py-6">
        <h1>Inquiry Page</h1>
      </header>
      <div className="flex justify-end">
        <div className="w-1/2">
          <form onSubmit={handleSubmit(onSubmit)} onReset={() => reset()}>
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
                {...register("mobile")}
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
