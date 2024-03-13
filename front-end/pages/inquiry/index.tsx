import { NextPage } from "next";
import { Controller, useForm } from "react-hook-form";
import { useCreateVisitor } from "../../hooks/visitors.hooks";
import { Button } from "../../components/common/form-elements/Button";
import { ButtonTypes } from "../../components/common/form-elements/types";
import { Input } from "../../components/common/form-elements/Input";
import { useNotification } from "../../providers/common/NotificationProvider";
import { NotificationType } from "../../components/common/notification/Notification";
import Select from "react-select";
import { PlacesOptions } from "./constants";
import { CreateVisitorProps } from "./type";

const Inquiry: NextPage = () => {
  const { addNotification } = useNotification();
  const { mutate: createVisitor } = useCreateVisitor();
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { isDirty, isValid, errors },
  } = useForm<CreateVisitorProps>({
    mode: "all",
    defaultValues: {
      name: "",
      email: "",
      mobile: 0,
      places: [],
      whenToVisit: "",
    },
  });

  const onSubmit = async (data: CreateVisitorProps) => {
    const places = data.places?.map(({ value }) => value) || [];
    const newData = { ...data, places: places };
    await createVisitor(newData, {
      onSuccess: () => {
        addNotification({
          content: "Your details are stored successfully",
          type: NotificationType.Success,
        });
      },
      onError: (err: any) => {
        addNotification({
          content: err.message,
          type: NotificationType.Danger,
        });
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
                placeholder="Name"
                {...register("name", {
                  required: true,
                })}
              />
            </div>
            <div className="pb-10">
              <Input
                type="email"
                placeholder="Email"
                {...register("email", {
                  required: true,
                })}
              />
            </div>
            <div className="pb-10">
              <Input
                type="number"
                placeholder="Mobile Number"
                {...register("mobile", {
                  required: true,
                })}
              />
            </div>
            <div className="pb-10">
              <Controller
                control={control}
                render={({ field }) => (
                  <Select {...field} options={PlacesOptions} isMulti />
                )}
                name={"places"}
              />
            </div>
            <div className="pb-10">
              <Input
                type="text"
                placeholder="When to Visit"
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
