export interface Session {
  state: string | undefined;
  order: {
    type?: string;
    breadType?: string;
    amount?: number;
    time?: string;
    name?: string;
    phone?: string;
    block?: string;
    entrance?: string;
    unit?: string;
    plaque?: string;
    floor?: string;
    days?: string[];
  };
}
