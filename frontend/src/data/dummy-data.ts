import dayjs from 'dayjs';
import type { Company } from '@/components/dashboard/overview/latest-companies';
import type { Incident } from '@/components/dashboard/overview/latest-incidents';
import type { IncidentDetailsData } from '@/components/dashboard/incident/incident-details';

// Companies
export const companies: Company[] = [
  {
    id: 'COMP-001',
    name: 'TechFlow Solutions',
    image: '/assets/logo-slack.png',
    updatedAt: dayjs().subtract(12, 'minutes').toDate(),
  },
  {
    id: 'COMP-002',
    name: 'CloudSync Systems',
    image: '/assets/logo-dropbox.png',
    updatedAt: dayjs().subtract(25, 'minutes').subtract(1, 'hour').toDate(),
  },
  {
    id: 'COMP-003',
    name: 'CodeForge Technologies',
    image: '/assets/logo-github.png',
    updatedAt: dayjs().subtract(8, 'minutes').subtract(2, 'hour').toDate(),
  },
  {
    id: 'COMP-004',
    name: 'RideShare Pro',
    image: '/assets/logo-lyft.png',
    updatedAt: dayjs().subtract(35, 'minutes').subtract(3, 'hour').toDate(),
  },
  {
    id: 'COMP-005',
    name: 'ContentHub Media',
    image: '/assets/logo-medium.png',
    updatedAt: dayjs().subtract(18, 'minutes').subtract(4, 'hour').toDate(),
  },
  {
    id: 'COMP-006',
    name: 'WebSpace Creations',
    image: '/assets/logo-squarespace.png',
    updatedAt: dayjs().subtract(45, 'minutes').subtract(5, 'hour').toDate(),
  },
];

// Helper function to generate incident_id in YYYYMMDD-NNNN format
function generateIncidentId(date: Date, index: number): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const sequence = String(index).padStart(4, '0');
  return `${year}${month}${day}-${sequence}`;
}

// Helper function to generate deterministic hash
function generateHash(prefix: string, seed: string = ''): string {
  const chars = '0123456789abcdef';
  let hash = prefix;
  // Generate deterministic hash based on seed
  let value = 0;
  for (let i = 0; i < seed.length; i++) {
    value = ((value << 5) - value) + seed.charCodeAt(i);
    value = value & value; // Convert to 32-bit number
  }
  // If seed is empty, use random value for variety
  if (!seed) {
    value = Math.floor(Math.random() * 0x7fffffff);
  }
  for (let i = prefix.length; i < 64; i++) {
    value = ((value * 1103515245) + 12345) & 0x7fffffff;
    hash += chars[value % chars.length];
  }
  return hash;
}

// Helper function to get incident hashes with unique seeds
function getIncidentHash(incidentKey: string, type: string): string {
  return generateHash('0x', `${incidentKey}-${type}`);
}

// Full incident data
const incidentsFullData: Record<string, IncidentDetailsData> = {
  // COMP-001: 8 incidents
  '1': {
    id: 'INC-001',
    incident_id: generateIncidentId(dayjs().subtract(2, 'hours').toDate(), 1),
    companyId: 'COMP-001',
    commitment: getIncidentHash('1', 'commitment'),
    txHash: getIncidentHash('1', 'txHash'),
    status: 'ZK proof Verified',
    proof: {
      hash: getIncidentHash('1', 'proofHash'),
      size: 1024,
      jsonUrl: '/api/proofs/1.json',
      publicInputs: [getIncidentHash('1', 'publicInput1'), getIncidentHash('1', 'publicInput2')],
      txHash: getIncidentHash('1', 'proofTxHash'),
      blockchainStatus: 'Confirmed',
    },
    createdAt: dayjs().subtract(2, 'hours').toDate(),
  },
  '2': {
    id: 'INC-002',
    incident_id: generateIncidentId(dayjs().subtract(5, 'hours').subtract(1, 'day').toDate(), 2),
    companyId: 'COMP-001',
    commitment: getIncidentHash('2', 'commitment'),
    status: 'Not Verified',
    createdAt: dayjs().subtract(5, 'hours').subtract(1, 'day').toDate(),
  },
  '3': {
    id: 'INC-003',
    incident_id: generateIncidentId(dayjs().subtract(3, 'days').toDate(), 3),
    companyId: 'COMP-001',
    commitment: getIncidentHash('3', 'commitment'),
    txHash: getIncidentHash('3', 'txHash'),
    status: 'ZK proof Verified',
    proof: {
      hash: getIncidentHash('3', 'proofHash'),
      size: 2048,
      jsonUrl: '/api/proofs/3.json',
      publicInputs: [getIncidentHash('3', 'publicInput1')],
      txHash: getIncidentHash('3', 'proofTxHash'),
      blockchainStatus: 'Pending',
    },
    createdAt: dayjs().subtract(3, 'days').toDate(),
  },
  '4': {
    id: 'INC-004',
    incident_id: generateIncidentId(dayjs().subtract(1, 'week').toDate(), 4),
    companyId: 'COMP-001',
    commitment: getIncidentHash('4', 'commitment'),
    status: 'Not Verified',
    createdAt: dayjs().subtract(1, 'week').toDate(),
  },
  '5': {
    id: 'INC-005',
    incident_id: generateIncidentId(dayjs().subtract(10, 'minutes').toDate(), 5),
    companyId: 'COMP-001',
    commitment: getIncidentHash('5', 'commitment'),
    txHash: getIncidentHash('5', 'txHash'),
    status: 'ZK proof Verified',
    proof: {
      hash: getIncidentHash('5', 'proofHash'),
      size: 1536,
      jsonUrl: '/api/proofs/5.json',
      publicInputs: [getIncidentHash('5', 'publicInput1'), getIncidentHash('5', 'publicInput2'), getIncidentHash('5', 'publicInput3')],
      txHash: getIncidentHash('5', 'proofTxHash'),
      blockchainStatus: 'Confirmed',
    },
    createdAt: dayjs().subtract(10, 'minutes').toDate(),
  },
  '6': {
    id: 'INC-006',
    incident_id: generateIncidentId(dayjs().subtract(2, 'weeks').toDate(), 6),
    companyId: 'COMP-001',
    commitment: getIncidentHash('6', 'commitment'),
    status: 'ZK proof Verified',
    proof: {
      hash: getIncidentHash('6', 'proofHash'),
      size: 3072,
      jsonUrl: '/api/proofs/6.json',
      publicInputs: [getIncidentHash('6', 'publicInput1')],
      blockchainStatus: 'Pending',
    },
    createdAt: dayjs().subtract(2, 'weeks').toDate(),
  },
  '7': {
    id: 'INC-007',
    incident_id: generateIncidentId(dayjs().subtract(45, 'minutes').toDate(), 7),
    companyId: 'COMP-001',
    commitment: getIncidentHash('7', 'commitment'),
    status: 'Not Verified',
    createdAt: dayjs().subtract(45, 'minutes').toDate(),
  },
  '8': {
    id: 'INC-008',
    incident_id: generateIncidentId(dayjs().subtract(5, 'days').toDate(), 8),
    companyId: 'COMP-001',
    commitment: getIncidentHash('8', 'commitment'),
    txHash: getIncidentHash('8', 'txHash'),
    status: 'ZK proof Verified',
    proof: {
      hash: getIncidentHash('8', 'proofHash'),
      size: 512,
      jsonUrl: '/api/proofs/8.json',
      publicInputs: [getIncidentHash('8', 'publicInput1')],
      txHash: getIncidentHash('8', 'proofTxHash'),
      blockchainStatus: 'Confirmed',
    },
    createdAt: dayjs().subtract(5, 'days').toDate(),
  },

  // COMP-002: 3 incidents
  '9': {
    id: 'INC-009',
    incident_id: generateIncidentId(dayjs().subtract(30, 'minutes').toDate(), 1),
    companyId: 'COMP-002',
    commitment: getIncidentHash('9', 'commitment'),
    status: 'Not Verified',
    createdAt: dayjs().subtract(30, 'minutes').toDate(),
  },
  '10': {
    id: 'INC-010',
    incident_id: generateIncidentId(dayjs().subtract(1, 'week').subtract(2, 'days').toDate(), 2),
    companyId: 'COMP-002',
    commitment: getIncidentHash('10', 'commitment'),
    txHash: getIncidentHash('10', 'txHash'),
    status: 'ZK proof Verified',
    proof: {
      hash: getIncidentHash('10', 'proofHash'),
      size: 4096,
      jsonUrl: '/api/proofs/10.json',
      publicInputs: [getIncidentHash('10', 'publicInput1'), getIncidentHash('10', 'publicInput2')],
      txHash: getIncidentHash('10', 'proofTxHash'),
      blockchainStatus: 'Confirmed',
    },
    createdAt: dayjs().subtract(1, 'week').subtract(2, 'days').toDate(),
  },
  '11': {
    id: 'INC-011',
    incident_id: generateIncidentId(dayjs().subtract(4, 'days').toDate(), 3),
    companyId: 'COMP-002',
    commitment: getIncidentHash('11', 'commitment'),
    status: 'ZK proof Verified',
    proof: {
      hash: getIncidentHash('11', 'proofHash'),
      size: 2560,
      jsonUrl: '/api/proofs/11.json',
      publicInputs: [getIncidentHash('11', 'publicInput1')],
      blockchainStatus: 'Pending',
    },
    createdAt: dayjs().subtract(4, 'days').toDate(),
  },

  // COMP-003: 0 incidents (skipped)

  // COMP-004: 5 incidents
  '12': {
    id: 'INC-012',
    incident_id: generateIncidentId(dayjs().subtract(18, 'minutes').toDate(), 1),
    companyId: 'COMP-004',
    commitment: getIncidentHash('12', 'commitment'),
    status: 'Not Verified',
    createdAt: dayjs().subtract(18, 'minutes').toDate(),
  },
  '13': {
    id: 'INC-013',
    incident_id: generateIncidentId(dayjs().subtract(1, 'day').toDate(), 2),
    companyId: 'COMP-004',
    commitment: getIncidentHash('13', 'commitment'),
    txHash: getIncidentHash('13', 'txHash'),
    status: 'ZK proof Verified',
    proof: {
      hash: getIncidentHash('13', 'proofHash'),
      size: 1792,
      jsonUrl: '/api/proofs/13.json',
      publicInputs: [getIncidentHash('13', 'publicInput1'), getIncidentHash('13', 'publicInput2')],
      blockchainStatus: 'Confirmed',
    },
    createdAt: dayjs().subtract(1, 'day').toDate(),
  },
  '14': {
    id: 'INC-014',
    incident_id: generateIncidentId(dayjs().subtract(6, 'days').toDate(), 3),
    companyId: 'COMP-004',
    commitment: getIncidentHash('14', 'commitment'),
    status: 'Not Verified',
    createdAt: dayjs().subtract(6, 'days').toDate(),
  },
  '15': {
    id: 'INC-015',
    incident_id: generateIncidentId(dayjs().subtract(3, 'weeks').toDate(), 4),
    companyId: 'COMP-004',
    commitment: getIncidentHash('15', 'commitment'),
    status: 'ZK proof Verified',
    proof: {
      hash: getIncidentHash('15', 'proofHash'),
      size: 3584,
      jsonUrl: '/api/proofs/15.json',
      publicInputs: [getIncidentHash('15', 'publicInput1')],
      txHash: getIncidentHash('15', 'proofTxHash'),
      blockchainStatus: 'Failed',
    },
    createdAt: dayjs().subtract(3, 'weeks').toDate(),
  },
  '16': {
    id: 'INC-016',
    incident_id: generateIncidentId(dayjs().subtract(1, 'hour').toDate(), 5),
    companyId: 'COMP-004',
    commitment: getIncidentHash('16', 'commitment'),
    status: 'ZK proof Verified',
    proof: {
      hash: getIncidentHash('16', 'proofHash'),
      size: 1024,
      jsonUrl: '/api/proofs/16.json',
      publicInputs: [getIncidentHash('16', 'publicInput1')],
      blockchainStatus: 'Confirmed',
    },
    createdAt: dayjs().subtract(1, 'hour').toDate(),
  },

  // COMP-005: 10 incidents
  '17': {
    id: 'INC-017',
    incident_id: generateIncidentId(dayjs().subtract(5, 'minutes').toDate(), 1),
    companyId: 'COMP-005',
    commitment: getIncidentHash('17', 'commitment'),
    status: 'ZK proof Verified',
    proof: {
      hash: getIncidentHash('17', 'proofHash'),
      size: 2048,
      jsonUrl: '/api/proofs/17.json',
      publicInputs: [getIncidentHash('17', 'publicInput1')],
      blockchainStatus: 'Pending',
    },
    createdAt: dayjs().subtract(5, 'minutes').toDate(),
  },
  '18': {
    id: 'INC-018',
    incident_id: generateIncidentId(dayjs().subtract(22, 'minutes').toDate(), 2),
    companyId: 'COMP-005',
    commitment: getIncidentHash('18', 'commitment'),
    status: 'Not Verified',
    createdAt: dayjs().subtract(22, 'minutes').toDate(),
  },
  '19': {
    id: 'INC-019',
    incident_id: generateIncidentId(dayjs().subtract(2, 'days').toDate(), 3),
    companyId: 'COMP-005',
    commitment: getIncidentHash('19', 'commitment'),
    txHash: getIncidentHash('19', 'txHash'),
    status: 'ZK proof Verified',
    proof: {
      hash: getIncidentHash('19', 'proofHash'),
      size: 1536,
      jsonUrl: '/api/proofs/19.json',
      publicInputs: [getIncidentHash('19', 'publicInput1'), getIncidentHash('19', 'publicInput2')],
      txHash: getIncidentHash('19', 'proofTxHash'),
      blockchainStatus: 'Confirmed',
    },
    createdAt: dayjs().subtract(2, 'days').toDate(),
  },
  '20': {
    id: 'INC-020',
    incident_id: generateIncidentId(dayjs().subtract(1, 'week').subtract(3, 'days').toDate(), 4),
    companyId: 'COMP-005',
    commitment: getIncidentHash('20', 'commitment'),
    status: 'Not Verified',
    createdAt: dayjs().subtract(1, 'week').subtract(3, 'days').toDate(),
  },
  '21': {
    id: 'INC-021',
    incident_id: generateIncidentId(dayjs().subtract(8, 'days').toDate(), 5),
    companyId: 'COMP-005',
    commitment: getIncidentHash('21', 'commitment'),
    status: 'ZK proof Verified',
    proof: {
      hash: getIncidentHash('21', 'proofHash'),
      size: 3072,
      jsonUrl: '/api/proofs/21.json',
      publicInputs: [getIncidentHash('21', 'publicInput1')],
      blockchainStatus: 'Pending',
    },
    createdAt: dayjs().subtract(8, 'days').toDate(),
  },
  '22': {
    id: 'INC-022',
    incident_id: generateIncidentId(dayjs().subtract(12, 'hours').toDate(), 6),
    companyId: 'COMP-005',
    commitment: getIncidentHash('22', 'commitment'),
    status: 'Not Verified',
    createdAt: dayjs().subtract(12, 'hours').toDate(),
  },
  '23': {
    id: 'INC-023',
    incident_id: generateIncidentId(dayjs().subtract(2, 'weeks').subtract(1, 'day').toDate(), 7),
    companyId: 'COMP-005',
    commitment: getIncidentHash('23', 'commitment'),
    txHash: getIncidentHash('23', 'txHash'),
    status: 'ZK proof Verified',
    proof: {
      hash: getIncidentHash('23', 'proofHash'),
      size: 4096,
      jsonUrl: '/api/proofs/23.json',
      publicInputs: [getIncidentHash('23', 'publicInput1'), getIncidentHash('23', 'publicInput2'), getIncidentHash('23', 'publicInput3')],
      txHash: getIncidentHash('23', 'proofTxHash'),
      blockchainStatus: 'Confirmed',
    },
    createdAt: dayjs().subtract(2, 'weeks').subtract(1, 'day').toDate(),
  },
  '24': {
    id: 'INC-024',
    incident_id: generateIncidentId(dayjs().subtract(35, 'minutes').toDate(), 8),
    companyId: 'COMP-005',
    commitment: getIncidentHash('24', 'commitment'),
    status: 'ZK proof Verified',
    proof: {
      hash: getIncidentHash('24', 'proofHash'),
      size: 512,
      jsonUrl: '/api/proofs/24.json',
      publicInputs: [getIncidentHash('24', 'publicInput1')],
      blockchainStatus: 'Confirmed',
    },
    createdAt: dayjs().subtract(35, 'minutes').toDate(),
  },
  '25': {
    id: 'INC-025',
    incident_id: generateIncidentId(dayjs().subtract(10, 'days').toDate(), 9),
    companyId: 'COMP-005',
    commitment: getIncidentHash('25', 'commitment'),
    status: 'Not Verified',
    createdAt: dayjs().subtract(10, 'days').toDate(),
  },
  '26': {
    id: 'INC-026',
    incident_id: generateIncidentId(dayjs().subtract(3, 'hours').toDate(), 10),
    companyId: 'COMP-005',
    commitment: getIncidentHash('26', 'commitment'),
    status: 'ZK proof Verified',
    proof: {
      hash: getIncidentHash('26', 'proofHash'),
      size: 2560,
      jsonUrl: '/api/proofs/26.json',
      publicInputs: [getIncidentHash('26', 'publicInput1'), getIncidentHash('26', 'publicInput2')],
      blockchainStatus: 'Pending',
    },
    createdAt: dayjs().subtract(3, 'hours').toDate(),
  },

  // COMP-006: 2 incidents
  '27': {
    id: 'INC-027',
    incident_id: generateIncidentId(dayjs().subtract(7, 'days').toDate(), 1),
    companyId: 'COMP-006',
    commitment: getIncidentHash('27', 'commitment'),
    status: 'Not Verified',
    createdAt: dayjs().subtract(7, 'days').toDate(),
  },
  '28': {
    id: 'INC-028',
    incident_id: generateIncidentId(dayjs().subtract(15, 'minutes').toDate(), 2),
    companyId: 'COMP-006',
    commitment: getIncidentHash('28', 'commitment'),
    txHash: getIncidentHash('28', 'txHash'),
    status: 'ZK proof Verified',
    proof: {
      hash: getIncidentHash('28', 'proofHash'),
      size: 1792,
      jsonUrl: '/api/proofs/28.json',
      publicInputs: [getIncidentHash('28', 'publicInput1')],
      txHash: getIncidentHash('28', 'proofTxHash'),
      blockchainStatus: 'Confirmed',
    },
    createdAt: dayjs().subtract(15, 'minutes').toDate(),
  },
};

// Group incidents by company
export const incidentsByCompany: Record<string, Incident[]> = {
  'COMP-001': ['1', '2', '3', '4', '5', '6', '7', '8'].map(id => ({
    id: incidentsFullData[id].id,
    incident_id: incidentsFullData[id].incident_id,
    status: incidentsFullData[id].status,
    createdAt: incidentsFullData[id].createdAt,
  })),
  'COMP-002': ['9', '10', '11'].map(id => ({
    id: incidentsFullData[id].id,
    incident_id: incidentsFullData[id].incident_id,
    status: incidentsFullData[id].status,
    createdAt: incidentsFullData[id].createdAt,
  })),
  'COMP-003': [], // 0 incidents
  'COMP-004': ['12', '13', '14', '15', '16'].map(id => ({
    id: incidentsFullData[id].id,
    incident_id: incidentsFullData[id].incident_id,
    status: incidentsFullData[id].status,
    createdAt: incidentsFullData[id].createdAt,
  })),
  'COMP-005': ['17', '18', '19', '20', '21', '22', '23', '24', '25', '26'].map(id => ({
    id: incidentsFullData[id].id,
    incident_id: incidentsFullData[id].incident_id,
    status: incidentsFullData[id].status,
    createdAt: incidentsFullData[id].createdAt,
  })),
  'COMP-006': ['27', '28'].map(id => ({
    id: incidentsFullData[id].id,
    incident_id: incidentsFullData[id].incident_id,
    status: incidentsFullData[id].status,
    createdAt: incidentsFullData[id].createdAt,
  })),
};

// Function to get incident by ID (by incident_id)
export function getIncidentById(id: string): IncidentDetailsData | undefined {
  // Search by incident_id in incidentsFullData
  return Object.values(incidentsFullData).find(incident => incident.incident_id === id);
}

// Function to get company by ID
export function getCompanyById(id: string) {
  return companies.find(company => company.id === id);
}

// Function to get company name by companyId
export function getCompanyNameByCompanyId(companyId?: string): string | undefined {
  if (!companyId) return undefined;
  return companies.find(c => c.id === companyId)?.name;
}

// Export all incidents with full data
export const allIncidents = incidentsFullData;
