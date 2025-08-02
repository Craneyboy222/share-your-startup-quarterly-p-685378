import React from 'react';

export function LoadingSpinner() {
  return <div className="spinner">Loading...</div>;
}

export function ErrorNotification({ message }: { message: string }) {
  return <div className="error-notification">{message}</div>;
}

// More UI components can be added here