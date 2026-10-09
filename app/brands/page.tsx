import Image from 'next/image';

interface Brand {
  _id: string;
  name: string;
  image: string;
  slug: string;
}

const BASE = 'https://ecommerce.routemisr.com';

async function getBrands(): Promise<Brand[]> {
  try {
    const res = await fetch(`${BASE}/api/v1/brands`, { next: { revalidate: 3600 } });
    const data = await res.json();
    return data.data;
  } catch { return []; }
}


export default async function BrandsPage() {
  const brands = await getBrands();

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">All Brands</h1>
        <p className="text-gray-500 text-sm mt-1">{brands.length} brands available</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {brands.map((brand) => (
          <div
            key={brand._id}
            className="group flex flex-col items-center text-center p-4 bg-white rounded-2xl border border-gray-100 hover:border-green-300 shadow-sm hover:shadow-md transition-all cursor-pointer"
          >
            <div className="w-full h-28 relative mb-3">
              <Image
                src={brand.image}
                alt={brand.name}
                fill
                className="object-contain group-hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 768px) 50vw, 20vw"
              />
            </div>
            <p className="font-semibold text-gray-700 group-hover:text-green-500 transition-colors text-sm">
              {brand.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
