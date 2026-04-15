interface PropertyErrorProps {
  error: string;
}

const PropertyError = ({ error }: PropertyErrorProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-2">
          Error Loading Property
        </h1>
        <p className="text-gray-600">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-[#bb2727] text-white rounded-lg hover:bg-[#a62222]"
        >
          Try Again
        </button>
      </div>
    </div>
  );
};
export default PropertyError;
