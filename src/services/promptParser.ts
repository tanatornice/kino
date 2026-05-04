export type Template = 'text-stagger' | 'logo-reveal' | 'chart-build';

export interface TextStaggerParams extends Record<string, unknown> {
  text: string;
  color: string;
  background: string;
}

export interface LogoRevealParams extends Record<string, unknown> {
  label: string;
  color: string;
  background: string;
}

export interface ChartBuildParams extends Record<string, unknown> {
  data: number[];
  color: string;
  background: string;
}

export type TemplateParams = TextStaggerParams | LogoRevealParams | ChartBuildParams;

export interface ParseResult {
  template: Template;
  compositionId: 'TextStagger' | 'LogoReveal' | 'ChartBuild';
  inputProps: TemplateParams;
}

// Quoted-text extraction: "animate 'HELLO'" or animate "HELLO"
function extractQuotedText(prompt: string): string | null {
  const match = prompt.match(/["']([^"']{1,80})["']/);
  return match ? match[1].trim() : null;
}

// Pull bare numbers out of the prompt for chart data
function extractNumbers(prompt: string): number[] {
  const found = prompt.match(/\b\d+(\.\d+)?\b/g);
  if (found && found.length >= 2) {
    return found.slice(0, 8).map(Number);
  }
  return [65, 80, 45, 90, 70];
}

// Detect hex or named colour in the prompt ("in red", "#ff0000")
function extractColor(prompt: string): string {
  const hex = prompt.match(/#[0-9a-fA-F]{3,6}/);
  if (hex) return hex[0];

  const named: Record<string, string> = {
    red: '#ff3333', blue: '#3b82f6', green: '#22c55e',
    yellow: '#facc15', purple: '#a855f7', orange: '#f97316',
    pink: '#ec4899', white: '#ffffff', black: '#000000',
  };
  for (const [name, hex] of Object.entries(named)) {
    if (prompt.toLowerCase().includes(name)) return hex;
  }
  return '#ffffff';
}

export function parsePrompt(prompt: string): ParseResult {
  const lower = prompt.toLowerCase();
  const color = extractColor(prompt);
  const background = '#0a0a0a';

  // Logo / SVG / draw keywords → Pattern C
  if (
    lower.includes('logo') ||
    lower.includes('draw') ||
    lower.includes('trace') ||
    lower.includes('svg') ||
    lower.includes('reveal') ||
    lower.includes('outline')
  ) {
    const label = extractQuotedText(prompt) ?? 'KINO';
    return {
      template: 'logo-reveal',
      compositionId: 'LogoReveal',
      inputProps: { label: label.toUpperCase(), color, background },
    };
  }

  // Chart / data / graph keywords → bar chart
  if (
    lower.includes('chart') ||
    lower.includes('bar') ||
    lower.includes('graph') ||
    lower.includes('data') ||
    lower.includes('stat')
  ) {
    return {
      template: 'chart-build',
      compositionId: 'ChartBuild',
      inputProps: { data: extractNumbers(prompt), color, background },
    };
  }

  // Default → text stagger (Pattern A)
  const text = extractQuotedText(prompt) ?? 'KINO';
  return {
    template: 'text-stagger',
    compositionId: 'TextStagger',
    inputProps: { text: text.toUpperCase(), color, background },
  };
}
