// NewLocationForm.tsx with Tailwind CSS
import React from "react";
import { useForm, useFieldArray, SubmitHandler } from "react-hook-form";
import { Locations } from "@services/locations.service/types";
import { Input } from "@common-components/form-elements/Input";
import { Button } from "@common-components/form-elements/Button";
import { ButtonTypes } from "@common-components/form-elements/types";
import { useCreateLocationWithPlaces } from "@hooks/locations.hooks";
import { useNotification } from "@providers/common/NotificationProvider";
import { NotificationType } from "@common-components/notification/Notification";
import { AxiosError } from "axios";

export const NewLocationForm: React.FC = () => {
  const { mutate: createLocation, isLoading } = useCreateLocationWithPlaces();
  const { addNotification } = useNotification();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Locations>({
    defaultValues: {
      places: [
        {
          name: "",
          timeToVisit: "",
          description: "",
          locationId: "",
          createdAt: new Date().toISOString(),
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "places",
  });

  const onSubmit = (data) => {
    console.log(data);
    createLocation(data, {
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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Input
          name={"name"}
          label="Name"
          type="text"
          placeholder="Enter name"
          register={register("name", { required: true })}
        />
      </div>

      <div>
        <Input
          name={"bestTime"}
          label="Best Time"
          type="text"
          placeholder="Enter best time to visit"
          register={register("bestTime", { required: true })}
        />
      </div>

      {fields.map((field, index) => (
        <div key={field.id} className="space-y-2">
          <Input
            name={`places.${index}.name`}
            label="Place Name"
            type="text"
            placeholder="Enter name"
            register={register(`places.${index}.name` as const, {
              required: true,
            })}
          />
          <Input
            name={`places.${index}.timeToVisit`}
            label="Time to Visit"
            type="text"
            placeholder="Enter time to visit"
            register={register(`places.${index}.timeToVisit` as const, {
              required: true,
            })}
          />
          <Input
            name={`places.${index}.description`}
            label="Description"
            type="text"
            placeholder="Enter description"
            register={register(`places.${index}.description` as const, {
              required: true,
            })}
          />
          <Button
            type={ButtonTypes.Button}
            onClick={() => remove(index)}
            buttonText="Remove"
          />
        </div>
      ))}
      <div className="flex justify-between items-center">
        <Button
          type={ButtonTypes.Button}
          onClick={() =>
            append({
              name: "",
              timeToVisit: "",
              description: "",
              locationId: "",
              createdAt: new Date().toISOString(),
            })
          }
          buttonText="Add Place"
        />
        <Button
          type={ButtonTypes.Submit}
          buttonText="Create"
          disabled={isLoading}
        />
      </div>
    </form>
  );
};
