import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { ScrollToTop } from './hooks/ScrollTop';
import { LandingPage } from './components/pages/LandingPage';

function App() {
    return (
        <BrowserRouter basename="/landing-campana-1-1.0">
            <ScrollToTop />

            <Routes>
                <Route path="/" element={<LandingPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
