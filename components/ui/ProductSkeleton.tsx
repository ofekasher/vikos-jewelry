export function ProductCardSkeleton() {
  return (
    <div className="flex flex-col animate-pulse">
      <div className="rounded-t-[999px] bg-[#EEECE8] aspect-[3/3.8]" />
      <div className="mt-3 space-y-2">
        <div className="h-3.5 bg-[#E5E5E5] rounded w-3/4" />
        <div className="h-3 bg-[#E5E5E5] rounded w-1/3" />
      </div>
    </div>
  );
}

export function ProductPageSkeleton() {
  return (
    <div className="max-w-[1200px] mx-auto px-6 lg:px-10 pt-24 pb-20 animate-pulse">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-3">
          <div className="rounded-t-[999px] bg-[#EEECE8] aspect-[4/4.6]" />
          <div className="grid grid-cols-4 gap-2">
            {[0,1,2,3].map(i => (
              <div key={i} className="aspect-square bg-[#EEECE8] rounded" />
            ))}
          </div>
        </div>
        <div className="space-y-4 pt-4">
          <div className="h-4 bg-[#E5E5E5] rounded w-1/4" />
          <div className="h-8 bg-[#E5E5E5] rounded w-2/3" />
          <div className="h-6 bg-[#E5E5E5] rounded w-1/3" />
          <div className="space-y-2 pt-4">
            <div className="h-3 bg-[#E5E5E5] rounded" />
            <div className="h-3 bg-[#E5E5E5] rounded w-5/6" />
            <div className="h-3 bg-[#E5E5E5] rounded w-4/6" />
          </div>
          <div className="h-12 bg-[#E5E5E5] rounded mt-6" />
        </div>
      </div>
    </div>
  );
}
