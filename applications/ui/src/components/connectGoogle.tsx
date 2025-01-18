import React from 'react';

const ConnectGoogle = () => {
  const handleConnect = async () => {
    const response = await fetch('/auth/google');
    const { url } = await response.json();
    window.location.href = url;
  };

  return (
    <button onClick={handleConnect} className="bg-purple-500 text-white px-4 py-2 rounded-md">
      Connect Google Calendar
    </button>
  );
};

export default ConnectGoogle;