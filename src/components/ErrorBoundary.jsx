import { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Unhandled React error:', error, errorInfo);
  }

  render() {
    if (!this.state.hasError) {
      return this.props.children;
    }

    return (
      <main
        role="alert"
        style={{
          minHeight: '100vh',
          display: 'grid',
          placeItems: 'center',
          padding: '2rem',
          background: '#0f172a',
          color: '#f8fafc',
          fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
          textAlign: 'center'
        }}
      >
        <section style={{ maxWidth: '32rem' }}>
          <h1 style={{ marginBottom: '1rem', fontSize: '2rem' }}>Free Finance Camp could not load</h1>
          <p style={{ marginBottom: '1.5rem', color: '#cbd5e1', lineHeight: 1.6 }}>
            A browser error interrupted the app. Reloading usually fixes stale cached files or blocked storage.
          </p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            style={{
              border: 0,
              borderRadius: '8px',
              padding: '0.8rem 1.2rem',
              background: '#10b981',
              color: '#04111d',
              cursor: 'pointer',
              fontWeight: 700
            }}
          >
            Reload Page
          </button>
        </section>
      </main>
    );
  }
}

export default ErrorBoundary;
