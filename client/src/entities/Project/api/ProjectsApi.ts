import { Project } from '../model/types/Project';

import { rtkApi } from '@/shared/api/rtkApi';

interface ProjectsProps {
    skip: number;
    type: string;
}

interface ProjectsResponse {
    totalCount: number;
    projects: Project[];
}

const fetchProjectsApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getRepos: build.query<ProjectsResponse, ProjectsProps>({
            query: (props) => ({
                url: `/api/repos/${props.type}?skip=${props.skip}&limit=10`,
            }),
        }),
        getProjects: build.query<Project[], void>({
            query: () => ({
                url: '/api/projects',
            }),
        }),
    }),
});

export const useRepos = fetchProjectsApi.useGetReposQuery;
export const useProjects = fetchProjectsApi.useGetProjectsQuery;
