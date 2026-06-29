// data/types.ts
export interface Question {
  id: number;
  title: string;
  definition: string;
  answer: string | StructuredAnswer;
}

export interface StructuredAnswer {
  steps?: Step[];
  sections?: Section[];
  methods?: Method[];
  keyPoints?: string[];
  examples?: Example[];
  summary?: string;
}

export interface Step {
  title: string;
  description: string;
  code: string;
  pros?: string;
  cons?: string;
}

export interface Section {
  title: string;
  description: string;
  example: string;
  whenToUse?: string;
}

export interface Method {
  method: string;
  syntax: string;
  example: string;
  pros: string;
  cons: string;
}

export interface Example {
  method: string;
  code: string;
}