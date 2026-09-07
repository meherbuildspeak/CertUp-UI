import React from 'react'
import { mockFeatures } from '../../data/mockData'

export default function Features() {
  return (
    <section className="relative py-20 md:py-24 lg:py-28 border-t border-border/50 bg-background" id="features">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header Section */}
        <div className="text-center flex flex-col items-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight max-w-3xl mb-4">
            Everything You Need for ISO Readiness
          </h2>

          <p className="text-muted text-base sm:text-lg leading-relaxed max-w-2xl mb-16">
            Powerful features designed to simplify your compliance journey.
          </p>
        </div>

        {/* Features Container (Centered flex layout) */}
        <div className="flex flex-wrap justify-center gap-6 lg:gap-8">
          {mockFeatures.map((feature, index) => {
            const IconComponent = feature.icon
            return (
              <div
                key={index}
                className="bg-surface border border-border rounded-xl p-6 flex flex-col items-start text-left hover:border-accent/50 hover:shadow-lg hover:shadow-accent/5 transition duration-300 group w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.5rem)]"
              >
                <div className="p-3 rounded-lg bg-accent/10 border border-accent/20 mb-5 group-hover:bg-accent/20 transition duration-300">
                  <IconComponent className="w-6 h-6 text-accent" />
                </div>

                <h3 className="text-white font-semibold text-lg mb-2">
                  {feature.title}
                </h3>

                <p className="text-muted text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
