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
};

type IToastWithId = IToast & {
  id: number;
};

interface IToastContext {
  toast: (toast: IToast) => void;
}

const ToastContext = createContext<IToastContext>({ toast: () => null });

export const useToast = () => {
  return useContext(ToastContext);
};

const ToastProvider: FC<PropsWithChildren> = ({ children }) => {
  const [toasts, setToasts] = useState<IToastWithId[]>([]);

  const toast = (toast: IToast) => {
    const id = Date.now();
    setToasts([...toasts, { ...toast, id }]);
    setTimeout(() => {
      setToasts((state) => state.filter((toast) => toast.id !== id));
    }, 5000);
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
