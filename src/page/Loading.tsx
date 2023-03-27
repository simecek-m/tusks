import PageLayout from "component/layout/PageLayout";
import Spinner from "component/Spinner";

const Loading = () => {
  return (
    <PageLayout>
      <div className="flex h-full flex-col items-center justify-center">
        <span>loading</span>
        <Spinner />
      </div>
    </PageLayout>
  );
};

export default Loading;
