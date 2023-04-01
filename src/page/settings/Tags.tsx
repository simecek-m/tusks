import { useQuery } from "@tanstack/react-query";
import Heading from "component/common/Heading";
import PageContent from "component/layout/PageContent";
import PageLayout from "component/layout/PageLayout";
import { TAGS_QUERY_KEY } from "constant/queries";
import useTusksApi from "hook/api";
import { useToast } from "provider/ToastProvider";
import { FC } from "react";

const Tags: FC = () => {
  const { fetchAllTags } = useTusksApi();
  const { toast } = useToast();
  const { data, isLoading } = useQuery([TAGS_QUERY_KEY], fetchAllTags);

  if (isLoading) return <div>loading</div>;

  return (
    <PageLayout>
      <PageContent>
        <Heading text="Tags" description="tags you can use across this app" />
        <div className="mt-8">
          <button
            className="rounded-full bg-primary-600 bg-opacity-20 px-3 py-2 text-primary-800 dark:bg-primary-200 dark:bg-opacity-10 dark:text-primary-300"
            onClick={() => {
              toast({ icon: "warning", title: "Not implemented yet!" });
            }}
          >
            new tag
          </button>
        </div>
        <div className="mt-2">
          {data?.map((tag) => (
            <div key={tag.id}>{tag.label}</div>
          ))}
          {data?.length === 0 && <div>You have no tags, yet.</div>}
        </div>
      </PageContent>
    </PageLayout>
  );
};

export default Tags;
