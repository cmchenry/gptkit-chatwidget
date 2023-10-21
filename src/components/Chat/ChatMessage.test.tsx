import { render, screen, fireEvent } from '@testing-library/react';
import ChatMessage from './ChatMessage';

describe('ChatMessage', () => {
    it('renders a list of messages', () => {
        const messages = [
            { id: 1, text: 'Hello' },
            { id: 2, text: 'How are you?' },
            { id: 3, text: 'I am fine, thank you.' },
        ];
        render(<ChatMessage messages={messages} />);
        const messageElements = screen.getAllByTestId('message');
        expect(messageElements).toHaveLength(messages.length);
        messageElements.forEach((element, index) => {
            expect(element).toHaveTextContent(messages[index].text);
        });
    });

    it('adds a new message when the user submits a message', async () => {
        const messages = [
            { id: 1, text: 'Hello' },
            { id: 2, text: 'How are you?' },
        ];
        const setMessages = jest.fn();
        render(<ChatMessage messages={messages} setMessages={setMessages} />);
        const inputElement = screen.getByLabelText('Message');
        const submitButtonElement = screen.getByLabelText('Send');
        const newMessageText = 'I am fine, thank you.';
        fireEvent.change(inputElement, { target: { value: newMessageText } });
        fireEvent.click(submitButtonElement);
        expect(setMessages).toHaveBeenCalledWith([
            ...messages,
            { id: 3, text: newMessageText },
        ]);
    });

    it('does not add a new message when the user submits an empty message', async () => {
        const messages = [
            { id: 1, text: 'Hello' },
            { id: 2, text: 'How are you?' },
        ];
        const setMessages = jest.fn();
        render(<ChatMessage messages={messages} setMessages={setMessages} />);
        const inputElement = screen.getByLabelText('Message');
        const submitButtonElement = screen.getByLabelText('Send');
        fireEvent.change(inputElement, { target: { value: '' } });
        fireEvent.click(submitButtonElement);
        expect(setMessages).not.toHaveBeenCalled();
    });
});
