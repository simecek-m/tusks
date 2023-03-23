import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import { FC } from "react";

export type ToastType = "info" | "success" | "warning" | "error";

interface ToastProps {
  title: string;
  icon: IconProp;
  type?: ToastType;
  description?: string;
}

const TypeVariant: Record<ToastType, string> = {
  success: "text-green-500 dark:text-green-400",
  info: "text-blue-500 dark:text-blue-400",
  warning: "text-orange-400",
  error: "text-red-500 dark:text-red-400",
};

const Toast: FC<ToastProps> = ({
  icon,
  title,
  description,
  type = "error",
}) => {
  return (
    <div className="flex w-fit flex-row gap-2 rounded-xl bg-white px-4 py-2 shadow-md dark:bg-slate-900">
      <span className={clsx("flex items-center", TypeVariant[type])}>
        <FontAwesomeIcon icon={icon} />
      </span>
      <div className="flex flex-col">
        <span>{title}</span>
        <span className="text-base">{description}</span>
      </div>
    </div>
  );
};

export default Toast;
