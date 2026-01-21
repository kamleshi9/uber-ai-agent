interface NavigationProps {
  currentSection: number;
  onSectionChange: (section: number) => void;
}

const sections = [
  { id: 1, title: '1. Intro to LLM APIs', desc: 'Basic OpenAI API call' },
  { id: 2, title: '2. Conversations', desc: 'Context & memory' },
  { id: 3, title: '3. Function Calling', desc: 'Tools & APIs' },
  { id: 4, title: '4. AI Agent', desc: 'Multi-step reasoning' },
];

export default function Navigation({ currentSection, onSectionChange }: NavigationProps) {
  return (
    <nav className="navigation">
      <h1 className="app-title">AI Agent Learning Lab</h1>
      <div className="nav-buttons">
        {sections.map((section) => (
          <button
            key={section.id}
            className={`nav-button ${currentSection === section.id ? 'active' : ''}`}
            onClick={() => onSectionChange(section.id)}
          >
            <div className="nav-button-title">{section.title}</div>
            <div className="nav-button-desc">{section.desc}</div>
          </button>
        ))}
      </div>
    </nav>
  );
}
