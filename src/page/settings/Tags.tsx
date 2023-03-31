import Heading from "component/common/Heading";
import PageContent from "component/layout/PageContent";
import PageLayout from "component/layout/PageLayout";
import { FC } from "react";

const Tags: FC = () => {
  return (
    <PageLayout>
      <PageContent>
        <Heading text="Tags" description="tags you can use across this app" />
      </PageContent>
    </PageLayout>
  );
};

export default Tags;
