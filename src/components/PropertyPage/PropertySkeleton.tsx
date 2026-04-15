const PropertySkeleton = () => {
  return (
    <div className="min-h-screen bg-[#FFFFFF] animate-pulse">
      <div className="w-full max-w-[2300px] 2xl:max-w-[1900px] xl:max-w-7xl lg:max-w-6xl md:max-w-4xl sm:max-w-full mx-auto px-3 sm:px-4 lg:px-6 xl:px-8 py-4 sm:py-6 lg:py-8">
        <div className="p-3 sm:p-6 rounded-lg mb-4 sm:mb-6"></div>
        {/* Image Gallery Skeleton */}
        <div className="p-3 sm:p-4 lg:p-6 rounded-lg mb-4 sm:mb-6">
          <div className="h-[300px] sm:h-[400px] lg:h-[500px] bg-gray-200 rounded-2xl" />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Left Content Skeleton */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            {/* Property Header Skeleton */}
            <div className="p-3 sm:p-4 lg:p-6 rounded-lg">
              <div className="h-6 sm:h-8 bg-gray-200 rounded w-3/4 mb-3 sm:mb-4" />
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-2" />
              <div className="h-6 sm:h-8 bg-gray-200 rounded w-1/3 mb-4" />
              <div className="h-4 bg-gray-200 rounded w-full mb-2" />
              <div className="h-4 bg-gray-200 rounded w-2/3" />
            </div>

            {/* Amenities Skeleton */}
            <div className="p-3 sm:p-4 lg:p-6 rounded-lg">
              <div className="h-5 sm:h-6 bg-gray-200 rounded w-1/4 mb-4 sm:mb-6" />
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3"
                  >
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-200 rounded-full" />
                    <div className="h-3 sm:h-4 bg-gray-200 rounded w-16 sm:w-20" />
                  </div>
                ))}
              </div>
            </div>

            {/* Property Info Skeleton */}
            <div className="p-3 sm:p-4 lg:p-6 rounded-lg">
              <div className="h-5 sm:h-6 bg-gray-200 rounded w-1/4 mb-4 sm:mb-6" />
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i}>
                    <div className="h-3 bg-gray-200 rounded w-full mb-1" />
                    <div className="h-4 bg-gray-200 rounded w-3/4" />
                  </div>
                ))}
              </div>
            </div>

            {/* Unit Types Skeleton */}
            <div className="p-3 sm:p-4 lg:p-6 rounded-lg">
              <div className="h-5 sm:h-6 bg-gray-200 rounded w-1/4 mb-4 sm:mb-6" />
              <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
                <div className="flex-1">
                  <div className="h-[300px] sm:h-[400px] lg:h-[540px] bg-gray-200 rounded-2xl" />
                </div>
                <div className="flex-1 lg:max-w-md">
                  <div className="space-y-4">
                    {[...Array(6)].map((_, i) => (
                      <div key={i}>
                        <div className="h-3 bg-gray-200 rounded w-1/3 mb-1" />
                        <div className="h-5 bg-gray-200 rounded w-1/2" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Map Skeleton */}
            <div className="p-3 sm:p-4 lg:p-6 rounded-lg">
              <div className="h-5 sm:h-6 bg-gray-200 rounded w-1/6 mb-4 sm:mb-6" />
              <div className="h-[300px] sm:h-[400px] lg:h-[514px] bg-gray-200 rounded-lg" />
            </div>

            {/* Price Trends Skeleton */}
            <div className="p-3 sm:p-4 lg:p-6 rounded-lg">
              <div className="h-5 sm:h-6 bg-gray-200 rounded w-1/4 mb-4 sm:mb-6" />
              <div className="h-[250px] sm:h-[300px] lg:h-[350px] bg-gray-200 rounded-lg" />
            </div>
          </div>

          {/* Right Sidebar Skeleton */}
          <div className="space-y-4 sm:space-y-6">
            {/* Contact Section Skeleton */}
            <div className="bg-white rounded-xl border border-gray-300 p-4 sm:p-6">
              <div className="h-5 sm:h-6 bg-gray-200 rounded w-1/2 mb-4 sm:mb-6" />
              <div className="space-y-3 sm:space-y-4">
                <div className="h-10 sm:h-12 bg-gray-200 rounded-lg" />
                <div className="h-10 sm:h-12 bg-gray-200 rounded-lg" />
              </div>
            </div>

            {/* Builder Insights Skeleton */}
            <div className="bg-white p-[2px] rounded-2xl">
              <div className="bg-white rounded-2xl">
                <div className="h-20 sm:h-24 bg-gray-200 rounded-t-[10px] mb-4" />
                <div className="p-4 sm:p-6 space-y-4">
                  <div className="h-8 bg-gray-200 rounded w-1/2" />
                  <div className="h-16 bg-gray-200 rounded" />
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-3 sm:gap-4">
                    {[...Array(4)].map((_, i) => (
                      <div
                        key={i}
                        className="border border-gray-200 rounded-lg p-4 sm:p-6"
                      >
                        <div className="h-8 bg-gray-200 rounded mb-2" />
                        <div className="h-4 bg-gray-200 rounded w-2/3" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* More Like This Skeleton */}
        <div className="p-3 sm:p-4 lg:p-6 rounded-lg mt-4 sm:mt-6">
          <div className="h-5 sm:h-6 bg-gray-200 rounded w-1/6 mb-4 sm:mb-6" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-gray-200 h-64 rounded-lg" />
            ))}
          </div>
        </div>

        {/* Recommended By Us Skeleton */}
        <div className="p-3 sm:p-4 lg:p-6 rounded-lg mt-4 sm:mt-6">
          <div className="h-5 sm:h-6 bg-gray-200 rounded w-1/4 mb-4 sm:mb-6" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-gray-200 h-64 rounded-lg" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default PropertySkeleton;
