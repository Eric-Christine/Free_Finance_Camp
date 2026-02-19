import { Routes, Route, Navigate, useParams } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { useAuth } from './context/AuthContext';

const Login = lazy(() => import('./components/auth/Login'));
const Map = lazy(() => import('./components/Map'));
const Lesson = lazy(() => import('./components/Lesson'));
const VocabReview = lazy(() => import('./components/VocabReview'));
const LandingPage = lazy(() => import('./components/LandingPage'));
const AboutPage = lazy(() => import('./components/AboutPage'));
const PrivacyPage = lazy(() => import('./components/PrivacyPage'));
const CurriculumPage = lazy(() => import('./components/CurriculumPage'));
const LessonsHubPage = lazy(() => import('./components/LessonsHubPage'));
const LessonPreviewPage = lazy(() => import('./components/LessonPreviewPage'));
const ResourcesPage = lazy(() => import('./components/ResourcesPage'));

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
    <Suspense fallback={<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>Loading...</div>}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/curriculum" element={<CurriculumPage />} />
        <Route path="/resources" element={<ResourcesPage />} />
        <Route path="/lessons" element={<LessonsHubPage />} />
        <Route path="/lesson/:lessonId" element={<LessonPreviewPage />} />
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
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Suspense>
  );
}

export default App;
