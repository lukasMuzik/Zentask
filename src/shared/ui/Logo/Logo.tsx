import {SimpleLogo} from './SimpleLogo';
import {LayeredLogo} from './LayeredLogo';
import {LogoProps} from '.';

export function Logo(props: LogoProps) {
  if (props.variant === 'simple') {
    return <SimpleLogo {...props} />;
  }

  return <LayeredLogo {...props} />;
}
