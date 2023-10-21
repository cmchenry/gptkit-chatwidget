import { render, screen } from '@testing-library/react';
import ChatCanvas from './ChatCanvas';

describe('ChatCanvas', () => {
    it('renders a chat bubble with initial message', () => {
        render(<ChatCanvas />);
        const initialMessage = screen.getByText('Hello, how can I help you today?');
        expect(initialMessage).toBeInTheDocument();
    });

    it('renders a chat message input', () => {
        render(<ChatCanvas />);
        const messageInput = screen.getByRole('textbox');
        expect(messageInput).toBeInTheDocument();
    });

    it('adds a new message when user sends a message', () => {
        render(<ChatCanvas />);
        const messageInput = screen.getByRole('textbox');
        const sendButton = screen.getByRole('button', { name: 'Send' });

        // Type a message and click send
        messageInput.value = 'Test message';
        sendButton.click();

        // Check that the new message is displayed
        const newMessage = screen.getByText('Test message');
        expect(newMessage).toBeInTheDocument();
    });
});
