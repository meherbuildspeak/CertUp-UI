import React from 'react'
import { mockChallenges } from '../../data/mockData'

export default function Challenge() {
  return (
    <section className="relative py-20 md:py-24 lg:py-28 border-t border-border/50 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header Section */}
        <div className="text-center flex flex-col items-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-4 max-w-3xl leading-tight">
            What CertUp Helps With
          </h2>

          <p className="text-muted text-base sm:text-lg leading-relaxed max-w-3xl">
            Growing organizations and startups often struggle to maintain a clear, unified understanding of their policy environment, which constrains effective ISO compliance planning.
          </p>
        </div>

        {/* 4-Column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {mockChallenges.map((item, index) => {
            const IconComponent = item.icon
            return (
              <div
                key={index}
                className="bg-surface border border-border rounded-xl p-6 flex flex-col items-start text-left hover:border-border/80 transition duration-200 group"
              >
                <div className="p-3 rounded-lg bg-accent/10 border border-accent/20 mb-5 group-hover:bg-accent/20 transition duration-200">
                  <IconComponent className="w-6 h-6 text-accent" />
                </div>

                <h3 className="text-white font-semibold text-lg mb-2">
                  {item.title}
                </h3>

                <p className="text-muted text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
