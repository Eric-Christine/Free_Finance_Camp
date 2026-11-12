// Use the same GA4 tag configured in index.html so completion events do not
// depend on a separate Firebase web-app configuration.
export async function logGoalCompletion(name, params = {}) {
    if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;
    window.gtag('event', 'goal_completion', { name, ...params });
}
