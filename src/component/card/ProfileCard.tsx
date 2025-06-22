import { Button } from "component/button/Button";
import { Card } from "component/common/Card";
import { ProfileDeactivateModal } from "component/modal/ProfileDeactivateModal";
import { AVATAR_IMG } from "constant/assets";
import { useModal } from "hook/modal";
import { useUserProfile } from "provider/UserProfileProvider";
import { FC } from "react";
import { motion } from "motion/react";

export const ProfileCard: FC = () => {
  const { profile } = useUserProfile();
  const { isOpen, onClose, onOpen } = useModal();

  if (!profile) return <Card>Unknown user profile!</Card>;
  return (
    <>
      <Card>
        <div className="flex w-fit flex-col items-center justify-center gap-0 px-12 py-8">
          <div className="text-3xl font-bold">
            {profile.firstName} {profile.lastName}
          </div>
          <div className="opacity-60">{profile.email}</div>
          <div>
            <motion.img
              whileHover={{ rotate: 2, borderRadius: 100 }}
              src={profile.picture ?? AVATAR_IMG}
              alt="profile picture"
              className="my-6 aspect-square w-[200px] object-cover shadow-2xl"
              style={{ borderRadius: 10 }}
            />
          </div>
          <div className="flex flex-row gap-2">
            <Button
              icon="lock"
              hoverIcon="user-lock"
              variant="error"
              className="gap-3"
              onClick={onOpen}
            >
              deactivate
            </Button>
          </div>
        </div>
      </Card>
      <ProfileDeactivateModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};
