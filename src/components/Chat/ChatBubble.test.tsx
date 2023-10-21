import { render } from '@testing-library/react';
import ChatBubble from './ChatBubble';

describe('ChatBubble', () => {
    it('renders a sent message bubble', () => {
        const message = 'Hello, world!';
        const { getByText } = render(<ChatBubble type="sent" message={message} />);
        const bubble = getByText(message);
        expect(bubble).toHaveTextContent(message);
        expect(bubble).toHaveStyle(`
            color: rgb(255, 255, 255);
            background-color: rgb(11, 147, 246);
            align-self: flex-end;
        `);
    });

    it('renders a received message bubble', () => {
        const message = 'Hi there!';
        const { getByText } = render(<ChatBubble type="received" message={message} />);
        const bubble = getByText(message);
        expect(bubble).toHaveTextContent(message);
        expect(bubble).toHaveStyle(`
            color: rgb(0, 0, 0);
            background-color: rgb(229, 229, 234);
            align-self: flex-start;
        `);
    });
});
