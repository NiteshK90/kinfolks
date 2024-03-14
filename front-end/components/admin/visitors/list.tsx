import { AxiosError } from "axios";
import {
  useDeleteVisitor,
  useGetVisitors,
  useUpdateVisitorValidity,
} from "../../../hooks/visitors.hooks";
import { useNotification } from "../../../providers/common/NotificationProvider";
import { Visitor } from "../../../services/visitors.service/types";
import { NotificationType } from "../../common/notification/Notification";
import { Trash } from "phosphor-react";

export const List = () => {
  const { data, isLoading, isError, refetch } = useGetVisitors();
  const { addNotification } = useNotification();
  const { mutate: updateVisitorValidity, isLoading: isValidationLoading } =
    useUpdateVisitorValidity();
  const { mutate: deleteVisitor } = useDeleteVisitor();

  const handleChange = (item: Visitor, checked: boolean) => {
    updateVisitorValidity(
      {
        id: item._id,
        values: {
          isValidVisitor: checked,
        },
      },
      {
        onSuccess: (res) => {
          addNotification({
            content: "Visitor's validity updated",
            type: NotificationType.Success,
          });
          refetch();
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

  const handleDelete = (id: string) => {
    deleteVisitor(id, {
      onSuccess: () => {
        addNotification({
          content: "Visitor deleted successfully",
          type: NotificationType.Success,
        });
        refetch();
      },
      onError: (err: AxiosError<{ message: string }>) => {
        addNotification({
          content: err.response.data.message,
          type: NotificationType.Danger,
        });
      },
    });
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
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={!!item.isValidVisitor}
                    onChange={(event) =>
                      handleChange(item, event.target.checked)
                    }
                    disabled={isValidationLoading}
                  />
                  <Trash
                    size={16}
                    onClick={() => handleDelete(item._id)}
                    className="cursor-pointer"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
