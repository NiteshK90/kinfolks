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
import { AxiosError } from "axios";

const Inquiry: NextPage = () => {
  const { addNotification } = useNotification();
  const { mutate: createVisitor } = useCreateVisitor();
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { isDirty, isValid, isLoading, errors },
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
    createVisitor(newData, {
      onSuccess: () => {
        addNotification({
          content: "Your details are stored successfully",
          type: NotificationType.Success,
        });
        reset();
      },
      onError: (err: AxiosError<{ message: string }>) => {
        addNotification({
          content: err.response.data.message,
          type: NotificationType.Danger,
        });
      },
    });
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
                name="name"
                type="text"
                placeholder="Name"
                register={register("name", {
                  required: "Name should not be empty",
                })}
              />
            </div>
            <div className="pb-10">
              <Input
                name="email"
                type="email"
                placeholder="Email"
                register={register("email", {
                  required: "Email should not be empty",
                })}
              />
            </div>
            <div className="pb-10">
              <Input
                name="mobile"
                type="number"
                placeholder="Mobile Number"
                register={register("mobile", {
                  required: "Mobile number is required",
                })}
              />
            </div>
            <div className="pb-10">
              <Controller
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={PlacesOptions}
                    onChange={(val) => field.onChange(val)}
                    value={field.value}
                    isMulti
                  />
                )}
                name={"places"}
                rules={{ required: true }}
              />
            </div>
            <div className="pb-10">
              <Input
                name="whenToVisit"
                type="text"
                placeholder="When to Visit"
                register={register("whenToVisit", {
                  required: "This field is required",
                })}
              />
            </div>
            <div className="flex gap-2 justify-between items-center">
              <Button
                type={ButtonTypes.Submit}
                buttonText="Submit"
                disabled={!isDirty || !isValid || isLoading}
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
