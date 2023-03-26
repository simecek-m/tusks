import { IconProp } from "@fortawesome/fontawesome-svg-core";
import Toast from "component/toast/Toast";
import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useState,
} from "react";

export type ToastType = "info" | "success" | "warning" | "error";

type IToast = {
  title: string;
  icon: IconProp;
  type?: ToastType;
  description?: string;
  duration?: number;
};

type IToastWithId = IToast & {
  id: number;
};

interface IToastContext {
  toast: (toast: IToast) => void;
}

interface IToastConfig {
  duration: number;
}

const DEFAULT_TOAST_CONFIG: IToastConfig = {
  duration: 5000,
};

const ToastContext = createContext<IToastContext>({ toast: () => null });

export const useToast = () => {
  return useContext(ToastContext);
};

interface ToastProviderProp extends PropsWithChildren {
  config?: IToastConfig;
}

const ToastProvider: FC<ToastProviderProp> = ({
  children,
  config = DEFAULT_TOAST_CONFIG,
}) => {
  const [toasts, setToasts] = useState<IToastWithId[]>([]);

  const toast = (toast: IToast) => {
    const id = Date.now();
    setToasts([...toasts, { ...toast, id }]);
    setTimeout(() => {
      setToasts((state) => state.filter((toast) => toast.id !== id));
    }, toast.duration ?? config.duration);
  };

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className="absolute bottom-3 right-3 flex flex-col items-end gap-1">
        {toasts.map(({ icon, title, description, type }, key) => (
          <Toast
            type={type}
            icon={icon}
            title={title}
            description={description}
            key={key}
          />
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export default ToastProvider;
