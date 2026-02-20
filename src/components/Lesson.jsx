import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { curriculum } from '../data/curriculum';
import { useProgress } from '../context/ProgressContext';
import { WIDGET_COMPONENTS } from './interactive/widgetRegistry';
import Quiz from './Quiz';
import SEO from './SEO';

const STORY_PROFILES = [
  { character: 'Maya', context: 'a first-generation college grad' },
  { character: 'Andre', context: 'a new parent balancing bills and career goals' },
  { character: 'Janelle', context: 'a nurse working rotating shifts' },
  { character: 'Luis', context: 'an apprentice trying to build savings early' },
  { character: 'Nia', context: 'a freelancer with variable monthly income' },
  { character: 'Ethan', context: 'a new manager learning long-term planning' }
];

function stableHash(input) {
  let hash = 0;
  for (let i = 0; i < input.length; i += 1) {
    hash = ((hash << 5) - hash) + input.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

function buildAutoStory(lesson) {
  const profile = STORY_PROFILES[stableHash(lesson.id) % STORY_PROFILES.length];
  return {
    character: profile.character,
    scenario: `${profile.character} is ${profile.context}. In this lesson on "${lesson.title}", ${profile.character} has to choose a practical next step instead of reacting short-term. The goal is to make one smart move this week that builds long-term options.`
  };
}

function buildActionPrompts(lesson, module) {
  return [
    `Pick one decision this week connected to "${lesson.title}".`,
    `Automate one behavior that supports ${module.title} (transfer, contribution, reminder, or rule).`,
    'Book a 15-minute money check-in for next week and track what changed.'
  ];
}

export default function Lesson() {
  const { lessonId } = useParams();
  const { isLessonCompleted, xp } = useProgress();
  const [currentScreen, setCurrentScreen] = useState(0);

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

  const WidgetComponent = currentLesson.widget ? WIDGET_COMPONENTS[currentLesson.widget] : null;
  const lessonPosition = currentModule.lessons.findIndex(l => l.id === currentLesson.id) + 1;
  const moduleLessonCount = currentModule.lessons.length;
  const displayStory = currentLesson.story || buildAutoStory(currentLesson);
  const actionPrompts = buildActionPrompts(currentLesson, currentModule);

  return (
    <div className="lesson-container">
      <SEO
        title={currentLesson.title}
        description={currentLesson.description || `Lesson from ${currentModule.title}.`}
        path={`/learn/${lessonId}`}
        noindex={true}
      />
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
          <Link to="/tools" style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Tools</Link>
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
      {/* Content */}
      <div className="lesson-content-wrapper">
        {/* Left Side: Lesson Content */}
        <div className={WidgetComponent ? "lesson-text-column" : "lesson-text-full"}>
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

          <div style={{
            backgroundColor: 'rgba(16, 185, 129, 0.1)',
            border: '1px solid rgba(16, 185, 129, 0.35)',
            borderRadius: 'var(--radius)',
            padding: '0.85rem 1rem',
            marginBottom: '1.25rem'
          }}>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>
              Module Context
            </div>
            <div style={{ fontWeight: '600', marginBottom: '0.3rem' }}>
              Lesson {lessonPosition} of {moduleLessonCount} in {currentModule.title}
            </div>
            <p style={{ fontSize: '0.86rem', color: 'var(--text-light)', margin: 0 }}>
              {currentModule.description}
            </p>
          </div>

          {/* Story Section */}
          {displayStory && (
            <div style={{
              backgroundColor: 'rgba(59, 130, 246, 0.1)',
              border: '1px solid var(--secondary)',
              borderRadius: 'var(--radius)',
              padding: '1rem',
              marginBottom: '1.5rem'
            }}>
              <div style={{ fontWeight: 'bold', color: 'var(--secondary)', marginBottom: '0.5rem' }}>
                📖 Story: Meet {displayStory.character}
              </div>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-light)' }}>
                {displayStory.scenario}
              </p>
            </div>
          )}

          {/* Content - supports both screens array and legacy content array */}
          {(() => {
            // Determine if using screens or legacy content
            const hasScreens = currentLesson.screens && currentLesson.screens.length > 0;
            const screens = hasScreens ? currentLesson.screens : [{ content: currentLesson.content || [] }];
            const totalScreens = screens.length;
            const screen = screens[currentScreen] || screens[0];
            const isLastScreen = currentScreen >= totalScreens - 1;
            const isFirstScreen = currentScreen === 0;

            const renderContent = (contentArray) => {
              return contentArray.map((paragraph, idx) => {
                const parts = paragraph.split(/(\*\*.*?\*\*)/g);
                return (
                  <p key={idx} style={{
                    marginBottom: paragraph === '' ? '0.5rem' : '1rem',
                    fontWeight: paragraph.startsWith('OPTION') || paragraph.endsWith(':') ? 'bold' : 'normal',
                    color: paragraph.startsWith('Pro tip') ? 'var(--primary)' : 'inherit',
                    paddingLeft: paragraph.startsWith('•') ? '0.5rem' : '0'
                  }}>
                    {parts.map((part, i) => {
                      if (part.startsWith('**') && part.endsWith('**')) {
                        return <strong key={i}>{part.slice(2, -2)}</strong>;
                      }
                      return <span key={i}>{part}</span>;
                    })}
                  </p>
                );
              });
            };

            return (
              <div style={{ lineHeight: '1.7', color: 'var(--text-light)', marginBottom: '2rem' }}>
                {/* Screen progress indicator */}
                {hasScreens && totalScreens > 1 && (
                  <div style={{
                    display: 'flex',
                    gap: '0.5rem',
                    marginBottom: '1.5rem',
                    alignItems: 'center'
                  }}>
                    {screens.map((_, idx) => (
                      <div
                        key={idx}
                        style={{
                          width: idx === currentScreen ? '2rem' : '0.5rem',
                          height: '0.5rem',
                          borderRadius: '999px',
                          backgroundColor: idx <= currentScreen ? 'var(--primary)' : 'var(--bg-hover)',
                          transition: 'all 0.3s ease'
                        }}
                      />
                    ))}
                    <span style={{ marginLeft: '0.5rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      {currentScreen + 1} / {totalScreens}
                    </span>
                  </div>
                )}

                {/* Screen title if available */}
                {screen.title && (
                  <h2 style={{
                    fontSize: '1.25rem',
                    color: 'var(--primary)',
                    marginBottom: '1rem',
                    fontWeight: '600'
                  }}>
                    {screen.title}
                  </h2>
                )}

                {/* First screen shows description */}
                {isFirstScreen && (
                  <p style={{ marginBottom: '1rem', color: 'var(--text-muted)' }}>
                    {currentLesson.description}
                  </p>
                )}

                {/* Content */}
                {renderContent(screen.content || [])}

                {/* Screen navigation buttons */}
                {hasScreens && totalScreens > 1 && (
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginTop: '2rem',
                    paddingTop: '1rem',
                    borderTop: '1px solid var(--border)'
                  }}>
                    <button
                      onClick={() => setCurrentScreen(prev => prev - 1)}
                      disabled={isFirstScreen}
                      className="btn"
                      style={{
                        opacity: isFirstScreen ? 0.3 : 1,
                        cursor: isFirstScreen ? 'not-allowed' : 'pointer'
                      }}
                    >
                      ← Back
                    </button>
                    {!isLastScreen && (
                      <button
                        onClick={() => setCurrentScreen(prev => prev + 1)}
                        className="btn btn-primary"
                      >
                        Next →
                      </button>
                    )}
                  </div>
                )}
              </div>
            );
          })()}

          {/* Quiz Section - only show on last screen */}
          {(!currentLesson.screens || currentScreen >= currentLesson.screens.length - 1) && (
            <>
              <div style={{
                backgroundColor: 'rgba(245, 158, 11, 0.12)',
                border: '1px solid rgba(245, 158, 11, 0.35)',
                borderRadius: 'var(--radius)',
                padding: '1rem',
                marginTop: '1.2rem'
              }}>
                <h3 style={{ marginBottom: '0.6rem', fontSize: '1rem' }}>Apply This Lesson This Week</h3>
                {actionPrompts.map((prompt, idx) => (
                  <p key={idx} style={{ marginBottom: idx === actionPrompts.length - 1 ? 0 : '0.55rem', fontSize: '0.87rem' }}>
                    {idx + 1}. {prompt}
                  </p>
                ))}
              </div>
              <Quiz lessonId={currentLesson.id} xpReward={currentLesson.xpReward || 10} />
            </>
          )}

          {/* Navigation to next lesson */}
          {isLessonCompleted(currentLesson.id) && (
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
              <Link to={nextLessonUrl} className="btn btn-primary">
                Next Lesson →
              </Link>
            </div>
          )}
        </div>

        {/* Right Side: Interactive Widget (Only if exists) */}
        {WidgetComponent && (
          <div className="lesson-widget-column">
            <WidgetComponent />
          </div>
        )}
      </div>
    </div>
  );
}
