import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PageLayout from "component/layout/PageLayout";
import { motion } from "framer-motion";
import { FC } from "react";

interface AuthenticationErrorProps {
  message: string;
}

const AuthenticationError: FC<AuthenticationErrorProps> = ({ message }) => {
  return (
    <PageLayout>
      <div className="flex h-screen w-screen flex-col items-center justify-center gap-2">
        <motion.div
          initial={{ y: -20, scale: 1 }}
          animate={{ y: 0, scale: 0.7 }}
          transition={{
            repeat: Infinity,
            repeatType: "reverse",
            duration: 0.5,
          }}
        >
          <FontAwesomeIcon icon="circle-exclamation" size="4x" />
        </motion.div>
        <span>Oooooops, authentication error occured: {message}</span>
      </div>
    </PageLayout>
  );
};

export default AuthenticationError;
