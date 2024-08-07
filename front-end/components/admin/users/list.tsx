import { AxiosError } from "axios";
import { useDeleteUser, useGetUsers } from "@hooks/users.hooks";
import { useNotification } from "@providers/common/NotificationProvider";
import { NotificationType } from "@common-components/notification/Notification";
import { Trash } from "phosphor-react";

export const List = () => {
  const { data, isLoading, isError, refetch } = useGetUsers();

  const { mutate: deleteUser } = useDeleteUser();

  const { addNotification } = useNotification();

  const handleDelete = (id: string) => {
    deleteUser(id, {
      onSuccess: () => {
        addNotification({
          content: "User deleted successfully",
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
      <div className="text-center p-4">
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
        <h3>Below is list of users</h3>
      </div>
      <div className="m-4 border border-b-0">
        <div className="grid grid-cols-5 border-b font-semibold">
          <div className="p-2">Sr.</div>
          <div className="p-2">Name</div>
          <div className="p-2">Mobile</div>
          <div className="p-2">Email</div>
          <div className="p-2">Action</div>
        </div>
        <div className="overflow-auto">
          {data.map((item, index) => (
            <div
              key={`visitor-row-${index}`}
              className="grid grid-cols-5 border-b"
            >
              <div className="p-2">{index + 1}</div>
              <div className="p-2">{item.name}</div>
              <div className="p-2">{item.mobile}</div>
              <div className="p-2">{item.email}</div>
              <div className="p-2">
                <div className="flex items-center gap-2">
                  <Trash
                    size={16}
                    onClick={() => handleDelete(item.id)}
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
