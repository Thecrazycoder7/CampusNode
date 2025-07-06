// App.tsx
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './resources.css';

const Resources = () => {
  const [resources, setResources] = useState([]);
  const [filteredResources, setFilteredResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentCategory, setCurrentCategory] = useState('All');

  useEffect(() => {
    // Simulate API call or data loading
    const loadResources = () => {
      // Sample resource data
      const sampleResources = [
        {
          id: 1,
          title: "MDN Web Docs",
          description: "The most comprehensive resource for web development, covering HTML, CSS, JavaScript and more.",
          url: "https://developer.mozilla.org",
          category: "Frontend",
          tags: ["HTML", "CSS", "JavaScript", "Web"],
          rating: 5,
          free: true
        },
        {
          id: 2,
          title: "React Official Documentation",
          description: "The official React documentation is the best place to learn React from the creators themselves.",
          url: "https://reactjs.org/docs/getting-started.html",
          category: "Frontend",
          tags: ["React", "JavaScript", "Frontend"],
          rating: 5,
          free: true
        },
        {
          id: 3,
          title: "Node.js Documentation",
          description: "Official Node.js documentation with guides, API references and tutorials.",
          url: "https://nodejs.org/en/docs/",
          category: "Backend",
          tags: ["Node.js", "JavaScript", "Backend"],
          rating: 4,
          free: true
        },
        {
          id: 4,
          title: "Flutter Documentation",
          description: "Comprehensive documentation for Flutter, Google's UI toolkit for building beautiful apps.",
          url: "https://flutter.dev/docs",
          category: "Mobile",
          tags: ["Flutter", "Dart", "Mobile"],
          rating: 4,
          free: true
        },
        {
          id: 5,
          title: "Docker Documentation",
          description: "Learn containerization with Docker's official documentation and tutorials.",
          url: "https://docs.docker.com/",
          category: "DevOps",
          tags: ["Docker", "Containers", "DevOps"],
          rating: 4,
          free: true
        },
        {
          id: 6,
          title: "Python for Data Science Handbook",
          description: "Free online book covering essential tools for working with data in Python.",
          url: "https://jakevdp.github.io/PythonDataScienceHandbook/",
          category: "Data Science",
          tags: ["Python", "Data Science", "Pandas"],
          rating: 5,
          free: true
        },
        {
          id: 7,
          title: "freeCodeCamp",
          description: "Thousands of free coding lessons and projects to help you learn to code.",
          url: "https://www.freecodecamp.org/",
          category: "Frontend",
          tags: ["Web", "JavaScript", "Fullstack"],
          rating: 5,
          free: true
        },
        {
          id: 8,
          title: "Kubernetes Documentation",
          description: "Official documentation for Kubernetes, the container orchestration system.",
          url: "https://kubernetes.io/docs/home/",
          category: "DevOps",
          tags: ["Kubernetes", "Containers", "DevOps"],
          rating: 4,
          free: true
        },
        {
          id: 9,
          title: "Swift Documentation",
          description: "Learn Swift programming language for iOS, macOS, and other Apple platforms.",
          url: "https://docs.swift.org/swift-book/",
          category: "Mobile",
          tags: ["Swift", "iOS", "Apple"],
          rating: 4,
          free: true
        },
        {
          id: 10,
          title: "The Odin Project",
          description: "Free full-stack curriculum with projects and a supportive community.",
          url: "https://www.theodinproject.com/",
          category: "Fullstack",
          tags: ["Web", "JavaScript", "Ruby"],
          rating: 5,
          free: true
        },
        {
          id: 11,
          title: "AWS Documentation",
          description: "Official documentation for Amazon Web Services cloud platform.",
          url: "https://docs.aws.amazon.com/",
          category: "DevOps",
          tags: ["AWS", "Cloud", "DevOps"],
          rating: 4,
          free: true
        },
        {
          id: 12,
          title: "TensorFlow Tutorials",
          description: "Official tutorials and guides for TensorFlow machine learning library.",
          url: "https://www.tensorflow.org/tutorials",
          category: "Data Science",
          tags: ["Machine Learning", "Python", "AI"],
          rating: 4,
          free: true
        }
      ];

      setResources(sampleResources);
      setFilteredResources(sampleResources);
      setLoading(false);
    };

    loadResources();
  }, []);

  useEffect(() => {
    const filtered = resources.filter(resource => {
      // Category filter
      const categoryMatch = currentCategory === 'All' || resource.category === currentCategory;
      
      // Search term filter
      const searchMatch = 
        resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      
      return categoryMatch && searchMatch;
    });

    setFilteredResources(filtered);
  }, [searchTerm, currentCategory, resources]);

  const handleSearch = (e) => {
    e.preventDefault();
  };

  const handleCategoryChange = (category) => {
    setCurrentCategory(category);
  };

  const getTagColor = (tag) => {
    const colors = [
      'primary',
      'secondary',
      'success',
      'danger',
      'warning',
      'info',
      'light',
      'dark'
    ];
    
    // Simple hash to get consistent colors for the same tag
    let hash = 0;
    for (let i = 0; i < tag.length; i++) {
      hash = tag.charCodeAt(i) + ((hash << 5) - hash);
    }
    
    return colors[Math.abs(hash) % colors.length];
  };

  const categories = ['All', 'Frontend', 'Backend', 'Mobile', 'DevOps', 'Data Science'];

  return (
    <div className="min-vh-100 bg-light">
      <header
        className="bg-primary text-white py-5"
        style={{
          background: " linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
          padding: "20px",
        }}
      >
        <div className="container">
          <h1 className="mb-2 font-weight-bold">Tech Learning Resources</h1>
          <p className="text-light">
            Curated collection of the best resources to learn new technologies
          </p>

          <div className="mt-4">
            <form onSubmit={handleSearch} className="mb-3">
              <div className="input-group">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search resources (e.g. 'React', 'Python')..."
                  className="form-control form-control-lg"
                />
                <button type="submit" className="btn btn-dark">
                  Search
                </button>
              </div>
            </form>

            <div className="d-flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategoryChange(category)}
                  className={`btn btn-sm ${
                    currentCategory === category
                      ? "btn-light text-primary"
                      : "btn-outline-light"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      <main className="container py-5 px-5">
        <div className="mb-4 text-muted">
          {loading
            ? "Loading resources..."
            : `Showing ${filteredResources.length} resources`}
        </div>

        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-2 text-muted">Loading resources...</p>
          </div>
        ) : (
          <div className="row g-4">
            {filteredResources.map((resource) => (
              <div key={resource.id} className="col-md-6 col-lg-4">
                <div
                  className="card h-100 shadow-sm border-0 hover-shadow transition-all cursor-pointer"
                  onClick={() => window.open(resource.url, "_blank")}
                >
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-start mb-3">
                      <h3 className="h5 card-title mb-0">{resource.title}</h3>
                      <span
                        className={`badge ${
                          resource.free ? "bg-success" : "bg-primary"
                        }`}
                      >
                        {resource.free ? "FREE" : "PREMIUM"}
                      </span>
                    </div>
                    <p className="card-text text-muted mb-3">
                      {resource.description}
                    </p>
                    <div className="mb-3">
                      {resource.tags.map((tag) => (
                        <span
                          key={tag}
                          className={`badge bg-${getTagColor(tag)} me-1 mb-1`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        {[...Array(5)].map((_, i) => (
                          <span
                            key={i}
                            className={`${
                              i < resource.rating
                                ? "text-warning"
                                : "text-muted"
                            }`}
                          >
                            {i < resource.rating ? "★" : "☆"}
                          </span>
                        ))}
                      </div>
                      <small className="text-muted">{resource.category}</small>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <footer className="bg-dark text-white py-4">
        <div className="container text-center">
          <p className="mb-0">
            © {new Date().getFullYear()} Tech Learning Resources. All rights
            reserved.
          </p>
          <p className="small mt-2 text-muted">Built with ❤️ for developers</p>
        </div>
      </footer>
    </div>
  );
};

export default Resources;
