export default function LoadingSpinner() {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray-100 p-4">
      <div className="flex flex-col items-center space-y-4">
        <svg
          className="animate-spin h-8 w-8 text-blue-600"
          fill="none"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            d="M4 12a8 8 0 0116 0H4z"
            fill="currentColor"
          />
        </svg>
        <span className="text-lg font-semibold text-gray-700">
          Fetching user data...
        </span>
      </div>
    </div>
  );
}
