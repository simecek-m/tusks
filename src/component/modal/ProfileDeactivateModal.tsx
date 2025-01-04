import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Button } from "component/button/Button";
import { Modal } from "component/common/Modal";
import { HOME_PATH } from "constant/paths";
import { PROFILES_ME_QUERY_KEY } from "constant/queries";
import { useTusksApi } from "hook/api";
import { useToast } from "provider/ToastProvider";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { IProfile, ModalState } from "type";

export const ProfileDeactivateModal: FC<ModalState> = ({ isOpen, onClose }) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { deactivateProfile } = useTusksApi();
  const client = useQueryClient();

  const { mutateAsync, isLoading } = useMutation<IProfile, AxiosError>(
    [PROFILES_ME_QUERY_KEY],
    deactivateProfile
  );
  const deactivate = (): Promise<IProfile> => {
    return mutateAsync(undefined, {
      onSuccess: () => {
        client.removeQueries([PROFILES_ME_QUERY_KEY]);
        navigate(HOME_PATH);
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
          isSubmitting={isLoading}
        >
          Confirm
        </Button>
      </div>
    </Modal>
  );
};
