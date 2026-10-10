/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_OPENSTREETMAP_API_KEY: string;
  readonly VITE_OSM_API_KEY: string;
  readonly GEMINI_API_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
