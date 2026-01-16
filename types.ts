
export interface ComparisonRow {
  dimension: string;
  optionA: string;
  optionB: string;
}

export interface AnswerData {
  title: string;
  subtitle: string;
  category: string;
  subheading: string;
  subheadingEn: string;
  tableHeaderA: string;
  tableHeaderB: string;
  comparison: ComparisonRow[];
  conclusion: string;
  conclusionEn: string;
}

export enum AppState {
  HOME = 'HOME',
  LOADING = 'LOADING',
  RESULT = 'RESULT'
}
