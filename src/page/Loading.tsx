import { Spinner } from "component/common/Spinner";
import { PageContent } from "component/layout/PageContent";
import { PageLayout } from "component/layout/PageLayout";

export const Loading = () => {
  return (
    <PageLayout>
      <PageContent>
        <div className="flex h-full flex-col items-center justify-center">
          <span>loading</span>
          <Spinner />
        </div>
      </PageContent>
    </PageLayout>
  );
};
