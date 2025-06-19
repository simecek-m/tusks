import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Title } from "component/common/Title";
import { PageContent } from "component/layout/PageContent";
import { PageLayout } from "component/layout/PageLayout";
import { IconType } from "constant/icons";
import { TEAMS_QUERY_KEY } from "constant/queries";
import { useTusksApi } from "hook/api";
import { Loading } from "page/Loading";
import { useTheme } from "provider/ThemeProvider";
import { useParams } from "react-router-dom";
import { TeamDetail } from "type";

export const TeamDetailPage = () => {
  const { id } = useParams();
  const { fetchTeamById } = useTusksApi();
  const { theme } = useTheme();

  const {
    data: team,
    isLoading: isTeamLoading,
    error: teamError,
  } = useQuery<TeamDetail, AxiosError>([TEAMS_QUERY_KEY, id], () =>
    fetchTeamById(id ?? "")
  );

  if (isTeamLoading) return <Loading />;

  if (teamError)
    return (
      <PageLayout>
        <PageContent>
          <Title>Team</Title>
          <div>Error while loading team!</div>
        </PageContent>
      </PageLayout>
    );

  const color = theme === "light" ? team.color.light : team.color.dark;

  return (
    <PageLayout>
      <PageContent>
        <div className="mb-4 flex flex-row items-center gap-3">
          <div
            className="flex h-14 w-14 items-center justify-center rounded-full text-white dark:text-black"
            style={{ backgroundColor: color }}
          >
            <FontAwesomeIcon icon={team.icon as IconType} size="lg" />
          </div>
          <div>
            <div className="font-heading text-3xl font-bold" style={{ color }}>
              {team.name}
            </div>
            <div className="text-sm opacity-75">{team.description}</div>
          </div>
        </div>
        <div>Members</div>
        <div className="flex flex-col gap-2">
          {team.members.map((member) => (
            <div
              key={member.user.id}
              className="flex w-fit flex-row items-center gap-4 rounded-xl bg-white py-4 pl-4 pr-8 dark:bg-gray-900"
            >
              <img
                src={member.user.picture}
                alt="profile picture"
                className="h-12 w-12 rounded-full"
              />
              <div className="flex flex-col">
                <div className="text-sm opacity-75">{member.role}</div>
                <div className="text-lg font-bold">
                  {member.user.firstName} {member.user.lastName}
                </div>
                <div className="text-sm opacity-75">{member.user.email}</div>
              </div>
            </div>
          ))}
        </div>
      </PageContent>
    </PageLayout>
  );
};
