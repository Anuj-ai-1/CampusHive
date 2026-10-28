import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

class RootErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  handleResetAndReload = () => {
    try {
      window.localStorage.clear();
    } catch {
      // ignore storage errors
    }
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#EEEEEE] text-[#363636] flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-white border-2 border-[#363636] border-t-4 border-t-[#F63F3A] rounded-xl p-6 space-y-4 text-center shadow-lg">
            <h1 className="text-lg font-bold text-[#363636]">
              UniHive Session Refreshed
            </h1>
            <p className="text-xs text-[#363636]/80 leading-relaxed">
              Cached browser data from an older version conflicted with the latest update. Click below to reset local cache and reload UniHive.
            </p>
            <button
              type="button"
              onClick={this.handleResetAndReload}
              className="w-full py-2.5 px-4 rounded-lg bg-[#17AAAA] hover:bg-[#363636] text-[#EEEEEE] text-xs font-bold transition-colors"
            >
              Reset Cache & Launch UniHive
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RootErrorBoundary>
      <App />
    </RootErrorBoundary>
  </React.StrictMode>
);
