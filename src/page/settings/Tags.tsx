import { useQuery } from "@tanstack/react-query";
import Heading from "component/common/Heading";
import Tag from "component/common/Tag";
import PageContent from "component/layout/PageContent";
import PageLayout from "component/layout/PageLayout";
import { CreateTagModal } from "component/modal/CreateTagModal";
import { DeleteTagModal } from "component/modal/DeleteTagModal";
import { TAGS_QUERY_KEY } from "constant/queries";
import useTusksApi from "hook/api";
import { useModal } from "hook/modal";
import { FC, useState } from "react";
import { ITag } from "type";

const Tags: FC = () => {
  const { fetchAllTags } = useTusksApi();
  const { data, isLoading } = useQuery([TAGS_QUERY_KEY], fetchAllTags);
  const {
    isOpen: isCreateOpen,
    onClose: onCreateClose,
    onOpen: onCreateOpen,
  } = useModal();
  const {
    isOpen: isDeleteOpen,
    onClose: onDeleteClose,
    onOpen: onDeleteOpen,
  } = useModal();
  const [tag, setTag] = useState<ITag>();

  if (isLoading) return <div>loading</div>;

  return (
    <PageLayout>
      <PageContent>
        <Heading text="Tags" description="tags you can use across this app" />
        <div className="mt-8">
          <button
            className="rounded-full bg-primary-600 bg-opacity-20 px-3 py-2 text-primary-800 dark:bg-primary-200 dark:bg-opacity-10 dark:text-primary-300"
            onClick={(e) => {
              e.stopPropagation();
              onCreateOpen();
            }}
          >
            new tag
          </button>
        </div>
        <div className="mt-6 flex flex-col gap-2">
          {data?.map((tag) => (
            <Tag
              key={tag.id}
              id={tag.id}
              label={tag.label}
              color={tag.color}
              owner={tag.owner}
              onDelete={(tag) => {
                setTag(tag);
                onDeleteOpen();
              }}
            />
          ))}
          {data?.length === 0 && <div>You have no tags, yet.</div>}
        </div>
      </PageContent>
      <CreateTagModal isOpen={isCreateOpen} onClose={onCreateClose} />
      {tag && (
        <DeleteTagModal
          isOpen={isDeleteOpen}
          onClose={onDeleteClose}
          tag={tag}
        />
      )}
    </PageLayout>
  );
};

export default Tags;
