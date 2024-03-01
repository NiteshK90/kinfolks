import { NextPage } from "next";
import { useForm } from "react-hook-form";
import { PlacesOptions } from "./constants";
import { useCreateVisitor } from "../../hooks/visitors.hooks";
import { Visitor } from "../../services/visitors.service/types";
import { Button } from "../../components/common/form-elements/Button";
import { ButtonTypes } from "../../components/common/form-elements/types";
import { Input } from "../../components/common/form-elements/Input";
import { Select } from "../../components/common/form-elements/Select";

const Inquiry: NextPage = () => {
  const { mutate: createVisitor } = useCreateVisitor();
  const {
    register,
    handleSubmit,
    reset,
    formState: { isDirty, isValid, isLoading },
  } = useForm<Visitor>({
    mode: "all",
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
        <div className="w-1/4 px-5">
          <form onSubmit={handleSubmit(onSubmit)} onReset={() => reset()}>
            <div className="pb-10">
              <Input
                type="text"
                {...register("name", {
                  required: true,
                })}
              />
            </div>
            <div className="pb-10">
              <Input
                type="email"
                {...register("email", {
                  required: true,
                })}
              />
            </div>
            <div className="pb-10">
              <Input
                type="number"
                {...register("mobile", {
                  required: true,
                })}
              />
            </div>
            <div className="pb-10">
              <Select
                placeholder="Select places"
                options={PlacesOptions || []}
                register={register("places", {
                  required: true,
                })}
                multiple
              />
            </div>
            <div className="pb-10">
              <Input
                type="text"
                {...register("whenToVisit", {
                  required: true,
                })}
              />
            </div>
            <div className="flex gap-2 justify-between items-center">
              <Button
                type={ButtonTypes.Submit}
                buttonText="Submit"
                disabled={!isDirty || !isValid}
              />
              <Button
                type={ButtonTypes.Reset}
                buttonText="Reset"
                disabled={!isDirty}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Inquiry;
