import { CheckCircle, Warning, WarningCircle } from "phosphor-react";
import React, { useMemo } from "react";

export enum NotificationType {
  Success = "success",
  Warning = "warning",
  Danger = "danger",
}

const getColors = (type: NotificationType) => {
  switch (type) {
    case NotificationType.Success:
      return {
        icon: <CheckCircle size={16} className="text-success-text" />,
        color: "text-success-text",
        bgColor: "bg-success-bg",
      };

    case NotificationType.Warning:
      return {
        icon: <WarningCircle size={16} className="text-warning-text" />,
        color: "text-warning-text",
        bgColor: "bg-warning-bg",
      };

    case NotificationType.Danger:
      return {
        icon: <Warning size={16} className="text-danger-text" />,
        color: "text-danger-text",
        bgColor: "bg-danger-bg",
      };

    default:
      return {
        color: "color-kinfolks-white",
        bgColor: "bg-kinfolks-blue",
      };
  }
};

interface PublicProps {
  content: string;
  type: NotificationType;
}
export const Notification: React.FC<PublicProps> = ({ content, type }) => {
  const colors = useMemo(() => getColors(type), [type]);
  return (
    <div
      className={`fixed bottom-5 right-5 p-4 rounded flex gap-2 items-center justify-between ${colors.bgColor}`}
    >
      {colors.icon}
      <div className={`text-sm ${colors.color}`}>{content}</div>
    </div>
  );
};
