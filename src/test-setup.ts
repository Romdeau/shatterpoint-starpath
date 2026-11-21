import { afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';

Object.defineProperty(window, 'matchMedia', { writable: true, value: (query: string) => ({
  matches: false, media: query, addEventListener() {}, removeEventListener() {},
}) });
afterEach(() => { cleanup(); localStorage.clear(); });

vi.stubGlobal('ResizeObserver', class { observe() {} unobserve() {} disconnect() {} });
Element.prototype.scrollIntoView = () => {};
