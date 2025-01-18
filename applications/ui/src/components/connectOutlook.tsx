import React from 'react';

const ConnectOutlook = () => {
  const handleConnect = async () => {
    const response = await fetch('/auth/outlook');
    const { url } = await response.json();
    window.location.href = url;
  };

  return (
    <button onClick={handleConnect} className="bg-blue-500 text-white px-4 py-2 rounded-md">
      Connect Outlook Calendar
    </button>
  );
};

export default ConnectOutlook;