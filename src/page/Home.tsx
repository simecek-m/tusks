import { useAuth0 } from "@auth0/auth0-react";
import { ReactComponent as Logo } from "assets/logo.svg";
import Button from "component/button/Button";
import PageLayout from "component/layout/PageLayout";
import Title from "component/common/Title";
import { INDEX_PATH } from "constant/paths";
import { motion } from "framer-motion";
import { FC } from "react";
import { useNavigate } from "react-router-dom";

const Home: FC = () => {
  const { loginWithPopup, isAuthenticated } = useAuth0();
  const navigate = useNavigate();

  return (
    <PageLayout>
      <div className="flex h-full flex-col items-center justify-center">
        <motion.div
          className="mb-5"
          initial={{ scale: 0.8 }}
          whileHover={{ scale: 1 }}
          transition={{ type: "spring", bounce: 0.5 }}
        >
          <Logo height="20vh" width="100%" />
        </motion.div>
        <Title>Tusks</Title>
        <p>not everyone has the memory of an elephant</p>
        <div className="mt-10 flex w-full flex-col items-center">
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
    </PageLayout>
  );
};

export default Home;
