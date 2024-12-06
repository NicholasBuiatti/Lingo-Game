import './App.css';
import SectionHeader from './components/SectionHeader';
import GameSection from './components/GameSection';
function App() {
    return (
        <div className="flex bg-gradient-to-r from-[#80deea] to-[#0097a7] h-screen">
            <div className="w-4/12">
                <SectionHeader />
            </div>
            <div className="w-8/12 pt-5">
                <GameSection />
            </div>
        </div>
    );
}

export default App;
