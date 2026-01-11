const projects = [
  {
    title: "Webshop for Fashion Brand Limitato.",
    tags: ["Development", "Shopify"],
    description: "Web development for Limitato a Scandinavian Fashion brand with a focus on Wearable Art."
  },
  {
    title: "A Web Platform for SDSN Northern Europe.",
    tags: ["Development", "CMS"],
    description: "A web platform for SDSN Northern Europe that links knowledge to action for society."
  },
  {
    title: "AI-Powered E-Commerce",
    tags: ["Development", "AI"],
    description: "Modern online store with intelligent product recommendations."
  },
  {
    title: "Minimalist Brand Identity",
    tags: ["Design", "Branding"],
    description: "Complete brand identity for a Nordic startup."
  }
];

const WorkSection = () => {
  return (
    <section id="work" className="py-24 bg-background">
      <div className="container mx-auto px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
              Featured Work
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore our recent projects and success stories
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <div 
                key={index}
                className="group bg-card rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 border border-border hover:border-primary/50"
              >
                <div className="aspect-video bg-gradient-to-br from-secondary via-accent to-muted"></div>
                <div className="p-8 space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, tagIndex) => (
                      <span 
                        key={tagIndex}
                        className="text-xs px-3 py-1 bg-secondary text-muted-foreground rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  
                  <p className="text-muted-foreground leading-relaxed">
                    {project.description}
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

export default WorkSection;
