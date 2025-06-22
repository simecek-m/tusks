import { useAuth0 } from "@auth0/auth0-react";
import { useRouter } from "@tanstack/react-router";
import Logo from "assets/img/logo.svg?react";
import { Button } from "component/button/Button";
import { Title } from "component/common/Title";
import { PageContent } from "component/layout/PageContent";
import { PageLayout } from "component/layout/PageLayout";
import { TodoListPreview } from "component/todo/TodoListPreview";
import { INDEX_PATH } from "constant/paths";
import { motion } from "motion/react";
import { FC } from "react";

export const Home: FC = () => {
  const { loginWithPopup, isAuthenticated } = useAuth0();
  const { navigate } = useRouter();

  return (
    <PageLayout>
      <PageContent>
        <div className="flex h-full w-full flex-col items-center justify-around gap-12 md:flex-row md:gap-0">
          <div className="flex w-full flex-col items-center justify-center gap-2">
            <Title>Tusks</Title>
            <p className="italic opacity-70">
              Not everyone has an elephant&apos;s memory!
            </p>
            <motion.div
              className="bg-brand-light dark:bg-brand-dark mt-4 p-4"
              style={{ borderRadius: 30 }}
              whileHover={{ borderRadius: 100, rotate: 10 }}
            >
              <Logo className="w-56 fill-white dark:fill-black" />
            </motion.div>
          </div>
          <div className="flex w-full justify-center">
            <div className="flex w-1/2 min-w-[300px] flex-col items-end gap-4">
              <TodoListPreview
                title="Groceries"
                tag="shop"
                todos={[
                  { isCompleted: false, label: "Eggs" },
                  { isCompleted: true, label: "Milk" },
                  { isCompleted: false, label: "Vegetables" },
                ]}
              />
              <div>
                {isAuthenticated ? (
                  <Button
                    icon="right-long"
                    hoverIcon="door-open"
                    onClick={() => navigate({ to: INDEX_PATH })}
                  >
                    Continue
                  </Button>
                ) : (
                  <Button
                    icon="lock"
                    hoverIcon="key"
                    onClick={() =>
                      loginWithPopup({
                        authorizationParams: { prompt: "select_account" },
                      })
                    }
                  >
                    Sign In
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </PageContent>
    </PageLayout>
  );
};
