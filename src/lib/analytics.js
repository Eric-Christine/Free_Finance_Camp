import { getApp, getApps, initializeApp } from 'firebase/app';
import { getAnalytics, isSupported, logEvent } from 'firebase/analytics';

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

const hasAnalyticsConfig = !!(
    firebaseConfig.apiKey &&
    firebaseConfig.authDomain &&
    firebaseConfig.projectId &&
    firebaseConfig.appId &&
    firebaseConfig.measurementId
);

let analyticsPromise = null;

async function getAnalyticsInstance() {
    if (typeof window === 'undefined' || !hasAnalyticsConfig) {
        return null;
    }

    if (!analyticsPromise) {
        analyticsPromise = (async () => {
            const supported = await isSupported().catch(() => false);
            if (!supported) return null;

            const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
            return getAnalytics(app);
        })();
    }

    return analyticsPromise;
}

export async function logGoalCompletion(name, params = {}) {
    const analytics = await getAnalyticsInstance();
    if (!analytics) return;

    logEvent(analytics, 'goal_completion', {
        name,
        ...params
    });
}

