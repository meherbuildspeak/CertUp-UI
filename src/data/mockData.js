import {
  Folder,
  FileX,
  TriangleAlert,
  Clock,
  FileSearch,
  GitCompare,
  ListChecks,
  Users,
  Lock,
  Zap,
} from 'lucide-react'

export const mockChallenges = [
  {
    icon: Folder,
    title: 'Fragmented Documents',
    description:
      'Policies scattered across different folders, formats, and versions with no consolidated view.',
  },
  {
    icon: FileX,
    title: 'No Standards Mapping',
    description:
      "Existing documents aren't clearly mapped to ISO requirements, making readiness unclear.",
  },
  {
    icon: TriangleAlert,
    title: 'Overlaps & Conflicts',
    description:
      'Multiple policies creating confusion with duplicated effort and conflicting instructions.',
  },
  {
    icon: Clock,
    title: 'Limited Resources',
    description:
      'No time or expertise to manually review every policy against standards line by line.',
  },
]

export const mockFeatures = [
  {
    icon: FileSearch,
    title: 'Intelligent Document Analysis',
    description:
      'AI-powered scanning of your existing policies against ISO requirements.',
  },
  {
    icon: GitCompare,
    title: 'Gap Identification',
    description:
      'Clearly see which policy areas are covered, partially covered, or completely missing.',
  },

  {
    icon: Users,
    title: 'Non-Technical Interface',
    description:
      'Designed for founders and managers, not just compliance experts.',
  },
  {
    icon: Lock,
    title: 'Standards Alignment',
    description:
      'Automatic mapping to ISO standards and other compliance frameworks.',
  },
  {
    icon: Zap,
    title: 'Minutes, Not Months',
    description:
      'Get comprehensive analysis results in minutes instead of weeks of manual work.',
  },
]

export const mockDashboardStats = {
  overallReadiness: 78,
  targetStandard: 'ISO 27001:2022',
  policiesAnalyzed: 14,
  criticalGaps: 3,
  categories: [
    { name: 'Information Security Policies (A.5)', status: 'Covered', score: 92 },
    { name: 'Organization of Information Security (A.6)', status: 'Covered', score: 88 },
    { name: 'Human Resource Security (A.7)', status: 'Partial', score: 65 },
    { name: 'Asset Management (A.8)', status: 'Covered', score: 90 },
    { name: 'Access Control (A.9)', status: 'Partial', score: 58 },
    { name: 'Cryptography (A.10)', status: 'Missing', score: 20 },
    { name: 'Physical & Environmental Security (A.11)', status: 'Covered', score: 85 },
    { name: 'Operations Security (A.12)', status: 'Partial', score: 70 },
    { name: 'Communications Security (A.13)', status: 'Missing', score: 35 },
    { name: 'Supplier Relationships (A.15)', status: 'Covered', score: 82 },
    { name: 'Incident Management (A.16)', status: 'Covered', score: 94 },
    { name: 'Business Continuity (A.17)', status: 'Missing', score: 15 },
  ],
  actionPlan: [
    {
      id: 'ACT-101',
      priority: 'High',
      title: 'Draft Cryptographic & Encryption Management Policy',
      category: 'Cryptography (A.10)',
      impact: 'Critical for ISO 27001 Annex A.10 certification',
      estimatedHours: 6,
    },
    {
      id: 'ACT-102',
      priority: 'High',
      title: 'Establish Business Continuity & Disaster Recovery Procedure',
      category: 'Business Continuity (A.17)',
      impact: 'Eliminates major audit non-conformity risk',
      estimatedHours: 12,
    },
    {
      id: 'ACT-103',
      priority: 'Medium',
      title: 'Update Access Control Policy with Multi-Factor Auth Mandate',
      category: 'Access Control (A.9)',
      impact: 'Removes security gap in administrative access',
      estimatedHours: 4,
    },
  ],
}
