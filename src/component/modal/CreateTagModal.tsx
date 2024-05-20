import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import Button from "component/button/Button";
import { Modal } from "component/common/Modal";
import ColorInput from "component/form/ColorInput";
import Input from "component/form/Input";
import { TAGS_QUERY_KEY } from "constant/queries";
import useTusksApi from "hook/api";
import { useToast } from "provider/ToastProvider";
import { FormProvider, useForm } from "react-hook-form";
import { INewTag, ITag, ModalState } from "type";
import { TAG_SCHEMA } from "validation";

export const CreateTagModal = ({ isOpen, onClose }: ModalState) => {
  const { createNewTag } = useTusksApi();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const methods = useForm<INewTag>({
    mode: "onChange",
    resolver: yupResolver(TAG_SCHEMA),
  });

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isValid },
  } = methods;

  const { mutateAsync: updateAsync, isLoading: isUpdating } = useMutation<
    ITag,
    AxiosError,
    INewTag
  >((tag: INewTag) => createNewTag(tag));

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

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        onClose();
        reset();
      }}
    >
      <h1 className="text-lg font-black">Create tag</h1>
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(submit)}
          className="mt-4 flex flex-col gap-2"
        >
          <Input label="label" {...register("label")} error={errors?.label} />
          <div className="flex flex-row gap-3">
            <ColorInput label="light" name="color.light" />
            <ColorInput label="dark" name="color.dark" />
          </div>
          <Button
            icon="tag"
            hoverIcon="check"
            type="submit"
            className="mt-4"
            isSubmitting={isUpdating}
            isDisabled={!isValid}
          >
            Create
          </Button>
        </form>
      </FormProvider>
    </Modal>
  );
};
