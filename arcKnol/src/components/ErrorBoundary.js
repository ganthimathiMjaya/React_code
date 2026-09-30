// import React from 'react';
// import ReactDOM from 'react-dom';
// import { ErrorBoundary } from 'react-error-boundary';
// import ErrorFallback from './ErrorFallback';

// const SomeComponent = () => {
//   // Simulate an error
//   throw new Error('Test error in SomeComponent');
//   return <div>Some Component</div>;
// };

// const App = () => {
//   return (
//     <div>
//       <h1>My React App</h1>
//       <ErrorBoundary
//         FallbackComponent={ErrorFallback}
//         onReset={() => {
//           // Reset any state or cleanup after the error
//           console.log('Resetting after error.');
//         }}
//       >
//         <SomeComponent />
//       </ErrorBoundary>
//     </div>
//   );
// };

// const rootElement = document.getElementById('root');
// ReactDOM.render(<App />, rootElement);
