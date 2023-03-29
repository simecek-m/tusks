import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import Button from "component/button/Button";
import Heading from "component/common/Heading";
import PageContent from "component/layout/PageContent";
import PageLayout from "component/layout/PageLayout";
import Modal from "component/modal/Modal";
import { HOME_PATH } from "constant/paths";
import { PROFILES_ME_QUERY_KEY } from "constant/queries";
import useTusksApi from "hook/api";
import { useModal } from "hook/modal";
import { useToast } from "provider/ToastProvider";
import { useUserProfile } from "provider/UserProfileProvider";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { IProfile } from "type";

const Profile: FC = () => {
  const { toast } = useToast();
  const { profile } = useUserProfile();
  const { isOpen, onClose, onOpen } = useModal();
  const { deactivateProfile } = useTusksApi();
  const navigate = useNavigate();
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
    <PageLayout>
      <PageContent>
        <div className="flex flex-col gap-5">
          <Heading
            text="Profile"
            description="information about currently logged in user"
          />
          <img
            src={profile?.picture}
            className="rounded-squircle"
            width="200"
            height="200"
          />
          <div className="grid w-fit flex-col gap-3 md:gap-2">
            <div className="flex flex-col md:flex-row">
              <span className="w-52">username</span>
              <span className="text-lg font-bold">{profile?.username}</span>
            </div>
            <div className="flex flex-col md:flex-row">
              <span className="w-52">first name</span>
              <span className="text-lg font-bold">{profile?.firstName}</span>
            </div>
            <div className="flex flex-col md:flex-row">
              <span className="w-52">last name</span>
              <span className="text-lg font-bold">{profile?.lastName}</span>
            </div>
            <div className="flex flex-col md:flex-row">
              <span className="w-52">e-mail</span>
              <span className="text-lg font-bold">{profile?.email}</span>
            </div>
          </div>
          <Button
            icon="user"
            hoverIcon="user-slash"
            variant="error"
            onClick={onOpen}
          >
            Deactivate
          </Button>
          <Modal isOpen={isOpen} onClose={onClose}>
            <div className="text-2xl font-black text-red-600 dark:text-red-400">
              Deactivate
            </div>
            <div className="mt-2">
              Are you sure you want to deactivate your account? You will
              permanently lose all your data!
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
        </div>
      </PageContent>
    </PageLayout>
  );
};

export default Profile;
