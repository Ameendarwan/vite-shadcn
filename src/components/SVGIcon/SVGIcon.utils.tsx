import { ReactElement } from 'react';

export const ICON_NAMES = [


  'edit-pencil',


] as const;

export type IconNames = (typeof ICON_NAMES)[number];

export interface IconProps {
  icon: IconNames;
  width?: number;
  height?: number;
  color?: string;
  className?: string;
  stroke?: string;
  strokeWidth?: string;
  onClick?: () => void;
}

// Icon collection with multiple SVG icons stored as key-value pairs
export const icons: Record<IconNames, (props: Partial<IconProps>) => ReactElement> = {

  'edit-pencil': ({ width = 14, height = 12, color = 'fill-primary' }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      style={{
        height,
        width,
      }}
      viewBox="0 0 16 16"
      fill="none">
      <path
        d="M1.77778 0C0.791111 0 0 0.791111 0 1.77778V14.2222C0 14.6937 0.187301 15.1459 0.520699 15.4793C0.854097 15.8127 1.30628 16 1.77778 16H14.2222C14.6937 16 15.1459 15.8127 15.4793 15.4793C15.8127 15.1459 16 14.6937 16 14.2222V8H14.2222V14.2222H1.77778V1.77778H8V0H1.77778ZM13.1378 0.888889C12.9867 0.888889 12.8267 0.951111 12.7111 1.06667L11.6267 2.14222L13.8489 4.36444L14.9333 3.28889C15.1644 3.05778 15.1644 2.66667 14.9333 2.44444L13.5556 1.06667C13.44 0.951111 13.2889 0.888889 13.1378 0.888889ZM10.9956 2.77333L4.44444 9.33333V11.5556H6.66667L13.2178 4.99556L10.9956 2.77333Z"
        className={color}
      />
    </svg>
  ),

};
