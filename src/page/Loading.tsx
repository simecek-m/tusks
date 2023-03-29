import PageLayout from "component/layout/PageLayout";
import Spinner from "component/common/Spinner";
import PageContent from "component/layout/PageContent";

const Loading = () => {
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

export default Loading;
