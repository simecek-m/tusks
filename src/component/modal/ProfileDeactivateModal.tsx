import { useAuth0 } from "@auth0/auth0-react";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Button } from "component/button/Button";
import { Modal } from "component/common/Modal";
import { useTusksApi } from "hook/api";
import { useToast } from "provider/ToastProvider";
import { FC } from "react";
import { IProfile, ModalState } from "type";

export const ProfileDeactivateModal: FC<ModalState> = ({ isOpen, onClose }) => {
  const { toast } = useToast();
  const { deactivateProfile } = useTusksApi();
  const { logout } = useAuth0();

  const { mutateAsync, isPending } = useMutation<IProfile, AxiosError>({
    mutationFn: deactivateProfile,
  });
  const deactivate = (): Promise<IProfile> => {
    return mutateAsync(undefined, {
      onSuccess: () => {
        logout({ logoutParams: { returnTo: window.location.origin } });
      },
      onError: (error) => {
        toast({
          icon: "warning",
          title: "Hooops",
          description: `${error?.response?.status ?? error.message}`,
        });
      },
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="text-2xl font-black text-red-600 dark:text-red-400">
        Deactivate
      </div>
      <div className="mt-2">
        Are you sure you want to deactivate your account? You will permanently
        lose all your data!
      </div>
      <div className="mt-4 flex w-full justify-end">
        <Button
          icon="user-slash"
          hoverIcon="check"
          variant="error"
          onClick={deactivate}
          isSubmitting={isPending}
        >
          Confirm
        </Button>
      </div>
    </Modal>
  );
};
