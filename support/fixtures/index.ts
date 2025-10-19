import { mergeTests } from '@playwright/test';
import { pageInstance } from './pageManager';

export const test = mergeTests(pageInstance);