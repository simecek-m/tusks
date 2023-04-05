import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import Button from "component/button/Button";
import Heading from "component/common/Heading";
import Tag from "component/common/Tag";
import ColorInput from "component/form/ColorInput";
import Input from "component/form/Input";
import PageContent from "component/layout/PageContent";
import PageLayout from "component/layout/PageLayout";
import Modal from "component/modal/Modal";
import { TAGS_QUERY_KEY } from "constant/queries";
import useTusksApi from "hook/api";
import { useModal } from "hook/modal";
import { useToast } from "provider/ToastProvider";
import { FC } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { INewTag, ITag } from "type";

const Tags: FC = () => {
  const { fetchAllTags, createNewTag, deleteTag } = useTusksApi();
  const { data, isLoading } = useQuery([TAGS_QUERY_KEY], fetchAllTags);
  const { isOpen, onClose, onOpen } = useModal();
  const methods = useForm<INewTag>();
  const { toast } = useToast();
  const { handleSubmit, register, reset } = methods;
  const queryClient = useQueryClient();

  const { mutateAsync: updateAsync, isLoading: isUpdating } = useMutation<
    ITag,
    AxiosError,
    INewTag
  >((tag: INewTag) => createNewTag(tag));

  const { mutateAsync: deleteAsync } = useMutation<ITag, AxiosError, string>(
    (id: string) => deleteTag(id)
  );

  const submit = async (tag: INewTag) => {
    await updateAsync(tag, {
      onSuccess: (data: ITag) => {
        queryClient.setQueryData<ITag[]>([TAGS_QUERY_KEY], (original) => {
          if (original) {
            return [...original, data];
          } else {
            return [data];
          }
        });
        onClose();
      },
      onError: (error) => {
        toast({
          icon: "warning",
          title: "Hooops",
          description: error.message,
        });
      },
    });
  };

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
              reset();
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
      <Modal isOpen={isOpen} onClose={onClose}>
        <h1 className="text-lg font-black">Tag</h1>
        <FormProvider {...methods}>
          <form
            onSubmit={handleSubmit(submit)}
            className="mt-4 flex flex-col gap-2"
          >
            <Input label="label" {...register("label")} />
            <span>color</span>
            <div className="ml-5 flex flex-row gap-3">
              <ColorInput label="light" name="color.light" />
              <ColorInput label="dark" name="color.dark" />
            </div>
            <div className="flex w-full justify-end">
              <Button
                icon="tag"
                hoverIcon="paper-plane"
                type="submit"
                isSubmitting={isUpdating}
              >
                submit
              </Button>
            </div>
          </form>
        </FormProvider>
      </Modal>
    </PageLayout>
  );
};

export default Tags;
