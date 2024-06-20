type SvgInHtml = HTMLElement & SVGElement

export type AnyImage = 
  | string 
  | File 
  | SvgInHtml
  | SVGElement
  | HTMLImageElement 
  | HTMLCanvasElement