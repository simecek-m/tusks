import { useAuth0 } from "@auth0/auth0-react";
import Button from "component/button/Button";
import Title from "component/common/Title";
import PageContent from "component/layout/PageContent";
import PageLayout from "component/layout/PageLayout";
import { TodoListPreview } from "component/todo/TodoListPreview";
import { INDEX_PATH } from "constant/paths";
import { FC } from "react";
import { useNavigate } from "react-router-dom";

const Home: FC = () => {
  const { loginWithPopup, isAuthenticated } = useAuth0();
  const navigate = useNavigate();

  return (
    <PageLayout>
      <PageContent>
        <div className="flex h-full w-full flex-col items-center justify-around md:flex-row">
          <div className="flex w-full flex-col items-center justify-center gap-2">
            <Title>Hashtag</Title>
            <p>organize your notes and never forget your great ideas again</p>
            <span className="font-heading text-8xl text-brand-light dark:text-brand-dark">
              #
            </span>
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
                    onClick={() => navigate(INDEX_PATH)}
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

export default Home;
