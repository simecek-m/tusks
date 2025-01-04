import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Button } from "component/button/Button";
import { Modal } from "component/common/Modal";
import { ColorInput } from "component/form/ColorInput";
import { IconInput } from "component/form/IconInput";
import { Input } from "component/form/Input";
import { TEAMS_QUERY_KEY } from "constant/queries";
import { useTusksApi } from "hook/api";
import { useToast } from "provider/ToastProvider";
import { FormProvider, useForm } from "react-hook-form";
import { ModalState, NewTeam, Team } from "type";
import { TEAM_SCHEMA } from "validation";

export const CreateTeamModal = ({ isOpen, onClose }: ModalState) => {
  const { createNewTeam } = useTusksApi();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const methods = useForm<Team>({
    mode: "onChange",
    resolver: yupResolver(TEAM_SCHEMA),
  });

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isValid },
  } = methods;

  const { mutateAsync: updateAsync, isLoading: isUpdating } = useMutation<
    Team,
    AxiosError,
    NewTeam
  >((team: NewTeam) => createNewTeam(team));

  const submit = async (team: NewTeam) => {
    await updateAsync(team, {
      onSuccess: (data: Team) => {
        queryClient.setQueryData<Team[]>([TEAMS_QUERY_KEY], (original) => {
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
      <h1 className="text-lg font-black">Team</h1>
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(submit)}
          className="mt-4 flex flex-col gap-2"
        >
          <Input label="name" {...register("name")} error={errors?.name} />
          <Input
            label="description"
            {...register("description")}
            error={errors?.description}
          />
          <div className="text-sm">color</div>
          <div className="flex flex-row gap-3">
            <ColorInput type="light" name="color.light" />
            <ColorInput type="dark" name="color.dark" />
          </div>
          <IconInput name="icon" />
          <Button
            icon="user-group"
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
