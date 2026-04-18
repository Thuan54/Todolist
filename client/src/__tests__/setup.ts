import '@testing-library/jest-dom';

// Declare 'importMeta' on the global scope so TypeScript recognizes it
declare global {
  var importMeta: { env: Record<string, string> };
}

// Safely assign the mock environment variables
globalThis.importMeta = {
  env: { VITE_API_URL: 'http://localhost:5000' }
};

export {};