import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import Button from "component/button/Button";
import { Modal } from "component/common/Modal";
import { TAGS_QUERY_KEY } from "constant/queries";
import useTusksApi from "hook/api";
import { useTheme } from "provider/ThemeProvider";
import { useToast } from "provider/ToastProvider";
import { ITag, ModalState } from "type";

interface DeleteTagModalProps extends ModalState {
  tag: ITag;
}

export const DeleteTagModal = ({
  isOpen,
  onClose,
  tag,
}: DeleteTagModalProps) => {
  const { deleteTag } = useTusksApi();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { mutateAsync: deleteAsync, isLoading } = useMutation<
    ITag,
    AxiosError,
    string
  >((id: string) => deleteTag(id));
  const { theme } = useTheme();

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
        onClose();
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
  const bg =
    theme === "dark"
      ? { background: tag.color.dark }
      : { background: tag.color.light };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col gap-4">
        <h1 className="flex flex-row gap-2 text-lg font-black">
          <span className="h-6 w-6 rounded-full" style={bg}></span>
          <span className="capitalize">{tag.label}</span>
        </h1>
        <span>Are you sure you want to permanently delete this tag?</span>
        <div className="flex w-full justify-end">
          <Button
            icon="trash-can"
            hoverIcon="check"
            variant="error"
            className="w-fit"
            onClick={() => onDelete(tag.id)}
            isSubmitting={isLoading}
          >
            Delete
          </Button>
        </div>
      </div>
    </Modal>
  );
};
