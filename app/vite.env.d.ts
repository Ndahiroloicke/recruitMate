/// <reference types="vite/client" />

declare module '*.md' {
    const attributes: {
        url: string
        title: string
        date: Date
        color: 'contrast' | 'primary' | 'secondary' | 'green' | 'blue' | 'beige'
        authors: Array<string>
        cover: string
    }

    const html: string
    export { html }
}

declare module 'pdfjs-dist/legacy/build/pdf';
