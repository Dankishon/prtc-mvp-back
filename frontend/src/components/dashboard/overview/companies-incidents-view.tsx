'use client';

import * as React from 'react';
import Grid from '@mui/material/Grid';
import { LatestIncidents } from '@/components/dashboard/overview/latest-incidents';
import { LatestCompanies } from '@/components/dashboard/overview/latest-companies';
import { companies, incidentsByCompany } from '@/data/dummy-data';

export function CompaniesIncidentsView(): React.JSX.Element {
  const [selectedCompanyId, setSelectedCompanyId] = React.useState<string>(companies[0]?.id || '');

  const handleCompanySelect = (companyId: string) => {
    setSelectedCompanyId(companyId);
  };

  const selectedIncidents = incidentsByCompany[selectedCompanyId] || [];
  const selectedCompany = companies.find(c => c.id === selectedCompanyId);

  const incidentsCountByCompany = React.useMemo(() => {
    const counts: Record<string, number> = {};
    Object.entries(incidentsByCompany).forEach(([companyId, incidents]) => {
      counts[companyId] = incidents.length;
    });
    return counts;
  }, []);

  return (
    <Grid container spacing={3}>
      <Grid
        size={{
          lg: 4,
          md: 6,
          xs: 12,
        }}
      >
        <LatestCompanies
          companies={companies}
          selectedCompanyId={selectedCompanyId}
          onCompanySelect={handleCompanySelect}
          verifiedIncidentsCount={incidentsCountByCompany}
          sx={{ height: '100%' }}
        />
      </Grid>
      <Grid
        size={{
          lg: 8,
          md: 12,
          xs: 12,
        }}
      >
        <LatestIncidents
          incidents={selectedIncidents}
          companyName={selectedCompany?.name}
          sx={{ height: '100%' }}
        />
      </Grid>
    </Grid>
  );
}

