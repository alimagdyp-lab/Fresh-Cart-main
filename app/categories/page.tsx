import Link from 'next/link';
import Image from 'next/image';

interface Category {
  _id: string;
  name: string;
  image: string;
}

const BASE = 'https://ecommerce.routemisr.com';


async function getCategories(): Promise<Category[]> {
  try {
    const res = await fetch(`${BASE}/api/v1/categories`, { next: { revalidate: 3600 } });
    const data = await res.json();
    return data.data;
  } catch { return []; }
}

export default async function CategoriesPage() {
  const categories = await getCategories();

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">All Categories</h1>
        <p className="text-gray-500 text-sm mt-1">Browse all product categories</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {categories.map((cat) => (
          <Link
            key={cat._id}
            href={`/products?category=${cat._id}`}
            className="group flex flex-col items-center text-center"
          >
            <div className="w-full aspect-square rounded-2xl overflow-hidden bg-gray-50 border border-gray-100 group-hover:border-green-300 transition-colors shadow-sm group-hover:shadow-md">
              <Image
                src={cat.image}
                alt={cat.name}
                width={300}
                height={300}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <p className="mt-3 font-semibold text-gray-700 group-hover:text-green-500 transition-colors text-sm">
              {cat.name}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
