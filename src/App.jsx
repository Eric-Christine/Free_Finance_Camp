import { Routes, Route, Navigate, useParams } from 'react-router-dom';
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

function LessonRoute() {
  const { lessonId } = useParams();
  return <Lesson key={lessonId} />;
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
          <LessonRoute />
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
