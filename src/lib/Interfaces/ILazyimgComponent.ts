/**
 * @description the interface for the LazyImgComponent
 */
export interface ILazyimgComponent {
  startLoadHandler;
  src: string;
  srcset: string;
  order: number | undefined;
  load: boolean;
  applySources: boolean;
}
/*

/!**
 * @description used for the service that requires the #load property to always be present - this is handled in the component
 * as it should just set the default for #load if not provided in any input
 *!/
export interface ILazyImgAsProvidedToService extends ILazyimgComponent {
  load: boolean;
}
*/
