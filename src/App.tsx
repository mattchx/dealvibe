import { Routes, Route } from 'react-router-dom'
import Layout from './routes/layout'
import HomePage from './routes/home'
import DealPage from './routes/deal'
import { ErrorBoundary } from '@/components/error-boundary'

function App() {
  return (
    <ErrorBoundary>
      <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="categories" element={<div>Categories Page</div>} />
        <Route path="trending" element={<div>Trending Page</div>} />
        <Route path="leaderboard" element={<div>Leaderboard Page</div>} />
        <Route path="merchants" element={<div>Merchants Page</div>} />
        <Route path="guidelines" element={<div>Guidelines Page</div>} />
        <Route path="faq" element={<div>FAQ Page</div>} />
        <Route path="blog" element={<div>Blog Page</div>} />
        <Route path="contact" element={<div>Contact Page</div>} />
        <Route path="terms" element={<div>Terms Page</div>} />
        <Route path="privacy" element={<div>Privacy Policy Page</div>} />
        <Route path="cookies" element={<div>Cookie Policy Page</div>} />
        <Route path="/deals/:id" element={<DealPage />} />
        <Route path="*" element={<div>404 - Page Not Found</div>} />
      </Route>
      </Routes>
    </ErrorBoundary>
  )
}

export default App