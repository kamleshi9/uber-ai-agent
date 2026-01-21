import { useState } from 'react';
import Navigation from './components/shared/Navigation';
import Section1Intro from './components/Section1_Intro';
import Section2Conversation from './components/Section2_Conversation';
import Section3Tools from './components/Section3_Tools';
import Section4Agent from './components/Section4_Agent';
import './App.css';

function App() {
  const [currentSection, setCurrentSection] = useState(1);

  return (
    <div className="app">
      <Navigation currentSection={currentSection} onSectionChange={setCurrentSection} />
      <main className="main-content">
        {currentSection === 1 && <Section1Intro />}
        {currentSection === 2 && <Section2Conversation />}
        {currentSection === 3 && <Section3Tools />}
        {currentSection === 4 && <Section4Agent />}
      </main>
    </div>
  );
}

export default App;
