import React from 'react';

export default function SkeletonLoader({ type = 'card', count = 1 }) {
  const renderSkeleton = () => {
    switch (type) {
      case 'header':
        return (
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-700 rounded w-1/3"></div>
            <div className="h-4 bg-gray-700 rounded w-1/2"></div>
          </div>
        );

      case 'section-title':
        return (
          <div className="animate-pulse">
            <div className="h-6 bg-gray-700 rounded w-1/4"></div>
          </div>
        );

      case 'card':
        return (
          <div className="animate-pulse bg-surface p-4 rounded-lg">
            <div className="aspect-square bg-gray-700 rounded-lg mb-4"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-700 rounded w-3/4"></div>
              <div className="h-3 bg-gray-700 rounded w-1/2"></div>
            </div>
          </div>
        );

      case 'track':
        return (
          <div className="animate-pulse flex items-center space-x-4 p-2">
            <div className="w-10 h-10 bg-gray-700 rounded"></div>
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-gray-700 rounded w-3/4"></div>
              <div className="h-3 bg-gray-700 rounded w-1/2"></div>
            </div>
            <div className="h-3 bg-gray-700 rounded w-12"></div>
          </div>
        );

      case 'search-header':
        return (
          <div className="animate-pulse">
            <div className="h-12 bg-gray-700 rounded-full w-full max-w-md"></div>
          </div>
        );

      case 'category':
        return (
          <div className="animate-pulse">
            <div className="h-24 bg-gray-700 rounded-lg"></div>
          </div>
        );

      case 'library-header':
        return (
          <div className="animate-pulse flex justify-between items-center">
            <div className="h-8 bg-gray-700 rounded w-1/4"></div>
            <div className="flex space-x-2">
              <div className="h-8 bg-gray-700 rounded w-16"></div>
              <div className="h-8 bg-gray-700 rounded w-20"></div>
              <div className="h-8 bg-gray-700 rounded w-16"></div>
            </div>
          </div>
        );

      case 'playlist-header':
        return (
          <div className="animate-pulse flex flex-col md:flex-row items-start md:items-end space-y-4 md:space-y-0 md:space-x-6">
            <div className="w-48 h-48 md:w-56 md:h-56 bg-gray-700 rounded-lg"></div>
            <div className="flex-1 space-y-4">
              <div className="h-4 bg-gray-700 rounded w-20"></div>
              <div className="h-12 bg-gray-700 rounded w-3/4"></div>
              <div className="h-4 bg-gray-700 rounded w-1/2"></div>
              <div className="h-3 bg-gray-700 rounded w-1/3"></div>
            </div>
          </div>
        );

      default:
        return (
          <div className="animate-pulse bg-gray-700 rounded h-4 w-full"></div>
        );
    }
  };

  return (
    <>
      {Array.from({ length: count }, (_, index) => (
        <div key={index}>
          {renderSkeleton()}
        </div>
      ))}
    </>
  );
}