import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FlexibleContent from "component/layout/FlexibleContent";
import Task from "component/task/Task";
import { useTodoApi } from "hooks/api";
import { useKeyPress } from "hooks/interaction";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import styles from "page/ListDetailPage.module.sass";

export default function ListDetailPage() {
  let { id } = useParams();
  const { deleteTodo } = useTodoApi();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate } = useMutation(deleteTodo, {
    onSuccess: () => {
      navigate("..");
      queryClient.invalidateQueries("todos");
    },
    onError: (response) => {
      toast.error(
        <div>
          {response.statusText} (status: {response.status})
        </div>
      );
    },
  });

  const navigateUp = () => navigate("..");
  const { addOnKeyDownEvent, removeOnKeyDownEvent } = useKeyPress(
    "Escape",
    navigateUp
  );

  useEffect(() => {
    addOnKeyDownEvent();
    return () => {
      removeOnKeyDownEvent();
    };
  }, [addOnKeyDownEvent, removeOnKeyDownEvent]);

  return (
    <FlexibleContent flexDirection="column">
      <h1>List Detail Page - {id}</h1>
      <div id={styles["delete-button"]}>
        <FontAwesomeIcon icon="trash" onClick={() => mutate(id)} />
      </div>
      <div>
        <Task text="go outside with pet" id="afw54" isComplete={false} />
      </div>
    </FlexibleContent>
  );
}
