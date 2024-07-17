declare module 'tailwindcss/lib/util/flattenColorPalette' {
    import { ColorValue } from 'tailwindcss';
  
    function flattenColorPalette(colors: Record<string, ColorValue>): Record<string, string>;
  
    export default flattenColorPalette;
  }
  