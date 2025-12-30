import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
    it('renders correctly with default props', () => {
        render(<Button>Click me</Button>);
        const button = screen.getByRole('button', { name: /click me/i });
        expect(button).toBeDefined();
        expect(button.className).toContain('bg-gradient-to-r'); // primary variant default
    });

    it('renders with secondary variant', () => {
        render(<Button variant="secondary">Secondary</Button>);
        const button = screen.getByRole('button', { name: /secondary/i });
        expect(button.className).toContain('bg-primary');
        expect(button.className).not.toContain('bg-gradient-to-r');
    });

    it('renders as a link when href is provided', () => {
        render(<Button href="/test">Link Button</Button>);
        const link = screen.getByRole('link', { name: /link button/i });
        expect(link).toBeDefined();
        expect(link.getAttribute('href')).toBe('/test');
    });

    it('shows loading state properly', () => {
        render(<Button isLoading>Loading</Button>);
        const button = screen.getByRole('button');
        expect(button).toBeDefined();
        // Check for disabled attribute
        expect(button.hasAttribute('disabled')).toBe(true);
    });
});
