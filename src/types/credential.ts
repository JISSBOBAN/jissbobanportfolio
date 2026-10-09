export interface Credential {
  id: string;
  title: string;
  issuer: 'Microsoft' | 'Anthropic' | 'IISc Bangalore / NPTEL' | 'State Govt / KTU';
  issueDate: string;
  expiryDate?: string;
  credentialId?: string;
  verificationUrl?: string;
  badgeTag?: string;
  skills?: string;
}

export interface Award {
  id: string;
  title: string;
  category: string;
  description: string;
  presentedBy: string;
}
