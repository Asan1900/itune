import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
    it('renders without crashing', () => {
        render(<App />);
        // Since App renders routes, we might not see much without navigating, 
        // but it should at least mount.
        // We can check for something that is always present, like the Toaster or just that it doesn't throw.
        expect(document.body).toBeInTheDocument();
    });
});
