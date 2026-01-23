import { useParams, Link } from 'react-router-dom';
import { curriculum } from '../data/curriculum';
import { useProgress } from '../context/ProgressContext';
import CompoundInterest from './interactive/CompoundInterest';
import BudgetAllocator from './interactive/BudgetAllocator';
import CarCalculator from './interactive/CarCalculator';
import InsuranceCompare from './interactive/InsuranceCompare';

// Map of widget names to components
const WIDGETS = {
  CompoundInterest: CompoundInterest,
  BudgetAllocator: BudgetAllocator,
  CarCalculator: CarCalculator,
  InsuranceCompare: InsuranceCompare
};

export default function Lesson() {
  const { lessonId } = useParams();
  const { completeLesson, isLessonCompleted, xp } = useProgress();

  // Find current lesson and module
  let currentLesson = null;
  let currentModule = null;
  let nextLessonUrl = '/map';

  for (const module of curriculum) {
    const lesson = module.lessons.find(l => l.id === lessonId);
    if (lesson) {
      currentLesson = lesson;
      currentModule = module;

      // Find next lesson
      const lessonIndex = module.lessons.indexOf(lesson);
      if (lessonIndex < module.lessons.length - 1) {
        nextLessonUrl = `/learn/${module.lessons[lessonIndex + 1].id}`;
      } else {
        // Try next module
        const moduleIndex = curriculum.indexOf(module);
        if (moduleIndex < curriculum.length - 1) {
          nextLessonUrl = `/learn/${curriculum[moduleIndex + 1].lessons[0].id}`;
        }
      }
      break;
    }
  }

  if (!currentLesson) {
    return <div style={{ padding: '2rem' }}>Lesson not found</div>;
  }

  const WidgetComponent = currentLesson.widget ? WIDGETS[currentLesson.widget] : null;

  return (
    <div className="lesson-container">
      {/* Header */}
      <header style={{
        padding: '1rem',
        borderBottom: '1px solid var(--border)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'var(--bg-main)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Link to="/map" style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>← Curriculum</Link>
          <span style={{ color: 'var(--text-muted)' }}>/</span>
          <span style={{ fontWeight: '500' }}>{currentModule.title}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span style={{
            backgroundColor: 'var(--accent)',
            color: 'black',
            padding: '0.25rem 0.75rem',
            borderRadius: '999px',
            fontSize: '0.8rem',
            fontWeight: 'bold'
          }}>
            ⭐ {xp} XP
          </span>
        </div>
      </header>

      {/* Content */}
      <div className="lesson-content-wrapper">
        {/* Left Side: Lesson Content */}
        <div className="lesson-text-column">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
            <h1 style={{ fontSize: '1.75rem' }}>{currentLesson.title}</h1>
            {currentLesson.xpReward && (
              <span style={{
                backgroundColor: 'rgba(245, 158, 11, 0.2)',
                color: 'var(--accent)',
                padding: '0.2rem 0.5rem',
                borderRadius: 'var(--radius)',
                fontSize: '0.75rem',
                fontWeight: 'bold'
              }}>
                +{currentLesson.xpReward} XP
              </span>
            )}
          </div>

          {/* Story Section */}
          {currentLesson.story && (
            <div style={{
              backgroundColor: 'rgba(59, 130, 246, 0.1)',
              border: '1px solid var(--secondary)',
              borderRadius: 'var(--radius)',
              padding: '1rem',
              marginBottom: '1.5rem'
            }}>
              <div style={{ fontWeight: 'bold', color: 'var(--secondary)', marginBottom: '0.5rem' }}>
                📖 Story: Meet {currentLesson.story.character}
              </div>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-light)' }}>
                {currentLesson.story.scenario}
              </p>
            </div>
          )}

          <div style={{ lineHeight: '1.7', color: 'var(--text-light)', marginBottom: '3rem' }}>
            <p style={{ marginBottom: '1rem', color: 'var(--text-muted)' }}>{currentLesson.description}</p>
            {currentLesson.content && currentLesson.content.map((paragraph, idx) => (
              <p key={idx} style={{
                marginBottom: paragraph === '' ? '0.5rem' : '1rem',
                fontWeight: paragraph.startsWith('OPTION') || paragraph.startsWith('•') || paragraph.endsWith(':') ? 'bold' : 'normal',
                color: paragraph.startsWith('Pro tip') ? 'var(--primary)' : 'inherit'
              }}>
                {paragraph}
              </p>
            ))}
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
            <button
              className={isLessonCompleted(currentLesson.id) ? "btn btn-outline" : "btn btn-primary"}
              onClick={() => completeLesson(currentLesson.id, currentLesson.xpReward || 10)}
            >
              {isLessonCompleted(currentLesson.id) ? 'Completed ✓' : 'Mark as Complete'}
            </button>

            {isLessonCompleted(currentLesson.id) && (
              <Link to={nextLessonUrl} className="btn btn-primary" style={{ marginLeft: '1rem' }}>
                Next Lesson →
              </Link>
            )}
          </div>
        </div>

        {/* Right Side: Interactive Widget */}
        <div className="lesson-widget-column">
          {WidgetComponent ? (
            <WidgetComponent />
          ) : (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              color: 'var(--text-muted)',
              border: '2px dashed var(--border)',
              borderRadius: 'var(--radius)'
            }}>
              📚 Reading-only lesson. No interactive widget.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
