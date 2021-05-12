import React, { Suspense } from 'react';

const OtherComponent = React.lazy(() => import('./LazyComponent'));

const Component = () => {
  return (
    <div>
      <Suspense fallback={<div>loading...</div>}>
        <OtherComponent />
      </Suspense>
    </div>
  );
};

export default Component;
