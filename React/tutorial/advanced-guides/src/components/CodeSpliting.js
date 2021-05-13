import React, { Suspense } from 'react';
import ErrorBoundary from './children/ErrorBoundary';

const OtherComponent = React.lazy(() => import('./children/LazyComponent'));

const Component = () => {
  return (
    <div>
      <ErrorBoundary>
        <Suspense fallback={<div>loading...</div>}>
          <OtherComponent />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};

export default Component;
