import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import Heading from "component/common/Heading";
import Tag from "component/common/Tag";
import PageContent from "component/layout/PageContent";
import PageLayout from "component/layout/PageLayout";
import { CreateTagModal } from "component/modal/CreateTagModal";
import { TAGS_QUERY_KEY } from "constant/queries";
import useTusksApi from "hook/api";
import { useModal } from "hook/modal";
import { useToast } from "provider/ToastProvider";
import { FC } from "react";
import { ITag } from "type";

const Tags: FC = () => {
  const { fetchAllTags, deleteTag } = useTusksApi();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery([TAGS_QUERY_KEY], fetchAllTags);
  const { isOpen, onClose, onOpen } = useModal();

  const { mutateAsync: deleteAsync } = useMutation<ITag, AxiosError, string>(
    (id: string) => deleteTag(id)
  );

  const onDelete = (id: string) => {
    deleteAsync(id, {
      onSuccess: () => {
        queryClient.setQueryData<ITag[]>([TAGS_QUERY_KEY], (original) => {
          if (original) {
            const tags = original.filter((tag) => tag.id !== id);
            return [...tags];
          } else {
            return [];
          }
        });
      },
      onError: (error) => {
        toast({
          icon: "warning",
          title: "Tag",
          description: error.message,
        });
      },
    });
  };

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
              onOpen();
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
              onClickIcon={(id) => onDelete(id)}
            />
          ))}
          {data?.length === 0 && <div>You have no tags, yet.</div>}
        </div>
      </PageContent>
      <CreateTagModal isOpen={isOpen} onClose={onClose} />
    </PageLayout>
  );
};

export default Tags;
