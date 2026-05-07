/// <reference types="vite/client" />

declare module '*.jpg?product' {
  const src: import('vite-imagetools').Picture;
  export default src;
}

declare module '*.jpg?thumb' {
  const src: import('vite-imagetools').Picture;
  export default src;
}

declare module '*.csv?raw' {
  const content: string;
  export default content;
}
