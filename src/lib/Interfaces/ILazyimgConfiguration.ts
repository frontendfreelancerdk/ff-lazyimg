export interface ILazyimgImageConfig {
  tryWebp?: boolean;
  dimensions?: {
    /**
     *@description the ratio between width and height e.g. 0.5 the width is 100 the height is 50
     */
    ratio?: number;
    width?: number;
    height?: number;
  }
}

export interface ILazyimgConfiguration {
  /**
   * @description the order the image should be loaded in - makes it possible to make priorities in lazy loading
   */
  order?: number;
  src: string;
  srcset?: string;
  srcByBreakpoint?: [any];
  style?: any;
  load?: boolean;
  name?: string;
  alt?: string;
  // can contain configurations for the image
  imageConfig?: ILazyimgImageConfig
}
