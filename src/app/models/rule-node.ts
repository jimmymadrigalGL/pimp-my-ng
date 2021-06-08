export type Source = 'Other' | 'Client' | 'GL' | 'AG';
export type NodeType = 'File' | 'Section' | 'Rule';
export type Recomendation = 'Do' | 'Consider' | 'Avoid';

export interface RuleNode {
  index: number;
  label: string;
  type: NodeType;
  source?: Source;
  recomendation?: Recomendation;
  reference?: string;
  automatic?: boolean;
  children: RuleNode[];
  checked?: boolean;
}
