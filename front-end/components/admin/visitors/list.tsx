import { AxiosError } from "axios";
import {
  useGetVisitors,
  useUpdateVisitorValidity,
} from "../../../hooks/visitors.hooks";
import { useNotification } from "../../../providers/common/NotificationProvider";
import { Visitor } from "../../../services/visitors.service/types";
import { NotificationType } from "../../common/notification/Notification";

export const List = () => {
  const { data, isLoading, isError } = useGetVisitors();
  const { addNotification } = useNotification();
  const { mutate: updateVisitorValidity, isLoading: isValidationLoading } =
    useUpdateVisitorValidity();

  const handleChange = (item: Visitor, checked: boolean) => {
    updateVisitorValidity(
      {
        id: item.id,
        values: {
          isValidUser: checked,
        },
      },
      {
        onSuccess: (res) => {
          addNotification({
            content: "Visitor's validity updated",
            type: NotificationType.Success,
          });
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
  if (isLoading) {
    return (
      <div className="text-center ">
        <h3>Data is loading</h3>
      </div>
    );
  }
  if (isError) {
    return (
      <div className="text-center p-4">
        <h3>Error occurred</h3>
      </div>
    );
  }
  return (
    <div>
      <div className="p-4">
        <h3>Below is list of visitors</h3>
      </div>
      <div className="m-4 border border-b-0">
        <div className="grid grid-cols-6 border-b font-semibold">
          <div className="p-2">Sr.</div>
          <div className="p-2">Name</div>
          <div className="p-2">Mobile</div>
          <div className="p-2">Email</div>
          <div className="p-2">When to visit</div>
          <div className="p-2">Action</div>
        </div>
        <div className="overflow-auto">
          {data.map((item, index) => (
            <div
              key={`visitor-row-${index}`}
              className="grid grid-cols-6 border-b"
            >
              <div className="p-2">{index + 1}</div>
              <div className="p-2">{item.name}</div>
              <div className="p-2">{item.mobile}</div>
              <div className="p-2">{item.email}</div>
              <div className="p-2">{item.whenToVisit}</div>
              <div className="p-2">
                <input
                  type="checkbox"
                  checked={!!item.isValidVisitor}
                  onChange={(event) => handleChange(item, event.target.checked)}
                  disabled={isValidationLoading}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
