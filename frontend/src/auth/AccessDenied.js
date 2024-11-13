const AccessDenied = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <div className="p-4 bg-white shadow-sm">
        <h1 className="text-lg font-medium">LGM Admin Portal</h1>
      </div>

      {/* Main Content */}
      <div className="flex-grow flex flex-col items-center justify-center p-4">
        <h2 className="text-2xl font-medium mb-2">Access Denied</h2>
        <p className="text-gray-600 mb-6">
          You are not authorized to access this page.
        </p>
        <a
          href="/"
          className="bg-green-500 text-white py-2 px-6 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
        >
          Go back to home
        </a>
      </div>
    </div>
  );
};

export default AccessDenied;
