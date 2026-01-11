const services = [
  {
    title: "Web Development",
    tags: ["Development", "Shopify"],
    description: "Custom websites built with modern technologies, optimized for performance and user experience."
  },
  {
    title: "Design & Branding",
    tags: ["Design", "Branding"],
    description: "Minimalist logos and brand identities inspired by Scandinavian principles."
  },
  {
    title: "AI Integration",
    tags: ["Service", "AI"],
    description: "Intelligent features powered by cutting-edge AI technology."
  }
];

const ServicesSection = () => {
  return (
    <section id="services" className="py-24 bg-muted/30">
      <div className="container mx-auto px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
              What We Do
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Comprehensive digital solutions tailored to your needs
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div 
                key={index}
                className="group bg-card rounded-xl p-8 hover:shadow-lg transition-all duration-300 border border-border hover:border-primary/50"
              >
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {service.tags.map((tag, tagIndex) => (
                      <span 
                        key={tagIndex}
                        className="text-xs px-3 py-1 bg-secondary text-muted-foreground rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  
                  <p className="text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
