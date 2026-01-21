import type { Message } from '../../types';

interface MessageBubbleProps {
  message: Message;
  showTimestamp?: boolean;
}

export default function MessageBubble({ message, showTimestamp }: MessageBubbleProps) {
  return (
    <div className={`message-bubble ${message.role}`}>
      <div className="message-header">
        <span className="message-role">{message.role.toUpperCase()}</span>
        {showTimestamp && message.timestamp && (
          <span className="message-timestamp">
            {new Date(message.timestamp).toLocaleTimeString()}
          </span>
        )}
      </div>
      <div className="message-content">{message.content}</div>
      {message.toolCalls && message.toolCalls.length > 0 && (
        <div className="tool-calls">
          {message.toolCalls.map((call, idx) => (
            <div key={idx} className="tool-call">
              <strong>🔧 Tool Call:</strong> {call.function.name}
              <pre>{JSON.stringify(JSON.parse(call.function.arguments), null, 2)}</pre>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
