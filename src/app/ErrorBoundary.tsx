import React from 'react';

export default class ErrorBoundary extends React.Component {
	state = { hasError: false, error: null };

	// Called during rendering when a child throws
	static getDerivedStateFromError(error: Error) {
		return { hasError: true, error };
	}

	// Called after rendering — good for logging
	componentDidCatch(error: Error, info: React.ErrorInfo) {
		console.error(error);
	}

	render() {
		if (this.state.hasError) {
			return (this.props as any).fallback ?? <h2>Something went wrong.</h2>;
		}
		return (this.props as any).children;
	}
}
