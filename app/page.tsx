import Link from 'next/link';
import ProductCard from './_components/ProductCard';
import CategoryGrid from './_components/home/CategoryGrid';
import MainBanners from './_components/home/MainBanners';
import FeatureStrip from './_components/home/FeatureStrip';
import SecondaryBanners from './_components/home/SecondaryBanners';
import NewsletterSection from './_components/home/NewsletterSection';

const BASE = 'https://ecommerce.routemisr.com';

async function getProducts() {
  try {
    const res = await fetch(`${BASE}/api/v1/products?limit=8&sort=-ratingsAverage`, { next: { revalidate: 3600 } });
    const data = await res.json();
    return data.data as Product[];
  } catch { return []; }
}

async function getCategories() {
  try {
    const res = await fetch(`${BASE}/api/v1/categories`, { next: { revalidate: 3600 } });
    const data = await res.json();
    return data.data as Category[];
  } catch { return []; }
}

interface Product {
  _id: string;
  title: string;
  price: number;
  priceAfterDiscount?: number;
  imageCover: string;
  ratingsAverage: number;
  ratingsQuantity: number;
  category: { name: string };
  brand?: { name: string };
}

interface Category {
  _id: string;
  name: string;
  image: string;
}

export default async function Home() {
  const [products, categories] = await Promise.all([getProducts(), getCategories()]);

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* 1. Main Banners Section */}
      <MainBanners />

      {/* 2. Categories Grid */}
      {categories.length > 0 && (
        <CategoryGrid categories={categories} />
      )}

      {/* 4. Secondary Banners Section */}
      <SecondaryBanners />

      {/* 5. Products Grid */}
      <section className="mb-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Popular Products</h2>
          <Link href="/products" className="text-green-600 text-sm font-medium hover:underline">
            View All
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </section>

      {/* 6. Newsletter & App Promo */}
      <NewsletterSection />
    </div>
  );
}
