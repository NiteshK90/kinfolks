import { NextPage } from "next";
import { useForm } from "react-hook-form";
import { LoginType } from "../../../services/settings.service/types";
import { Input } from "../../../components/common/form-elements/Input";
import { Button } from "../../../components/common/form-elements/Button";
import { ButtonTypes } from "../../../components/common/form-elements/types";

const Login: NextPage = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isDirty, isValid, isLoading, errors },
  } = useForm<LoginType>({
    mode: "all",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = () => {};
  return (
    <div>
      <form onSubmit={() => handleSubmit(onSubmit)} onReset={() => reset()}>
        <div className="pb-10">
          <Input
            name="email"
            type="email"
            placeholder="Email"
            register={register("email", {
              required: "Email should not be empty",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email format",
              },
            })}
            error={errors?.email?.message}
          />
        </div>
        <div className="pb-10">
          <Input
            name="password"
            type="password"
            placeholder="Password"
            register={register("password", {
              required: "Password should not be empty",
            })}
            error={errors?.email?.message}
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
  );
};

export default Login;
