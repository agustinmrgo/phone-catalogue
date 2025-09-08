import type { FC } from 'react';

type LoaderSize = 'sm' | 'md' | 'lg' | 'xl';

interface LoaderProps {
  size?: LoaderSize;
  text?: string;
}

const Loader: FC<LoaderProps> = ({ size = 'md', text = 'Loading...' }) => {
  const sizeClasses: Record<LoaderSize, string> = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
    xl: 'h-16 w-16'
  };

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div className={`loading-spinner ${sizeClasses[size]}`}></div>
      <p className="mt-4 text-gray-600 text-sm">{text}</p>
    </div>
  );
};

export default Loader;
