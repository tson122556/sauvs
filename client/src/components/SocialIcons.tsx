/**
 * 官方社交平台图标组件
 * 使用各平台的官方 SVG 图标
 */

export function GoogleIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  );
}

export function MicrosoftIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M11.4 24H0V12.6h11.4V24zM24 24H12.6V12.6H24V24zM11.4 11.4H0V0h11.4v11.4zm12.6 0H12.6V0H24v11.4z" />
    </svg>
  );
}

export function AppleIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M17.05 13.5c-.02-2.82 2.3-4.18 2.41-4.25-1.31-1.92-3.36-2.18-4.09-2.21-1.74-.18-3.4 1.03-4.28 1.03-.88 0-2.24-1.01-3.68-1.01-1.89 0-3.64 1.13-4.62 2.87-1.98 3.43-.51 8.54 1.41 11.34 1.01 1.46 2.2 3.1 3.77 3.04 1.52-.06 2.1-.98 3.94-.98 1.83 0 2.37.98 3.95.94 1.63-.02 2.67-1.49 3.67-2.96 1.15-1.67 1.62-3.29 1.65-3.37-.04-.01-3.2-1.23-3.22-4.86z" />
      <path d="M12.03 5.26c.87-1.06 1.47-2.54 1.31-4.02-1.26.05-2.79.84-3.69 1.89-.81.94-1.52 2.44-1.33 3.88 1.41.11 2.85-.68 3.71-1.75z" />
    </svg>
  );
}

export function WeChatIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M8.5 1C4.36 1 1 3.68 1 7c0 2.34 1.53 4.37 3.85 5.4-.16 1.13-.84 3.18-2.45 5.33.89-.28 2.87-.89 4.85-2.3 1.15.28 2.38.44 3.75.44 4.14 0 7.5-2.68 7.5-6 0-3.32-3.36-6-7.5-6z" />
      <path d="M18.5 11c-2.76 0-5 1.79-5 4s2.24 4 5 4c.84 0 1.64-.16 2.38-.44 1.98 1.41 3.96 2.02 4.85 2.3-1.61-2.15-2.29-4.2-2.45-5.33C21.47 15.37 23 13.34 23 11c0-2.21-2.24-4-5-4z" />
    </svg>
  );
}

export function InstagramIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="instagram-gradient" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#feda75" />
          <stop offset="5%" stopColor="#fa7e1e" />
          <stop offset="45%" stopColor="#d92e7f" />
          <stop offset="60%" stopColor="#9b36b7" />
          <stop offset="90%" stopColor="#515bd4" />
        </linearGradient>
      </defs>
      <rect x="2" y="2" width="20" height="20" rx="5" fill="url(#instagram-gradient)" />
      <circle cx="12" cy="12" r="3.5" fill="white" />
      <circle cx="18" cy="6" r="1" fill="white" />
    </svg>
  );
}
