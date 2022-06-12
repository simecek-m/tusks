import React, { useCallback, useEffect } from "react";
import TodoListItem from "component/todo/TodoListItem";
import { Outlet, useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { useTodoApi } from "hooks/api";
import NewList from "component/button/NewList";
import styles from "page/ListPage.module.sass";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import { useKeyPress } from "hooks/interaction";

export default function ListPage() {
  const navigate = useNavigate();
  const navigateUp = useCallback(() => {
    navigate("..");
  }, [navigate]);
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
    <div id={styles.layout}>
      <ListPanel />
      <Outlet />
    </div>
  );
}

function ListPanel() {
  const { fetchTodos } = useTodoApi();
  const navigate = useNavigate();

  const { data, error, isLoading } = useQuery("todos", fetchTodos);

  if (isLoading)
    return (
      <SidePanel>
        <div className={styles.centered}>
          <motion.div
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
          >
            <FontAwesomeIcon icon="spinner" size="xl" />
          </motion.div>
          <span>Loading</span>
        </div>
      </SidePanel>
    );
  if (error)
    return (
      <SidePanel>
        <div className={styles.centered}>
          <FontAwesomeIcon icon="triangle-exclamation" size="xl" />
          <span>Error</span>
        </div>
      </SidePanel>
    );

  return (
    <AnimatedSidePanel>
      <NewList />
      {data &&
        data.map((list) => (
          <TodoListItem
            name={list.title}
            icon={list.icon ?? "list-check"}
            key={list.id}
            onClick={() => {
              navigate(`../${list.id}`);
            }}
          />
        ))}
    </AnimatedSidePanel>
  );
}

function SidePanel({ ref, children }) {
  const container = {
    hidden: { opacity: 0, x: -100 },
    show: {
      x: 0,
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };
  return (
    <motion.div
      ref={ref}
      variants={container}
      initial="hidden"
      animate="show"
      id={styles["side-panel"]}
    >
      {children}
    </motion.div>
  );
}

const AnimatedSidePanel = React.forwardRef((props, ref) => {
  return <SidePanel ref={ref} {...props} />;
});
