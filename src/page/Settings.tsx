import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Button } from "component/button/Button";
import { ProfileCard } from "component/card/ProfileCard";
import { TeamCard } from "component/card/TeamCard";
import { Tag } from "component/common/Tag";
import { PageLayout } from "component/layout/PageLayout";
import { CreateTagModal } from "component/modal/CreateTagModal";
import { CreateTeamModal } from "component/modal/CreateTeamModal";
import { DeleteTagModal } from "component/modal/DeleteTagModal";
import { IconType } from "constant/icons";
import { TAGS_QUERY_KEY, TEAMS_QUERY_KEY } from "constant/queries";
import { useTusksApi } from "hook/api";
import { useModal } from "hook/modal";
import { FC, useState } from "react";
import { ITag, Team } from "type";

export const Settings: FC = () => {
  const { fetchAllTags, fetchAllMyTeams } = useTusksApi();

  const [selectedTag, setSelectedTag] = useState<ITag>();

  const {
    isOpen: isDeleteTagModalOpen,
    onClose: onDeleteTagModalClose,
    onOpen: onDeleteTagModalOpen,
  } = useModal();

  const {
    isOpen: isCreateTagModalOpen,
    onClose: onCreateTagModalClose,
    onOpen: onCreateTagModalOpen,
  } = useModal();

  const {
    isOpen: isCreateTeamModalOpen,
    onClose: onCreateTeamModalClose,
    onOpen: onCreateTeamModalOpen,
  } = useModal();

  const {
    data: tags,
    isLoading: tagsLoading,
    error: tagsError,
  } = useQuery<Array<ITag>, AxiosError>([TAGS_QUERY_KEY], fetchAllTags);

  const {
    data: teams,
    isLoading: teamsLoading,
    error: teamsError,
  } = useQuery<Array<Team>, AxiosError>([TEAMS_QUERY_KEY], fetchAllMyTeams);

  return (
    <PageLayout>
      <div className="flex h-full w-full flex-col gap-8 overflow-auto p-4 md:flex-row">
        <div className="flex h-fit w-full min-w-fit items-center justify-center md:h-full md:w-1/3">
          <ProfileCard />
        </div>
        <div className="flex h-fit w-full flex-col gap-12 p-12 md:h-full">
          <div className="flex w-full flex-col gap-4">
            <div className="flex w-full flex-row items-center justify-between">
              <div className="text-2xl font-bold">Tags</div>
              <Button
                icon="add"
                hoverIcon="tag"
                className="w-fit text-xs md:mr-44"
                onClick={() => {
                  onCreateTagModalOpen();
                }}
              >
                new tag
              </Button>
            </div>
            {tagsLoading && <div>tags are loading...</div>}
            {tagsError && <div>Error while loading tags!</div>}
            {tags && tags?.length > 0 ? (
              <div className="flex flex-row flex-wrap gap-2">
                {tags.map((tag, index) => (
                  <Tag
                    color={tag.color}
                    id={tag.id}
                    label={tag.label}
                    onDelete={() => {
                      setSelectedTag(tag);
                      onDeleteTagModalOpen();
                    }}
                    owner={tag.owner}
                    key={index}
                  />
                ))}
              </div>
            ) : (
              <div>no tags </div>
            )}
          </div>
          <div className="flex w-full flex-col gap-4">
            <div className="flex w-full flex-row items-center justify-between">
              <div className="text-2xl font-bold">Teams</div>
              <Button
                icon="add"
                hoverIcon="people-group"
                className="w-fit gap-3 text-xs md:mr-44"
                onClick={() => {
                  onCreateTeamModalOpen();
                }}
              >
                new team
              </Button>
            </div>
            {teamsLoading && <div>your teams are loading...</div>}
            {teamsError && <div>Error while loading teams!</div>}
            <div>
              {teams && teams?.length > 0 ? (
                <div className="flex flex-row flex-wrap items-start gap-2">
                  {teams.map((team, index) => (
                    <TeamCard
                      key={index}
                      name={team.name}
                      description={team.description}
                      color={team.color}
                      icon={team.icon as IconType}
                      members={team.members}
                    />
                  ))}
                </div>
              ) : (
                <div>no teams you are member of found!</div>
              )}
            </div>
          </div>
        </div>
      </div>
      {selectedTag && (
        <DeleteTagModal
          isOpen={isDeleteTagModalOpen}
          onClose={onDeleteTagModalClose}
          tag={selectedTag}
        />
      )}
      {isCreateTagModalOpen && (
        <CreateTagModal
          isOpen={isCreateTagModalOpen}
          onClose={onCreateTagModalClose}
        />
      )}
      {isCreateTeamModalOpen && (
        <CreateTeamModal
          isOpen={isCreateTeamModalOpen}
          onClose={onCreateTeamModalClose}
        />
      )}
    </PageLayout>
  );
};
