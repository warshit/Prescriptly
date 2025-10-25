import React from 'react';

const Loader: React.FC<{ message: string }> = ({ message }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center p-8">
      <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-brand-primary-dark"></div>
      <p className="mt-4 text-lg font-semibold text-gray-700">{message}</p>
      <p className="mt-1 text-sm text-gray-500">This may take a few moments.</p>
    </div>
  );
};

export default Loader;