export default function FeatureStrip() {
  return (
    <section className="border border-gray-200 rounded-2xl p-8 mb-12 bg-white">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {[
          { icon: '🚚', title: 'Free Shipping', desc: 'On orders over 500 EGP' },
          { icon: '🔒', title: 'Secure Payment', desc: '100% secure transactions' },
          { icon: '↩️', title: 'Easy Returns', desc: '14-day return policy' },
          { icon: '🎧', title: '24/7 Support', desc: 'Dedicated support team' },
        ].map((f, i) => (
          <div key={f.title} className="flex flex-col items-center text-center">
            <span className="text-4xl mb-4">{f.icon}</span>
            <h4 className="font-bold text-gray-800 mb-1">{f.title}</h4>
            <p className="text-gray-500 text-sm">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
