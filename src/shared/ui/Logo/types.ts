export interface SimpleLogoProps {
  width?: number;
  height?: number;
}

export interface LayeredLogoProps extends SimpleLogoProps {
  color?: string;
}

export type LogoProps =
  | ({variant: 'simple'} & SimpleLogoProps)
  | ({variant: 'double'} & LayeredLogoProps);
