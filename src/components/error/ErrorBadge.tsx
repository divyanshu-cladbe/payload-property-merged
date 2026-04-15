export const ErrorBadge = ({ error } : {
    error: string
}) => {
    return(
        <div className="flex items-center justify-center min-h-[calc(100vh-72px)]">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900">Error</h2>
          <p className="mt-2 text-gray-600">{error}</p>
        </div>
      </div>
    )
}