import PageLayout from "component/layout/PageLayout";
import Spinner from "component/Spinner";

const Loading = () => {
  return (
    <PageLayout>
      <div className="flex h-screen w-screen flex-col items-center justify-center gap-2">
        <span>loading</span>
        <Spinner />
      </div>
    </PageLayout>
  );
};

export default Loading;
