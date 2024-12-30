import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Button } from "component/button/Button";
import { ProfileCard } from "component/card/ProfileCard";
import { Tag } from "component/common/Tag";
import { PageLayout } from "component/layout/PageLayout";
import { CreateTagModal } from "component/modal/CreateTagModal";
import { DeleteTagModal } from "component/modal/DeleteTagModal";
import { TAGS_QUERY_KEY } from "constant/queries";
import { useTusksApi } from "hook/api";
import { useModal } from "hook/modal";
import { FC, useState } from "react";
import { ITag } from "type";

export const Settings: FC = () => {
  const { fetchAllTags } = useTusksApi();

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
    data: tags,
    isLoading,
    error,
  } = useQuery<Array<ITag>, AxiosError>([TAGS_QUERY_KEY], fetchAllTags);

  return (
    <PageLayout>
      <div className="flex h-full w-full flex-col gap-8 overflow-auto p-4 md:flex-row md:overflow-hidden">
        <div className="flex h-fit w-full min-w-fit items-center justify-center md:h-full md:w-1/3">
          <ProfileCard />
        </div>
        <div className="flex h-fit w-full flex-col gap-4 p-12 md:h-full">
          <div className="flex w-full flex-col gap-4">
            <div className="text-xl font-bold">Tags</div>
            <Button
              icon="add"
              hoverIcon="tag"
              className="w-fit"
              onClick={() => {
                onCreateTagModalOpen();
              }}
            >
              add tag
            </Button>
            {isLoading && <div>tags are loading...</div>}
            {error && <div>Error while loading tags!</div>}
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
    </PageLayout>
  );
};
