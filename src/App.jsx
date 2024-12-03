import './App.css';
import SectionHeader from './components/SectionHeader';
import GameSection from './components/GameSection';
function App() {
    return (
        <div className="bg-blue-400">
            <div className="w-1/2 m-auto">
                <SectionHeader />
                <GameSection />
            </div>
        </div>
    );
}

export default App;
