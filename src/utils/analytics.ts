/* Analytics utilities */

import ReactGA from 'react-ga';

export function initializeAnalytics(trackingId: string): void {
    if (!trackingId) {
        throw new Error('Tracking ID is required');
    }
    ReactGA.initialize(trackingId);
}

export function logPageView(): void {
    ReactGA.pageview(window.location.pathname + window.location.search);
}

export function logEvent(category: string, action: string, label?: string): void {
    if (!category || !action) {
        throw new Error('Event category and action are required');
    }
    ReactGA.event({ category, action, label });
}