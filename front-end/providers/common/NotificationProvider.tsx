import React, { Children, createContext, useContext, useState } from "react";
import {
  Notification,
  NotificationType,
} from "@components/common/notification/Notification";

export interface Notification {
  content: string;
  type: NotificationType;
}
export interface NotificationContextType {
  notification: Notification | null;
  addNotification: (notif: Notification | null) => void;
}

export const NotificationContext = createContext<NotificationContextType>({
  notification: null,
  addNotification: () => {},
});

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error(
      "useNotification must be used within a NotificationProvider"
    );
  }
  return context;
};

type Props = {
  children: React.ReactNode;
};

export const NotificationProvider: React.FC<Props> = ({ children }) => {
  const [notification, setNotification] = useState<Notification | null>();

  const addNotification = (notif: Notification | null) => {
    setNotification(notif);
    setTimeout(() => setNotification(null), 5000);
  };
  return (
    <NotificationContext.Provider value={{ notification, addNotification }}>
      {children}
      {notification && <Notification {...notification} />}
    </NotificationContext.Provider>
  );
};
