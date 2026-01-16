
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

export type TemplateId = 'one-cup' | 'zen' | 'cosmic' | 'bauhaus';

export interface Template {
  id: TemplateId;
  name: string;
  description: string;
  previewColor: string;
}

export const TEMPLATES: Template[] = [
  { id: 'one-cup', name: '经典一格', description: '极简清新的生活指引', previewColor: '#8cc63f' },
  { id: 'zen', name: '禅意留白', description: '宁静致远的冥想风格', previewColor: '#d4c9b9' },
  { id: 'cosmic', name: '星辰深邃', description: '宇宙尺度的宏大智慧', previewColor: '#2d3436' },
  { id: 'bauhaus', name: '现代主义', description: '理性与美感的几何碰撞', previewColor: '#e74c3c' },
];
