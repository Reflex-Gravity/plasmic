import { Moment } from "moment";
import useSWR from "swr";
import { omitNils } from "../../../common";
import { ApiAnalyticsQueryType, TeamId } from "../../../shared/ApiSchema";
import { useApi } from "../../contexts/AppContexts";
import { getFormattedRange } from "./utils";

const REFRESH_INTERVAL = 30000;

export function useTeamAnalytics(
  teamId: string,
  opts: {
    from: string;
    to: string;
  }
) {
  const api = useApi();
  const search = new URLSearchParams(opts);
  const { data: teamAnalytics } = useSWR(
    `team-analytics/${teamId}/${search.toString()}`,
    async () => {
      const result = await api.getTeamAnalytics(teamId, {
        ...opts,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      });
      return result;
    },
    { refreshInterval: REFRESH_INTERVAL }
  );

  return teamAnalytics;
}

export function useAnalyticsData(opts: {
  teamId: string;
  projectId?: string;
  componentId?: string;
  from?: Moment;
  to?: Moment;
  splitId?: string;
  period?: string;
  type: ApiAnalyticsQueryType;
}) {
  const api = useApi();
  const {
    teamId,
    projectId,
    componentId,
    from,
    to,
    period = "day",
    splitId,
    type,
  } = opts;
  const key = JSON.stringify(
    omitNils({
      ...opts,
      period,
    })
  );
  const { data: analyticsData } = useSWR(
    `analytics-data/${key}`,
    async () => {
      if (!from || !to) {
        return undefined;
      }
      const { from: formattedFrom, to: formattedTo } = getFormattedRange(
        from,
        to,
        period as "day" | "month"
      );
      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      if (!projectId) {
        const result = await api.getTeamAnalytics(teamId, {
          from: formattedFrom,
          to: formattedTo,
          timezone,
          period,
        });
        return result;
      }
      const analyticsResult = await api.getProjectAnalytics(teamId, projectId, {
        from: formattedFrom,
        to: formattedTo,
        timezone,
        componentId,
        period,
        splitId,
        type,
      });
      return analyticsResult;
    },
    { refreshInterval: REFRESH_INTERVAL }
  );
  return analyticsData;
}

export function useProjectAnalyticsMeta(
  teamId: string,
  projectId: string | undefined
) {
  const api = useApi();
  const { data: projectAnalyticsMeta } = useSWR(
    `project-analytcs-meta/${projectId}`,
    async () => {
      if (!projectId) {
        return undefined;
      }
      const result = await api.getProjectAnalayticsMeta(teamId, projectId);
      return result;
    },
    { refreshInterval: REFRESH_INTERVAL }
  );
  return projectAnalyticsMeta;
}

export function useTeamProjects(teamId: string) {
  const api = useApi();
  const { data: projects } = useSWR(
    `team-projects/${teamId}`,
    async () => {
      const result = await api.listTeamProjects(teamId as TeamId);
      return result.projects;
    },
    { refreshInterval: REFRESH_INTERVAL }
  );
  return projects;
}
