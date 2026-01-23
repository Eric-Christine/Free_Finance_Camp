import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/auth/Login';
import Map from './components/Map';
import Lesson from './components/Lesson';
import VocabReview from './components/VocabReview';
import LandingPage from './components/LandingPage';
import { useAuth } from './context/AuthContext';

function PrivateRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<LandingPage />} />
      <Route path="/map" element={
        <PrivateRoute>
          <Map />
        </PrivateRoute>
      } />
      <Route path="/learn/:lessonId" element={
        <PrivateRoute>
          <Lesson />
        </PrivateRoute>
      } />
      <Route path="/vocab" element={
        <PrivateRoute>
          <VocabReview />
        </PrivateRoute>
      } />
    </Routes>
  );
}

export default App;
