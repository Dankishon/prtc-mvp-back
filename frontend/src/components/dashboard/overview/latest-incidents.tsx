'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardHeader from '@mui/material/CardHeader';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import type { SxProps } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import { ArrowRightIcon } from '@phosphor-icons/react/dist/ssr/ArrowRight';
import { useRouter } from 'next/navigation';
import dayjs from 'dayjs';

import { paths } from '@/paths';

const statusMap = {
  'ZK proof Verified': { label: 'ZK proof Verified', color: 'success' },
  'Not Verified': { label: 'Not Verified', color: 'error' },
} as const;

export interface Incident {
  id: string;
  incident_id: string;
  status: 'ZK proof Verified' | 'Not Verified';
  createdAt: Date;
}

export interface LatestIncidentsProps {
  incidents?: Incident[];
  companyName?: string;
  sx?: SxProps;
}

type SortDirection = 'asc' | 'desc';

export function LatestIncidents({ incidents = [], companyName, sx }: LatestIncidentsProps): React.JSX.Element {
  const router = useRouter();
  const [sortDirection, setSortDirection] = React.useState<SortDirection>("desc");
  
  const title = companyName 
    ? `Incidents - ${companyName}` 
    : 'Latest incidents';

  const handleReviewIncident = (incidentId: string) => {
    router.push(paths.incident(incidentId));
  };

  const handleSort = () => {
   if (sortDirection === 'asc') {
      setSortDirection('desc');
    } else {
      setSortDirection('asc');
    }
  };

  // Sort incidents by status
  // Default: unverified on top (desc)
  const sortedIncidents = React.useMemo(() => {
    const sorted = [...incidents].sort((a, b) => {
      // Assign numeric values to statuses for sorting
      // 'ZK proof Verified' = 1, 'Not Verified' = 2
      const statusValue = (status: 'ZK proof Verified' | 'Not Verified') => 
        status === 'ZK proof Verified' ? 1 : 2;
      
      const aValue = statusValue(a.status);
      const bValue = statusValue(b.status);

      const direction = sortDirection || 'desc';
      
      if (direction === 'asc') {
        return aValue - bValue;
      } else {
        return bValue - aValue;
      }
    });

    return sorted;
  }, [incidents, sortDirection]);

  return (
    <Card sx={sx}>
      <CardHeader title={title} />
      <Divider />
      <Box sx={{ overflowX: 'auto' }}>
        <Table sx={{ minWidth: 800 }}>
          <TableHead>
            <TableRow>
              <TableCell>Incident ID</TableCell>
              <TableCell sortDirection="desc">Date</TableCell>
              <TableCell>
                <TableSortLabel
                  active={!!sortDirection}
                  direction={ sortDirection}
                  onClick={handleSort}
                >
                  Status
                </TableSortLabel>
              </TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedIncidents.map((incident) => {
              const { label, color } = statusMap[incident.status] ?? { label: 'Unknown', color: 'default' };

              return (
                <TableRow hover key={incident.id}>
                  <TableCell>{incident.incident_id}</TableCell>
                  <TableCell>{dayjs(incident.createdAt).format('MMM D, YYYY')}</TableCell>
                  <TableCell>
                    <Chip color={color} label={label} size="small" />
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      color='primary'
                      size="small"
                      variant="contained"
                      onClick={() => handleReviewIncident(incident.incident_id)}
                    >
                      Review Incident
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Box>
    </Card>
  );
}
