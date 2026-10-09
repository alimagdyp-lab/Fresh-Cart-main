import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight } from 'lucide-react';

interface Category {
  _id: string;
  name: string;
  image: string;
}

export default function CategoryGrid({ categories }: { categories: Category[] }) {
  return (
    <section className="mb-16">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Shop by Category</h2>
          <p className="text-gray-500 text-sm mt-1">Find what you need quickly</p>
        </div>
        <Link href="/categories" className="flex items-center gap-1 text-green-500 text-sm font-medium hover:underline">
          <span>View All Categories</span>
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-4">
        {categories.map((cat) => (
          <Link key={cat._id} href={`/categories/${cat._id}`} className="group block">
            <div className="relative h-32 md:h-40 rounded-xl overflow-hidden mb-3 border border-gray-100 shadow-sm group-hover:shadow-md group-hover:border-green-200 transition-all">
              <Image
                src={cat.image}
                alt={cat.name}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 15vw"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors"></div>
            </div>
            <h3 className="text-center font-semibold text-gray-800 group-hover:text-green-600 transition-colors truncate px-1 text-sm">
              {cat.name}
            </h3>
          </Link>
        ))}
      </div>
    </section>
  );
}
