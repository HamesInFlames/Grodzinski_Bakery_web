import { Component } from "react";

export default class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("ErrorBoundary caught:", error, info);
  }

  handleReload = () => {
    this.setState({ hasError: false });
    window.location.reload();
  };

  render() {
    if (!this.state.hasError) return this.props.children;
    return (
      <section className="error-boundary">
        <div className="error-boundary__inner">
          <h1 className="error-boundary__title">Something went wrong</h1>
          <p className="error-boundary__copy">
            We hit an unexpected error. Reloading usually fixes it — if not,
            please call us at <a href="tel:9058821350">(905) 882-1350</a>.
          </p>
          <button
            type="button"
            className="btn btn--primary btn--lg"
            onClick={this.handleReload}
          >
            Reload page
          </button>
        </div>
      </section>
    );
  }
}
