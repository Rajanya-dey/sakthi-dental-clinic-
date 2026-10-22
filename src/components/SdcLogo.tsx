import React from 'react';

interface SdcLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showTagline?: boolean;
}

export const SdcLogo: React.FC<SdcLogoProps> = ({
  className = '',
  size = 'md',
  showTagline = false
}) => {
  const sizeMap = {
    sm: { tooth: 28, height: 32, sakthi: 'text-base sm:text-lg', dental: 'text-[11px] sm:text-xs' },
    md: { tooth: 36, height: 40, sakthi: 'text-lg sm:text-2xl', dental: 'text-xs sm:text-sm' },
    lg: { tooth: 48, height: 52, sakthi: 'text-2xl sm:text-3xl', dental: 'text-sm sm:text-base' },
    xl: { tooth: 64, height: 68, sakthi: 'text-3xl sm:text-4xl', dental: 'text-lg sm:text-xl' }
  };

  const current = sizeMap[size];

  return (
    <div className={`flex items-center gap-2 sm:gap-3 select-none ${className}`}>
      {/* Blue Tooth Emblem matching SDC Logo */}
      <svg
        width={current.tooth}
        height={current.tooth * 1.05}
        viewBox="0 0 100 105"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 transition-transform duration-300 hover:scale-105"
      >
        <path
          d="M26 14C12 26 8 46 12 62C15 74 21 86 28 98C32 99 35 94 36 88C37 77 34 68 37 57C41 43 59 43 63 57C66 68 63 77 64 88C65 94 68 99 72 98C79 86 85 74 88 62C92 46 88 26 74 14C65 6 56 12 50 16C44 12 35 6 26 14Z"
          stroke="#2563eb"
          strokeWidth="7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Inner swoop accents matching logo */}
        <path
          d="M25 28C32 20 40 25 45 29"
          stroke="#2563eb"
          strokeWidth="6"
          strokeLinecap="round"
        />
        <path
          d="M36 78C39 70 43 65 50 65C57 65 61 70 64 78"
          stroke="#2563eb"
          strokeWidth="6"
          strokeLinecap="round"
        />
      </svg>

      {/* Typography: SAKTHI in bold red, Dental Clinic in blue */}
      <div className="flex flex-col justify-center leading-tight">
        <span
          className={`font-extrabold tracking-wider text-red-700 font-sans uppercase ${current.sakthi}`}
          style={{ letterSpacing: '0.04em' }}
        >
          SAKTHI
        </span>
        <span
          className={`font-bold text-blue-600 font-serif italic ${current.dental}`}
          style={{ letterSpacing: '0.02em', marginTop: '-2px' }}
        >
          Dental Clinic
        </span>
        {showTagline && (
          <span className="text-[10px] text-slate-500 font-medium tracking-wide uppercase mt-0.5 hidden sm:inline-block">
            Hosur • Care For Women & Children
          </span>
        )}
      </div>
    </div>
  );
};
