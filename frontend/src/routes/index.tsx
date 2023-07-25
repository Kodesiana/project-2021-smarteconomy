import InProgressNotification from "@/components/elements/in-progress-card/InProgress";
import QuestionnaireServices from "@/services/QuestionnaireServices/QuestionnaireServices";
import { objectToParameters, parametersToObject } from "@/utils/queryParams";
import { Breadcrumbs, Center } from "@mantine/core";
import { Navigate, ReactLocation, Route } from "@tanstack/react-location";

export const LocationInstance = new ReactLocation({
    parseSearch: parametersToObject,
    stringifySearch: objectToParameters,
});

export const Routes: Route[] = [

    {
        path: "/app",
        element: async () => import("@/components/shell/main/MainShell").then(({ default: Component }) => <Component />),
        children: [
            {
                path: "/",
                element: async () => import("@/components/modules/app/dashboard/DashboardModule").then(({ default: Component }) => <Component />),
            },
            {
                path: "/data",
                meta: {
                    breadcrumb: () => <>Pangkalan Data </>
                },
                children: [
                    {
                        path: '/:ID',
                        meta: {
                            breadcrumb: ({ ID }: { ID: string; }) => <>{ID} </>
                        },
                        loader: async ({ params: { ID } }) => ({ ID }),
                        children: [
                            {
                                path: '/tambah',
                                meta: {
                                    breadcrumb: () => <>Tambah</>
                                },
                                element: async () => import("@/components/modules/app/questionnaire/add")
                                    .then(({ default: Component }) => <Component />),
                            },
                            {
                                path: '/edit/:id',
                                loader: async ({ params: { id } }) => {
                                    const { data } = await QuestionnaireServices.getQuestionnaireById(id);
                                    return ({
                                        answer: data?.content
                                    });
                                },
                                meta: {
                                    breadcrumb: () => <>Edit</>
                                },
                                element: async () => import("@/components/modules/app/questionnaire/add")
                                    .then(({ default: Component }) => <Component />),
                            },
                            {
                                path: '/',
                                element: async () => import("@/components/modules/app/data/DataModule").then(({ default: Component }) => <Component />),
                            }
                        ]
                    }
                ]
            },
            {
                path: "/citizen",
                meta: { breadcrumb: () => <>Citizen Science</> },
                children: [
                    {
                        path: "/readiness",
                        element: async () => import("@/components/modules/app/citizen/CitizenModule").then(({ default: Component }) => <Component />),
                    },
                    {
                        path: "/grafik",
                        element: async () => import("@/components/modules/app/citizen/ChartModule").then(({ default: Component }) => <Component />),
                        meta: { breadcrumb: () => <>Grafik</> },
                    },
                    {
                        element: <Navigate to="/app/citizen/readiness" />,
                    }
                ]

            },
            {
                path: "/weights", element: async () => import("@/components/modules/app/weights/WeightsModule").then(({ default: Component }) => <Component />),
                meta: { breadcrumb: () => <>Kerja Sama</> },

            },
            {
                path: "/infra", element: async () => import("@/components/modules/app/infra/InfraModule").then(({ default: Component }) => <Component />),
                meta: { breadcrumb: () => <>Infrastruktur</> },
            },
            {
                path: "/recomendation", element: async () => import("@/components/modules/app/recommendations/RecommendationModule").then(({ default: Component }) => <Component />),
                meta: { breadcrumb: () => <>Rekomendasi</> },
                children: [
                    // {
                    //     path: "model-ime",
                    //     element: async () => import("@/components/modules/app/recommendations/ModelImeModule").then(({ default: Component }) => <Component />),
                    // },
                    {
                        path: "model-stats",
                        element: async () => import("@/components/modules/app/recommendations/ModelStatsModule").then(({ default: Component }) => <Component />),
                    },
                    {
                        element: <Navigate to="/app/recomendation/model-stats" />,
                    }
                ]
            },
            {
                path: "/users",
                element: async () => import("@/components/modules/app/users/UsersModule").then(({ default: Component }) => <Component />),
                meta: { breadcrumb: () => <>Pengguna</> },
            },
            {
                path: "/about",
                element: async () => import("@/components/modules/app/about/AboutModule").then(({ default: Component }) => <Component />),
            },
            {
                path: "/settings",
                element: async () => import("@/components/modules/app/settings/SettingsModule").then(({ default: Component }) => <Component />),
                meta: { breadcrumb: () => <>Pengaturan</> },
            },
            {
                path: "/logout",
                element: <Navigate to="/auth/login" />,
            },
            {
                element: <Navigate to="/auth/login" />,
            }
        ]
    },
    {
        path: "/auth",
        element: async () => import("@/components/shell/auth/AuthShell").then(({ default: Component }) => <Component />),
        children: [
            {
                path: "/login",
                element: async () => import("@/components/modules/auth/login/LoginModule").then(({ default: Component }) => <Component />),
            },
            {
                path: "/register",
                element: async () => import("@/components/modules/auth/register/RegisterModule").then(({ default: Component }) => <Component />),
            },
        ]
    },
    {
        path: 'tambah-kuesioner',

        element: async () => import("@/components/modules/questionnaire").then(({ default: Component }) => <Component />),
    },
    {
        path: 'edit-kuesioner',
        element: async () => import("@/components/modules/questionnaire").then(({ default: Component }) => <Component />),
    },
    {
        path: "/",
        element: async () => import("@/components/shell/landing/LandingShell").then(({ default: Component }) => <Component />),
        children: [
            {
                element: async () => import("@/components/modules/landing/LandingModule").then(({ default: Component }) => <Component />),
            }
        ],

    },

    {
        element: <Navigate to="/" />,
    }
];