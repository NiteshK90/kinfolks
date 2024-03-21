import { NextPage } from "next";
import { PageWrapper } from "../../../components/admin/common/PageWrapper";
import { useForm } from "react-hook-form";
import { Input } from "../../../components/common/form-elements/Input";
import { Button } from "../../../components/common/form-elements/Button";
import { ButtonTypes } from "../../../components/common/form-elements/types";
import { useChangePassword } from "../../../hooks/settings.hooks";
import { useNotification } from "../../../providers/common/NotificationProvider";
import { NotificationType } from "../../../components/common/notification/Notification";
import { AxiosError } from "axios";

interface FormState {
  oldPassword: string;
  newPassword: string;
  rePassword: string;
}

const Settings: NextPage = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isDirty, isValid, isLoading, errors },
  } = useForm<FormState>({
    mode: "all",
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      rePassword: "",
    },
  });

  const { addNotification } = useNotification();

  const { mutate: changePassword } = useChangePassword();

  const onSubmit = (data: FormState) => {
    changePassword(
      {
        email: "nnkhatate@gmail.com",
        password: data.newPassword,
      },
      {
        onSuccess: () => {
          addNotification({
            content: "Password is changed successfully",
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
      }
    );
  };

  return (
    <PageWrapper title="Settings">
      <div className="p-10">
        <h2>Settings</h2>
        <div className="mt-5 p-5 border">
          <h3>Change Password</h3>
          <form
            onSubmit={handleSubmit(onSubmit)}
            onReset={() => reset()}
            className="flex flex-col py-5 w-1/4"
          >
            <div className="pb-10">
              <Input
                name="oldPassword"
                type="password"
                placeholder="Old Password"
                register={register("oldPassword")}
                error={errors?.oldPassword?.message}
              />
            </div>
            <div className="pb-10">
              <Input
                name="newPassword"
                type="password"
                placeholder="New Password"
                register={register("newPassword")}
                error={errors?.newPassword?.message}
              />
            </div>
            <div className="pb-10">
              <Input
                name="rePassword"
                type="password"
                placeholder="Retype Password"
                register={register("rePassword")}
                error={errors?.oldPassword?.message}
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
    </PageWrapper>
  );
};

export default Settings;
