import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { productsData } from '../data/productsData';
import { ArrowRight, Settings, Shield, Server } from 'lucide-react';

const ProductsHub = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const trackClick = (location) => {
    if (window.gtag) {
      window.gtag('event', 'product_cta_click', {
        product_name: 'hub',
        cta_location: location,
      });
    }
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://agentfloww.com/" },
      { "@type": "ListItem", "position": 2, "name": "Products", "item": "https://agentfloww.com/products" }
    ]
  };

  return (
    <div className="bg-white min-h-screen pt-20">
      <Helmet>
        <title>AI Automation Products for Enterprise Workflows | Agentfloww</title>
        <meta name="description" content="Explore Agentfloww AI automation products for SAP, ERP, manufacturing, browser workflows, autonomous agents and intelligent RPA." />
        <link rel="canonical" href="https://agentfloww.com/products" />
        <meta property="og:title" content="AI Automation Products for Enterprise Workflows | Agentfloww" />
        <meta property="og:description" content="Explore Agentfloww AI automation products for SAP, ERP, manufacturing, browser workflows, autonomous agents and intelligent RPA." />
        <meta property="og:url" content="https://agentfloww.com/products" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">{JSON.stringify(breadcrumbJsonLd)}</script>
      </Helmet>

      {/* Hero */}
      <section className="bg-gradient-to-br from-indigo-900 to-slate-900 py-24 text-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl lg:text-6xl font-extrabold tracking-tight mb-8">
            AI Automation Products Built Around Real Business Workflows
          </h1>
          <p className="text-xl text-indigo-100 mb-10 max-w-3xl mx-auto leading-relaxed">
            Explore Agentfloww products for SAP and ERP automation, manufacturing operations, browser workflows, autonomous AI agents and intelligent RPA.
          </p>
          <Link
            to="/contact?product=products-hub"
            onClick={() => trackClick('hero')}
            className="inline-flex items-center justify-center px-8 py-4 text-base font-bold rounded-lg text-indigo-900 bg-white hover:bg-indigo-50 transition-colors shadow-lg"
          >
            Book a Discovery Session
          </Link>
        </div>
      </section>

      {/* Product Cards */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Object.values(productsData).map((product) => (
              <div key={product.id} className="bg-white rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-200 overflow-hidden flex flex-col h-full group">
                {product.heroImage && (
                  <div className="relative w-full h-56 bg-slate-50 flex items-center justify-center p-6 border-b border-gray-100 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"></div>
                    <img
                      src={product.heroImage}
                      alt={product.h1}
                      className="relative z-10 object-contain w-full h-full transform transition-all duration-700 ease-out group-hover:scale-110 group-hover:-translate-y-2 drop-shadow-md group-hover:drop-shadow-[0_0_35px_rgba(79,70,229,0.6)]"
                    />
                  </div>
                )}
                <div className="p-8 flex-grow bg-white z-10">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-indigo-600 transition-colors">
                    {product.h1.split('for')[0].trim()}
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    {product.heroDescription}
                  </p>
                </div>
                <div className="px-8 pb-8 mt-auto bg-white z-10">
                  <Link
                    to={product.url}
                    onClick={() => trackClick('products_card')}
                    className="inline-flex items-center font-semibold text-indigo-600 hover:text-indigo-700"
                  >
                    Learn more <ArrowRight className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How Agentfloww approaches automation */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">How Agentfloww Approaches Automation</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="text-center">
            <div className="mx-auto w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-6">
              <Settings className="w-8 h-8 text-indigo-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Workflow-First Implementation</h3>
            <p className="text-gray-600">We begin by mapping your actual business workflows to ensure the automation solves real operational needs.</p>
          </div>
          <div className="text-center">
            <div className="mx-auto w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-6">
              <Shield className="w-8 h-8 text-indigo-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Controlled Actions & Validation</h3>
            <p className="text-gray-600">Agents operate within strict permissions, requiring validation and clear escalation paths before executing critical tasks.</p>
          </div>
          <div className="text-center">
            <div className="mx-auto w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-6">
              <Server className="w-8 h-8 text-indigo-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Works With Existing Systems</h3>
            <p className="text-gray-600">Designed to connect smoothly with your current enterprise environment, preserving your established business rules.</p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-gray-50 py-24 border-t border-gray-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <details className="group bg-white rounded-xl border border-gray-200 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer items-center justify-between gap-1.5 rounded-xl p-6 text-gray-900 hover:bg-gray-50">
                <h3 className="font-semibold">What is the best way to start an automation project?</h3>
                <span className="relative size-5 shrink-0">
                  <svg className="absolute inset-0 size-5 opacity-100 group-open:opacity-0" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
                  <svg className="absolute inset-0 size-5 opacity-0 group-open:opacity-100" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" /></svg>
                </span>
              </summary>
              <div className="px-6 pb-6 text-gray-600">
                <p>We recommend starting with a discovery session to define a single, high-value workflow and test it in a controlled pilot.</p>
              </div>
            </details>
            <details className="group bg-white rounded-xl border border-gray-200 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer items-center justify-between gap-1.5 rounded-xl p-6 text-gray-900 hover:bg-gray-50">
                <h3 className="font-semibold">How do AI agents integrate with our systems?</h3>
                <span className="relative size-5 shrink-0">
                  <svg className="absolute inset-0 size-5 opacity-100 group-open:opacity-0" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
                  <svg className="absolute inset-0 size-5 opacity-0 group-open:opacity-100" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" /></svg>
                </span>
              </summary>
              <div className="px-6 pb-6 text-gray-600">
                <p>Integration approaches vary by product, utilizing approved APIs, direct database connections, or secure browser automation, subject to technical discovery.</p>
              </div>
            </details>
            <details className="group bg-white rounded-xl border border-gray-200 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer items-center justify-between gap-1.5 rounded-xl p-6 text-gray-900 hover:bg-gray-50">
                <h3 className="font-semibold">Are human approvals supported?</h3>
                <span className="relative size-5 shrink-0">
                  <svg className="absolute inset-0 size-5 opacity-100 group-open:opacity-0" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
                  <svg className="absolute inset-0 size-5 opacity-0 group-open:opacity-100" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" /></svg>
                </span>
              </summary>
              <div className="px-6 pb-6 text-gray-600">
                <p>Yes, Agentfloww solutions are designed with clear escalation paths and validation gates to ensure human oversight on critical actions.</p>
              </div>
            </details>
            <details className="group bg-white rounded-xl border border-gray-200 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer items-center justify-between gap-1.5 rounded-xl p-6 text-gray-900 hover:bg-gray-50">
                <h3 className="font-semibold">Do we need specialized AI knowledge?</h3>
                <span className="relative size-5 shrink-0">
                  <svg className="absolute inset-0 size-5 opacity-100 group-open:opacity-0" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
                  <svg className="absolute inset-0 size-5 opacity-0 group-open:opacity-100" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" /></svg>
                </span>
              </summary>
              <div className="px-6 pb-6 text-gray-600">
                <p>No. We focus on practical automation outcomes and map the technology to your business workflows during the implementation phase.</p>
              </div>
            </details>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-6">Ready to Automate Your Workflows?</h2>
        <p className="text-xl text-gray-600 mb-10">
          Tell us about the workflow, systems involved and the outcome you want to achieve. We can map the right automation approach during a discovery session.
        </p>
        <Link
          to="/contact?product=products-hub"
          onClick={() => trackClick('final')}
          className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1"
        >
          Book a Discovery Session
        </Link>
      </section>
    </div>
  );
};

export default ProductsHub;
