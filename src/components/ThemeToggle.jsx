import { useTheme } from '../context/ThemeContext';

export default function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            type="button"
            onClick={toggleTheme}
            className={`theme-toggle-static ${theme === 'light' ? 'theme-toggle-static-light' : 'theme-toggle-static-dark'}`}
            aria-label="Toggle theme"
            title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
            <span className="theme-toggle-bar" aria-hidden="true"></span>
            <span>{theme === 'light' ? 'Light On' : 'Light Off'}</span>
        </button>
    );
}
