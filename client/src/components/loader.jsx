import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

export default function Loader({loading}) {
  return <SkeletonTheme baseColor="#e0e0e0" highlightColor="#f5f5f5">
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
          {/* Content Container */}
          <div className="w-full max-w-md p-6 bg-white shadow-lg rounded-lg">
            {/* Header */}
            <header className="mb-6">
              {loading ? (
                <Skeleton width="70%" height={30} />
              ) : (
                <h1 className="text-xl font-bold text-gray-800">Simple Page Title</h1>
              )}
            </header>
  
            {/* Paragraph */}
            <section className="mb-6">
              {loading ? (
                <Skeleton count={3} />
              ) : (
                <p className="text-gray-600">
                  This is a simple page layout with a header, some text, and a card. The skeleton is displayed while content is loading.
                </p>
              )}
            </section>
  
            {/* Card */}
            <div className="border border-gray-200 rounded-lg p-4 shadow-sm">
              {loading ? (
                <>
                  <Skeleton height={150} className="mb-4" />
                  <Skeleton width="60%" />
                  <Skeleton width="80%" />
                </>
              ) : (
                <div>
                  <img
                    src="https://via.placeholder.com/300x150"
                    alt="Example"
                    className="w-full h-36 object-cover rounded-lg"
                  />
                  <h3 className="mt-4 text-lg font-medium text-gray-800">Card Title</h3>
                  <p className="text-gray-600">This is a description of the card.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </SkeletonTheme>
}
