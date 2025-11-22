export const paths = {
  home: '/',
  dashboard: {
    overview: '/dashboard',
  },
  incident: (id: string) => `/incident/${id}`,
  errors: { notFound: '/errors/not-found' },
} as const;
