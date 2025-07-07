import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { ScrollToTop } from './hooks/ScrollTop';
import { NavBar } from './components/common/Navbar';
import { LandingPage } from './components/pages/LandingPage';

function App() {
    return (
        <BrowserRouter>
            <ScrollToTop />

            <NavBar />

            <Routes>
                <Route path="/" element={<LandingPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
