import StarBorder from './StarBorder';

/**
 * Modern SaaS Typography System
 * Using Inter (body) and Poppins (headings)
 */

export const TypographySystem = () => {
  return (
    <div className="space-y-16 py-12">
      {/* Headings */}
      <section>
        <h2 className="mb-8 font-display text-3xl font-bold">Heading System</h2>
        
        <div className="space-y-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-2">Heading 1 (H1)</p>
            <h1 className="font-display text-5xl font-bold tracking-tight">
              Premium SaaS Design System
            </h1>
            <p className="mt-2 text-sm text-gray-400">Font: Poppins 800 | Size: 3.75rem | Weight: 800</p>
          </div>
          
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-2">Heading 2 (H2)</p>
            <h2 className="font-display text-3xl font-bold">
              Beautiful Typography & Modern Design
            </h2>
            <p className="mt-2 text-sm text-gray-400">Font: Poppins 700 | Size: 2.5rem | Weight: 700</p>
          </div>
          
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-2">Heading 3 (H3)</p>
            <h3 className="font-display text-2xl font-bold">
              Creating Exceptional User Experiences
            </h3>
            <p className="mt-2 text-sm text-gray-400">Font: Poppins 700 | Size: 1.75rem | Weight: 700</p>
          </div>
          
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-2">Heading 4 (H4)</p>
            <h4 className="font-display text-xl font-semibold">
              Key Features and Benefits
            </h4>
            <p className="mt-2 text-sm text-gray-400">Font: Poppins 600 | Size: 1.25rem | Weight: 600</p>
          </div>
          
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-2">Heading 5 (H5)</p>
            <h5 className="font-display text-lg font-semibold">
              Understanding the System
            </h5>
            <p className="mt-2 text-sm text-gray-400">Font: Poppins 600 | Size: 1.125rem | Weight: 600</p>
          </div>
        </div>
      </section>

      {/* Body Text */}
      <section>
        <h2 className="mb-8 font-display text-3xl font-bold">Body Text</h2>
        
        <div className="space-y-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4">
              Regular Body Text (font-normal)
            </p>
            <p className="font-sans text-base font-normal leading-relaxed text-gray-700">
              Inter is a typeface carefully crafted & designed for computer screens. Metrics are optimized for readability on all sizes with a large x-height to foster alphabetic differentiation. Inter features a tall x-height to aid in legibility of mixed case and lower case text.
            </p>
          </div>
          
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4">
              Medium Body Text (font-medium)
            </p>
            <p className="font-sans text-base font-medium leading-relaxed text-gray-700">
              Medium weight text is perfect for emphasis within paragraphs or for subheadings that don't need to be a full heading level. Use sparingly to maintain hierarchy and readability.
            </p>
          </div>
          
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4">
              Semibold Body Text (font-semibold)
            </p>
            <p className="font-sans text-base font-semibold leading-relaxed text-gray-700">
              Semibold text provides strong visual emphasis. Use for feature names, labels, or important inline text that needs to stand out from regular body text without becoming a heading.
            </p>
          </div>
        </div>
      </section>

      {/* Button Typography */}
      <section>
        <h2 className="mb-8 font-display text-3xl font-bold">Button Text</h2>
        
        <div className="space-y-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4">
              Primary Button
            </p>
            <StarBorder as="button" className="rounded-lg bg-indigo-600 px-6 py-3 font-sans text-sm font-medium text-white hover:bg-indigo-700 transition-colors">
              Get Started
            </StarBorder>
            <p className="mt-2 text-sm text-gray-400">Font: Inter | Size: 0.875rem | Weight: 500</p>
          </div>
          
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4">
              Secondary Button
            </p>
            <StarBorder as="button" className="rounded-lg border border-gray-300 bg-white px-6 py-3 font-sans text-sm font-medium text-gray-900 hover:bg-gray-50 transition-colors">
              Learn More
            </StarBorder>
            <p className="mt-2 text-sm text-gray-400">Font: Inter | Size: 0.875rem | Weight: 500</p>
          </div>
        </div>
      </section>

      {/* Labels & Captions */}
      <section>
        <h2 className="mb-8 font-display text-3xl font-bold">Labels & Captions</h2>
        
        <div className="space-y-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-2">
              Small Label
            </p>
            <span className="inline-block bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700 rounded-full">
              Premium Feature
            </span>
            <p className="mt-2 text-sm text-gray-400">Font: Inter | Size: 0.75rem | Weight: 600</p>
          </div>
          
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-2">
              Caption Text
            </p>
            <p className="text-xs text-gray-500">
              This is a caption used to provide additional context or explain images, diagrams, or other visual elements on the page.
            </p>
            <p className="mt-2 text-sm text-gray-400">Font: Inter | Size: 0.75rem | Weight: 400</p>
          </div>
        </div>
      </section>

      {/* List Example */}
      <section>
        <h2 className="mb-8 font-display text-3xl font-bold">Feature List</h2>
        
        <ul className="space-y-3">
          <li className="flex items-start gap-3">
            <span className="text-lg font-bold text-indigo-600 mt-0">✓</span>
            <span className="font-sans text-base text-gray-700">
              <strong className="font-semibold">Modern Typography:</strong> Built with Inter and Poppins for premium SaaS design
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-lg font-bold text-indigo-600 mt-0">✓</span>
            <span className="font-sans text-base text-gray-700">
              <strong className="font-semibold">Responsive Scales:</strong> Headings adjust smoothly across all breakpoints
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-lg font-bold text-indigo-600 mt-0">✓</span>
            <span className="font-sans text-base text-gray-700">
              <strong className="font-semibold">Perfect Hierarchy:</strong> Clear distinction between all text levels
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-lg font-bold text-indigo-600 mt-0">✓</span>
            <span className="font-sans text-base text-gray-700">
              <strong className="font-semibold">Optimized Readability:</strong> Careful line-height and letter-spacing
            </span>
          </li>
        </ul>
      </section>

      {/* Hero Section Example */}
      <section>
        <h2 className="mb-8 font-display text-3xl font-bold">Hero Section Example</h2>
        
        <div className="rounded-xl border border-gray-200 bg-gradient-to-br from-gray-50 to-white p-12">
          <h1 className="font-display text-5xl font-bold tracking-tight mb-4">
            Modern SaaS Platform
          </h1>
          <p className="font-sans text-lg text-gray-600 leading-relaxed max-w-2xl">
            Build, deploy, and scale your application with confidence. Our platform provides everything you need to create world-class digital experiences.
          </p>
          <StarBorder as="button" className="mt-8 rounded-lg bg-indigo-600 px-8 py-4 font-sans text-base font-medium text-white hover:bg-indigo-700 transition-colors">
            Start Free Trial
          </StarBorder>
        </div>
      </section>

      {/* Card Example */}
      <section>
        <h2 className="mb-8 font-display text-3xl font-bold">Component Examples</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-xl border border-gray-200 bg-white p-6">
            <h3 className="font-display text-xl font-bold mb-2">Powerful Analytics</h3>
            <p className="font-sans text-sm text-gray-600 leading-relaxed">
              Get real-time insights into your application's performance with comprehensive analytics and custom dashboards.
            </p>
          </div>
          
          <div className="rounded-xl border border-gray-200 bg-white p-6">
            <h3 className="font-display text-xl font-bold mb-2">Easy Integration</h3>
            <p className="font-sans text-sm text-gray-600 leading-relaxed">
              Integrate with your existing tools and services. Simple APIs and webhooks for seamless integration.
            </p>
          </div>
          
          <div className="rounded-xl border border-gray-200 bg-white p-6">
            <h3 className="font-display text-xl font-bold mb-2">24/7 Support</h3>
            <p className="font-sans text-sm text-gray-600 leading-relaxed">
              Our dedicated support team is available round the clock to help you succeed with our platform.
            </p>
          </div>
          
          <div className="rounded-xl border border-gray-200 bg-white p-6">
            <h3 className="font-display text-xl font-bold mb-2">Enterprise Grade</h3>
            <p className="font-sans text-sm text-gray-600 leading-relaxed">
              Built for scale. Handle millions of requests with our highly available, distributed infrastructure.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TypographySystem;
