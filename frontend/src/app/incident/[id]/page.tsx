import * as React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { config } from '@/config';
import { IncidentDetails } from '@/components/dashboard/incident/incident-details';
import { getIncidentById, getCompanyNameByCompanyId } from '@/data/dummy-data';

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const incident = getIncidentById(id);
  
  if (!incident) {
    return { title: `Incident not found | ${config.site.name}` };
  }

  return { title: `Incident ${incident.incident_id} | ${config.site.name}` };
}

export default async function Page({ params }: PageProps): Promise<React.JSX.Element> {
  const { id } = await params;
  const incident = getIncidentById(id);

  if (!incident) {
    notFound();
  }

  const companyName = getCompanyNameByCompanyId(incident.companyId);

  return <IncidentDetails incident={incident} companyName={companyName} />;
}

