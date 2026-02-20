import { useTheme } from '../context/ThemeContext';
import { useRef, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'theme-toggle-pos';
const BTN_SIZE = 56; // matches 3.5rem at 16px base

function getDefaultPos() {
    const isMobile = window.innerWidth <= 768;
    return isMobile
        ? { x: 16, y: window.innerHeight - BTN_SIZE - 16 }
        : { x: window.innerWidth - BTN_SIZE - 32, y: window.innerHeight - BTN_SIZE - 32 };
}

function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
}

export default function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();
    const btnRef = useRef(null);
    const posRef = useRef(null);
    const dragState = useRef(null); // { startX, startY, originX, originY }
    const isDragging = useRef(false);

    // Initialize position
    useEffect(() => {
        try {
            const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
            if (saved && typeof saved.x === 'number' && typeof saved.y === 'number') {
                posRef.current = saved;
            }
        } catch { /* ignore */ }

        if (!posRef.current) posRef.current = getDefaultPos();
        applyPos(posRef.current, true);
    }, []);

    const applyPos = (pos, reveal = false) => {
        if (!btnRef.current) return;
        const maxX = window.innerWidth - BTN_SIZE;
        const maxY = window.innerHeight - BTN_SIZE;
        const x = clamp(pos.x, 0, maxX);
        const y = clamp(pos.y, 0, maxY);
        btnRef.current.style.left = `${x}px`;
        btnRef.current.style.top = `${y}px`;
        if (reveal) btnRef.current.style.opacity = '1';
    };

    const savePos = (pos) => {
        posRef.current = pos;
        try { localStorage.setItem(STORAGE_KEY, JSON.stringify(pos)); } catch { /* ignore */ }
    };

    // --- Mouse events ---
    const onMouseDown = useCallback((e) => {
        if (e.button !== 0) return;
        const rect = btnRef.current.getBoundingClientRect();
        dragState.current = { startX: e.clientX, startY: e.clientY, originX: rect.left, originY: rect.top };
        isDragging.current = false;
        e.preventDefault();

        const onMouseMove = (e) => {
            const dx = e.clientX - dragState.current.startX;
            const dy = e.clientY - dragState.current.startY;
            if (!isDragging.current && Math.abs(dx) < 5 && Math.abs(dy) < 5) return;
            isDragging.current = true;
            applyPos({ x: dragState.current.originX + dx, y: dragState.current.originY + dy });
        };

        const onMouseUp = (e) => {
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
            if (!isDragging.current) {
                toggleTheme();
            } else {
                const rect = btnRef.current.getBoundingClientRect();
                savePos({ x: rect.left, y: rect.top });
            }
            isDragging.current = false;
        };

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    }, [toggleTheme]);

    // --- Touch events ---
    const onTouchStart = useCallback((e) => {
        const t = e.touches[0];
        const rect = btnRef.current.getBoundingClientRect();
        dragState.current = { startX: t.clientX, startY: t.clientY, originX: rect.left, originY: rect.top };
        isDragging.current = false;

        const onTouchMove = (e) => {
            const t = e.touches[0];
            const dx = t.clientX - dragState.current.startX;
            const dy = t.clientY - dragState.current.startY;
            if (!isDragging.current && Math.abs(dx) < 5 && Math.abs(dy) < 5) return;
            isDragging.current = true;
            e.preventDefault();
            applyPos({ x: dragState.current.originX + dx, y: dragState.current.originY + dy });
        };

        const onTouchEnd = () => {
            document.removeEventListener('touchmove', onTouchMove);
            document.removeEventListener('touchend', onTouchEnd);
            if (!isDragging.current) {
                toggleTheme();
            } else {
                const rect = btnRef.current.getBoundingClientRect();
                savePos({ x: rect.left, y: rect.top });
            }
            isDragging.current = false;
        };

        document.addEventListener('touchmove', onTouchMove, { passive: false });
        document.addEventListener('touchend', onTouchEnd);
    }, [toggleTheme]);

    // Re-clamp on window resize
    useEffect(() => {
        const onResize = () => {
            if (posRef.current) applyPos(posRef.current);
        };
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, []);

    return (
        <button
            ref={btnRef}
            onMouseDown={onMouseDown}
            onTouchStart={onTouchStart}
            className="theme-toggle"
            aria-label="Toggle theme"
            title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
            {theme === 'light' ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                </svg>
            ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="5"></circle>
                    <line x1="12" y1="1" x2="12" y2="3"></line>
                    <line x1="12" y1="21" x2="12" y2="23"></line>
                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                    <line x1="1" y1="12" x2="3" y2="12"></line>
                    <line x1="21" y1="12" x2="23" y2="12"></line>
                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                </svg>
            )}
        </button>
    );
}
