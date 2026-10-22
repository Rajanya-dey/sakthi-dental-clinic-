import React from 'react';

interface FacilityIconProps {
  name: 'city-center' | 'parking' | 'doctors' | 'pickup' | 'wheelchair';
  className?: string;
  size?: number;
}

export const FacilityIcon: React.FC<FacilityIconProps> = ({
  name,
  className = '',
  size = 56
}) => {
  const strokeColor = '#db2777'; // Accent pink matching client icons
  const strokeWidth = 2.5;

  switch (name) {
    case 'city-center':
      // Skyline with skyscrapers, windows, and rounded foliage base
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
        >
          {/* Central high tower */}
          <path
            d="M32 4L42 13V56H22V13L32 4Z"
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Tower markings */}
          <line x1="32" y1="18" x2="32" y2="22" stroke={strokeColor} strokeWidth={strokeWidth} strokeLinecap="round" />
          <line x1="32" y1="28" x2="32" y2="32" stroke={strokeColor} strokeWidth={strokeWidth} strokeLinecap="round" />
          <line x1="32" y1="38" x2="32" y2="42" stroke={strokeColor} strokeWidth={strokeWidth} strokeLinecap="round" />
          {/* Left building */}
          <path
            d="M12 22L22 17V56H12V22Z"
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <line x1="17" y1="28" x2="17" y2="32" stroke={strokeColor} strokeWidth={strokeWidth} strokeLinecap="round" />
          <line x1="17" y1="38" x2="17" y2="42" stroke={strokeColor} strokeWidth={strokeWidth} strokeLinecap="round" />
          {/* Right building */}
          <path
            d="M42 17L52 23V56H42V17Z"
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <line x1="47" y1="28" x2="47" y2="32" stroke={strokeColor} strokeWidth={strokeWidth} strokeLinecap="round" />
          <line x1="47" y1="38" x2="47" y2="42" stroke={strokeColor} strokeWidth={strokeWidth} strokeLinecap="round" />
          {/* Rounded shrub/trees at base */}
          <path
            d="M6 56C6 48 14 48 14 56M50 56C50 48 58 48 58 56"
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />
          <line x1="4" y1="56" x2="60" y2="56" stroke={strokeColor} strokeWidth={strokeWidth} strokeLinecap="round" />
        </svg>
      );

    case 'doctors':
      // Female doctor with stethoscope surrounded by medical colleagues
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
        >
          {/* Center doctor head & hair bun */}
          <circle cx="32" cy="18" r="6" stroke={strokeColor} strokeWidth={strokeWidth} />
          <path d="M26 13C26 8 38 8 38 13" stroke={strokeColor} strokeWidth={strokeWidth} strokeLinecap="round" />
          {/* Center doctor body */}
          <path
            d="M21 52V42C21 35 43 35 43 42V52"
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />
          {/* Stethoscope */}
          <path
            d="M28 35V42C28 45 36 45 36 42V35"
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />
          <circle cx="32" cy="46" r="2.5" stroke={strokeColor} strokeWidth={strokeWidth} />
          {/* Left assistant doctor */}
          <circle cx="14" cy="24" r="4.5" stroke={strokeColor} strokeWidth={strokeWidth} />
          <path d="M7 52V46C7 41 21 41 21 46" stroke={strokeColor} strokeWidth={strokeWidth} strokeLinecap="round" />
          {/* Right assistant doctor */}
          <circle cx="50" cy="24" r="4.5" stroke={strokeColor} strokeWidth={strokeWidth} />
          <path d="M43 46C43 41 57 41 57 46V52" stroke={strokeColor} strokeWidth={strokeWidth} strokeLinecap="round" />
        </svg>
      );

    case 'parking':
      // Parking sign with 'P' and car next to it
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
        >
          {/* Parking sign post */}
          <rect x="18" y="10" width="18" height="18" rx="2" stroke={strokeColor} strokeWidth={strokeWidth} />
          <path d="M24 23V15H29C30.5 15 32 16 32 17.5C32 19 30.5 20 29 20H24" stroke={strokeColor} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
          <path d="M13 13H18M13 25H18M15 10V52" stroke={strokeColor} strokeWidth={strokeWidth} strokeLinecap="round" />
          {/* Ground base for pole */}
          <line x1="8" y1="52" x2="22" y2="52" stroke={strokeColor} strokeWidth={strokeWidth} strokeLinecap="round" />
          {/* Car body */}
          <path
            d="M28 42L33 32H49L54 42"
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <rect x="25" y="42" width="32" height="7" rx="3.5" stroke={strokeColor} strokeWidth={strokeWidth} />
          {/* Car wheels */}
          <circle cx="31" cy="51" r="3" stroke={strokeColor} strokeWidth={strokeWidth} />
          <circle cx="51" cy="51" r="3" stroke={strokeColor} strokeWidth={strokeWidth} />
        </svg>
      );

    case 'pickup':
      // Mobile phone with checkmark + taxi/car with pin
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
        >
          {/* Smartphone */}
          <rect x="8" y="8" width="22" height="48" rx="4" stroke={strokeColor} strokeWidth={strokeWidth} />
          <circle cx="19" cy="27" r="7" stroke={strokeColor} strokeWidth={strokeWidth} />
          <path d="M16 27L18.5 29.5L22.5 24.5" stroke={strokeColor} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
          <line x1="16" y1="50" x2="22" y2="50" stroke={strokeColor} strokeWidth={strokeWidth} strokeLinecap="round" />
          {/* Location Pin */}
          <path
            d="M48 10C44 10 41 13 41 17C41 23 48 29 48 29C48 29 55 23 55 17C55 13 52 10 48 10Z"
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="48" cy="17" r="2.5" stroke={strokeColor} strokeWidth={strokeWidth} />
          {/* Cab / Car */}
          <path
            d="M34 45L37 38H55L58 45"
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <rect x="32" y="45" width="28" height="6" rx="3" stroke={strokeColor} strokeWidth={strokeWidth} />
          <circle cx="38" cy="53" r="2.5" stroke={strokeColor} strokeWidth={strokeWidth} />
          <circle cx="54" cy="53" r="2.5" stroke={strokeColor} strokeWidth={strokeWidth} />
        </svg>
      );

    case 'wheelchair':
      // Patient wheelchair
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
        >
          {/* Head */}
          <circle cx="28" cy="14" r="5" stroke={strokeColor} strokeWidth={strokeWidth} />
          {/* Body and back rest */}
          <path
            d="M14 16H20V34H36L44 48"
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Arm and legs */}
          <path
            d="M26 24H35V34"
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Wheelchair main wheel */}
          <circle cx="28" cy="42" r="12" stroke={strokeColor} strokeWidth={strokeWidth} />
          <circle cx="28" cy="42" r="2.5" fill={strokeColor} />
          <line x1="28" y1="30" x2="28" y2="42" stroke={strokeColor} strokeWidth={strokeWidth} strokeLinecap="round" />
          <line x1="16" y1="42" x2="28" y2="42" stroke={strokeColor} strokeWidth={strokeWidth} strokeLinecap="round" />
          {/* Small front wheel */}
          <circle cx="48" cy="51" r="3" stroke={strokeColor} strokeWidth={strokeWidth} />
          <line x1="44" y1="48" x2="48" y2="51" stroke={strokeColor} strokeWidth={strokeWidth} strokeLinecap="round" />
        </svg>
      );

    default:
      return null;
  }
};
