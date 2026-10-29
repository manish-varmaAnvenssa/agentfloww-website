import React, { useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { productsData } from '../data/productsData';
import { CheckCircle, ArrowRight, Settings, Server, Shield, FileText, Bot, Activity, Zap, Cpu, Play, FlaskConical, CheckCircle2 } from 'lucide-react';

const ProductTemplate = () => {
  const { productId } = useParams();
  const product = productsData[productId];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [productId]);

  if (!product) {
    return <Navigate to="/products" />;
  }

  const trackClick = (location) => {
    if (window.gtag) {
      window.gtag('event', 'product_cta_click', {
        product_name: product.id,
        cta_location: location,
      });
    }
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://agentfloww.com/" },
      { "@type": "ListItem", "position": 2, "name": "Products", "item": "https://agentfloww.com/products" },
      { "@type": "ListItem", "position": 3, "name": product.h1, "item": `https://agentfloww.com${product.url}` }
    ]
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": product.faq.map((q) => ({
      "@type": "Question",
      "name": q.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": q.answer
      }
    }))
  };

  return (
    <div className="bg-white min-h-screen pt-20">
      <Helmet>
        <title>{product.titleTag}</title>
        <meta name="description" content={product.metaDescription} />
        <link rel="canonical" href={`https://agentfloww.com${product.url}`} />
        <meta property="og:title" content={product.titleTag} />
        <meta property="og:description" content={product.metaDescription} />
        <meta property="og:url" content={`https://agentfloww.com${product.url}`} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">{JSON.stringify(breadcrumbJsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(faqJsonLd)}</script>
      </Helmet>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-indigo-50 to-white pt-8 pb-16 lg:pt-12 lg:pb-24 border-b border-gray-100 w-full overflow-hidden">
        <div className="w-full px-4 md:px-12 lg:px-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight mb-6 tracking-tight">
              {product.h1}
            </h1>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl">
              {product.heroDescription}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to={`/contact?product=${product.id}`}
                onClick={() => trackClick('hero')}
                className="inline-flex items-center justify-center px-8 py-3.5 border border-transparent text-base font-semibold rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 transition-all shadow-[0_8px_30px_rgb(79,70,229,0.4)] hover:shadow-[0_8px_40px_rgb(79,70,229,0.6)] transform hover:-translate-y-1"
              >
                {product.primaryCta}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link
                to="/products"
                className="inline-flex items-center justify-center px-8 py-3.5 border border-gray-300 text-base font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors"
              >
                &larr; All Products
              </Link>
            </div>
          </div>
          <div className="relative flex justify-center lg:justify-end w-full max-w-xl mx-auto lg:max-w-none">
            {product.heroImage && (
              <motion.div
                animate={{ y: [-15, 15, -15] }}
                transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                className="w-full relative group"
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500 rounded-3xl blur opacity-30 group-hover:opacity-70 transition duration-1000 group-hover:duration-500 animate-pulse"></div>
                <img 
                  src={product.heroImage} 
                  alt={`${product.h1} visualization`}
                  className="relative w-full h-auto rounded-3xl shadow-[0_0_40px_rgba(79,70,229,0.4)] group-hover:shadow-[0_0_70px_rgba(79,70,229,0.8)] ring-1 ring-gray-900/5 object-cover object-center max-h-[600px] bg-white transform transition-all duration-700 hover:scale-[1.03] hover:-translate-y-2"
                />
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 w-full px-4 md:px-12 lg:px-16">
        <div className="w-full text-left">
          <h2 className="text-3xl md:text-4xl font-bold text-indigo-600 mb-6">{product.problemH2}</h2>
          <p className="text-lg text-gray-600 leading-relaxed w-full">
            {product.problemText}
          </p>
        </div>
      </section>

      {/* How It Works Section (Animated Diagram) */}
      <section className="bg-gray-50 py-24 border-y border-gray-200 overflow-hidden w-full">
        <div className="w-full px-4 md:px-12 lg:px-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-20 text-left tracking-tight"
          >
            {product.howItWorksH2}
          </motion.h2>
          
          <div className="flex flex-col md:flex-row justify-between items-start w-full gap-8 md:gap-4 relative">
            {product.implementationSteps.map((step, index) => {
              // Cycle through styles based on index
              const styles = [
                { icon: Play, color: "text-rose-500", bg: "bg-rose-50", ring: "ring-rose-100", shadow: "shadow-[0_0_30px_rgba(244,63,94,0.4)]" },
                { icon: FileText, color: "text-purple-500", bg: "bg-purple-50", ring: "ring-purple-100", shadow: "shadow-[0_0_30px_rgba(168,85,247,0.4)]" },
                { icon: Settings, color: "text-blue-500", bg: "bg-blue-50", ring: "ring-blue-100", shadow: "shadow-[0_0_30px_rgba(59,130,246,0.4)]" },
                { icon: FlaskConical, color: "text-green-500", bg: "bg-green-50", ring: "ring-green-100", shadow: "shadow-[0_0_30px_rgba(34,197,94,0.4)]" },
                { icon: CheckCircle2, color: "text-indigo-500", bg: "bg-indigo-50", ring: "ring-indigo-100", shadow: "shadow-[0_0_30px_rgba(99,102,241,0.4)]" },
                { icon: Activity, color: "text-orange-500", bg: "bg-orange-50", ring: "ring-orange-100", shadow: "shadow-[0_0_30px_rgba(249,115,22,0.4)]" },
                { icon: Server, color: "text-cyan-500", bg: "bg-cyan-50", ring: "ring-cyan-100", shadow: "shadow-[0_0_30px_rgba(6,182,212,0.4)]" }
              ];
              const style = styles[index % styles.length];
              const Icon = style.icon;

              return (
                <React.Fragment key={index}>
                  <motion.div 
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 + index * 0.15 }}
                    className="flex flex-col items-start flex-1 text-left group w-full"
                  >
                    <motion.div 
                      whileHover={{ scale: 1.1 }}
                      className={`w-16 h-16 md:w-20 md:h-20 rounded-full ${style.bg} flex items-center justify-center mb-6 ring-8 ${style.ring} ${style.shadow} transition-all duration-300`}
                    >
                      <Icon className={`w-8 h-8 md:w-10 md:h-10 ${style.color}`} />
                    </motion.div>
                    
                    <h3 className="font-bold text-gray-900 text-sm md:text-base lg:text-lg mb-2 pr-4">
                      {index + 1}. {step.title || step}
                    </h3>
                    
                    <p className="text-sm text-gray-500 leading-relaxed pr-4">
                      {step.desc || "Execute and monitor the workflow securely."}
                    </p>
                  </motion.div>

                  {/* Arrow between steps (desktop only) */}
                  {index < product.implementationSteps.length - 1 && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 0.5 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.3 + index * 0.15 }}
                      className="hidden md:flex flex-col items-center justify-center h-16 md:h-20 px-2 flex-shrink-0"
                    >
                      <motion.div
                        animate={{ x: [0, 8, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                      >
                        <ArrowRight className="text-gray-400 w-5 h-5" />
                      </motion.div>
                    </motion.div>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </section>

      {/* Core Capabilities */}
      <section className="py-20 w-full px-4 md:px-12 lg:px-16">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-left">Core Capabilities</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {product.coreCapabilities.map((capability, index) => (
            <motion.div 
              key={index}
              animate={{ y: [-6, 6, -6] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: index * 0.2 }}
              className="flex items-start gap-4 p-6 bg-white rounded-xl border border-indigo-50 shadow-[0_10px_30px_rgb(0,0,0,0.06)] hover:shadow-[0_10px_30px_rgb(79,70,229,0.15)] transition-shadow"
            >
              <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
              <span className="text-gray-800 font-medium leading-relaxed">{capability}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Use Cases */}
      <section className="bg-slate-900 py-20 text-white">
        <div className="w-full px-4 md:px-12 lg:px-16 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-8">Common Use Cases</h2>
            <ul className="space-y-4">
              {product.useCases.map((useCase, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="mt-1 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-indigo-400" />
                  <span className="text-slate-300 leading-relaxed">{useCase}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-slate-800 rounded-2xl p-8 border border-slate-700">
             <div className="flex items-center gap-4 mb-6 text-indigo-300">
               <Activity className="w-6 h-6" />
               <span className="font-semibold uppercase tracking-wider text-sm">Actionable Outcomes</span>
             </div>
             <p className="text-slate-400 italic">
               "Agentfloww focuses on practical automation: connecting the capability to real business workflows, defining validation and permissions, testing edge cases and creating a controlled path to production."
             </p>
          </div>
        </div>
      </section>

      {/* Integrations */}
      <section className="py-20 w-full px-4 md:px-12 lg:px-16">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="md:w-1/3 flex justify-center">
            <div className="w-48 h-48 bg-indigo-50 rounded-full flex items-center justify-center">
              <Server className="w-20 h-20 text-indigo-600" />
            </div>
          </div>
          <div className="md:w-2/3">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Works With Your Existing Business Environment</h2>
            <p className="text-lg text-gray-600 leading-relaxed border-l-4 border-indigo-500 pl-6">
              {product.integrationsText}
            </p>
          </div>
        </div>
      </section>



      {/* Why Agentfloww */}
      <section className="py-20 w-full px-4 md:px-12 lg:px-16">
        <div className="w-full text-left">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 text-left">Why Agentfloww</h2>
          <p className="text-lg text-gray-600 mb-10 text-left w-full">
            Agentfloww focuses on {product.whyPhrase ? product.whyPhrase : 'practical automation'}: connecting the capability to real business workflows, defining validation and permissions, testing edge cases and creating a controlled path to production.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl border border-indigo-100 shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:shadow-[0_8px_30px_rgb(79,70,229,0.15)] hover:-translate-y-1 transition-all flex items-start gap-4">
              <Settings className="text-indigo-600 mt-1 w-6 h-6 flex-shrink-0" />
              <span className="text-gray-800 font-medium">Workflow-first implementation.</span>
            </div>
            <div className="bg-white p-6 rounded-xl border border-indigo-100 shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:shadow-[0_8px_30px_rgb(79,70,229,0.15)] hover:-translate-y-1 transition-all flex items-start gap-4">
              <Shield className="text-indigo-600 mt-1 w-6 h-6 flex-shrink-0" />
              <span className="text-gray-800 font-medium">Controlled actions and validation.</span>
            </div>
            <div className="bg-white p-6 rounded-xl border border-indigo-100 shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:shadow-[0_8px_30px_rgb(79,70,229,0.15)] hover:-translate-y-1 transition-all flex items-start gap-4">
              <Activity className="text-indigo-600 mt-1 w-6 h-6 flex-shrink-0" />
              <span className="text-gray-800 font-medium">Clear escalation when automation cannot safely complete a task.</span>
            </div>
            <div className="bg-white p-6 rounded-xl border border-indigo-100 shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:shadow-[0_8px_30px_rgb(79,70,229,0.15)] hover:-translate-y-1 transition-all flex items-start gap-4">
              <Server className="text-indigo-600 mt-1 w-6 h-6 flex-shrink-0" />
              <span className="text-gray-800 font-medium">Designed to work with existing business systems.</span>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-gray-50 py-20 border-t border-gray-200">
        <div className="w-full px-4 md:px-12 lg:px-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-10 text-left">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {product.faq.map((q, index) => (
              <details key={index} className="group bg-white rounded-xl border border-gray-200 [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex cursor-pointer items-center justify-between gap-1.5 rounded-xl p-6 text-gray-900 hover:bg-gray-50">
                  <h3 className="font-semibold">{q.question}</h3>
                  <span className="relative size-5 shrink-0">
                    <svg className="absolute inset-0 size-5 opacity-100 group-open:opacity-0" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    <svg className="absolute inset-0 size-5 opacity-0 group-open:opacity-100" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
                    </svg>
                  </span>
                </summary>
                <div className="px-6 pb-6 text-gray-600">
                  <p>{q.answer}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 w-full px-4 md:px-12 lg:px-16 flex flex-col items-center text-center bg-gradient-to-br from-white to-indigo-50">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">Ready to Automate This Workflow?</h2>
        <p className="text-xl text-gray-600 mb-10 max-w-3xl">
          Tell us about the workflow, systems involved and the outcome you want to achieve. We can map the right automation approach during a discovery session.
        </p>
        <Link
          to={`/contact?product=${product.id}`}
          onClick={() => trackClick('final')}
          className="inline-flex items-center justify-center px-10 py-4 text-lg font-semibold rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 transition-all shadow-[0_8px_30px_rgb(79,70,229,0.4)] hover:shadow-[0_8px_40px_rgb(79,70,229,0.6)] transform hover:-translate-y-1"
        >
          {product.primaryCta}
        </Link>
      </section>
    </div>
  );
};

export default ProductTemplate;
