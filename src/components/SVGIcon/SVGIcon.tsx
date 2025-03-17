import { FC } from 'react';
import { IconProps, icons } from '@app/components/SVGIcon/SVGIcon.utils';

const SVGIcon: FC<IconProps> = ({ onClick, icon, width, height, color, className, stroke, strokeWidth }) => {
  const IconComponent = icons[icon];
  return IconComponent ? (
    <span onClick={onClick}>{IconComponent({ width, height, color, className, stroke, strokeWidth })}</span>
  ) : null;
};

export default SVGIcon;
