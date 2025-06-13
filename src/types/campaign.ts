
export interface BuilderBlock {
  id: string;
  type: 'client' | 'application' | 'platform' | 'campaign' | 'adset' | 'creative';
  props: Record<string, any>;
  layout: {
    x: number;
    y: number;
    w: number;
    h: number;
  };
  isValid: boolean;
}
