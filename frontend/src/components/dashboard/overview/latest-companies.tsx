'use client';

import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import type { SxProps } from '@mui/material/styles';
import { ArrowRightIcon } from '@phosphor-icons/react/dist/ssr/ArrowRight';
import { CaretRight } from '@phosphor-icons/react/dist/ssr/CaretRight';
import dayjs from 'dayjs';

export interface Company {
  id: string;
  image: string;
  name: string;
  updatedAt: Date;
}

export interface LatestCompaniesProps {
  companies?: Company[];
  selectedCompanyId?: string;
  onCompanySelect?: (companyId: string) => void;
  verifiedIncidentsCount?: Record<string, number>;
  sx?: SxProps;
}

export function LatestCompanies({ 
  companies = [], 
  selectedCompanyId,
  onCompanySelect,
  verifiedIncidentsCount = {},
  sx 
}: LatestCompaniesProps): React.JSX.Element {
  const handleCompanyClick = (companyId: string) => {
    onCompanySelect?.(companyId);
  };

  return (
    <Card sx={sx}>
      <CardHeader title="Companies" />
      <Divider />
      <List>
        {companies.map((company, index) => {
          const isSelected = company.id === selectedCompanyId;
          const incidentsCount = verifiedIncidentsCount[company.id] || 0;
          const isDisabled = incidentsCount === 0;
          
          return (
            <ListItem 
              key={company.id} 
              disablePadding
              divider={index < companies.length - 1}
            >
              <ListItemButton
                onClick={() => !isDisabled && handleCompanyClick(company.id)}
                selected={isSelected}
                disabled={isDisabled}
                sx={{
                  backgroundColor: isSelected ? 'action.selected' : 'transparent',
                  '&:hover': {
                    backgroundColor: isDisabled ? 'transparent' : 'action.hover',
                  },
                  '&.Mui-selected': {
                    backgroundColor: 'action.selected',
                  },
                  '&.Mui-disabled': {
                    opacity: 0.5,
                  },
                }}
              >
                <ListItemAvatar>
                  {company.image ? (
                    <Box component="img" src={company.image} sx={{ borderRadius: 1, height: '48px', width: '48px' }} />
                  ) : (
                    <Box
                      sx={{
                        borderRadius: 1,
                        backgroundColor: 'var(--mui-palette-neutral-200)',
                        height: '48px',
                        width: '48px',
                      }}
                    />
                  )}
                </ListItemAvatar>
                <ListItemText
                  primary={company.name}
                  primaryTypographyProps={{ variant: 'subtitle1' }}
                  secondary={
                    <>
                      {verifiedIncidentsCount[company.id] || 0} incidents
                    </>
                  }
                  secondaryTypographyProps={{ variant: 'body2' }}
                />
                {isSelected && (
                  <CaretRight weight="bold" />
                )}
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Card>
  );
}
