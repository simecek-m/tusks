import Heading from "component/common/Heading";
import PageContent from "component/layout/PageContent";
import PageLayout from "component/layout/PageLayout";
import { FC } from "react";

const Share: FC = () => {
  return (
    <PageLayout>
      <PageContent>
        <Heading
          text="Share"
          description="who do you share your projects with?"
        />
      </PageContent>
    </PageLayout>
  );
};

export default Share;
