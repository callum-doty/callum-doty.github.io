import { readFileSync } from 'node:fs';
import { parse } from 'yaml';

export interface SiteLink {
  label: string;
  url: string;
  icon: 'github' | 'linkedin' | 'email';
}

export interface SiteConfig {
  name: string;
  tagline: string;
  url: string;
  description: string;
  links: SiteLink[];
}

export const site: SiteConfig = parse(readFileSync('config/site.yaml', 'utf8'));
