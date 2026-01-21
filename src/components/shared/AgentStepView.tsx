import type { AgentStep } from '../../types';

interface AgentStepViewProps {
  steps: AgentStep[];
}

export default function AgentStepView({ steps }: AgentStepViewProps) {
  return (
    <div className="agent-steps">
      <h3>Agent Execution Steps</h3>
      {steps.map((step, idx) => (
        <div key={idx} className={`agent-step ${step.type}`}>
          <div className="step-header">
            <span className="step-number">Step {idx + 1}</span>
            <span className="step-type">{step.type.replace('_', ' ').toUpperCase()}</span>
            <span className="step-time">
              {new Date(step.timestamp).toLocaleTimeString()}
            </span>
          </div>
          <div className="step-content">
            {step.type === 'tool_call' && step.toolName && (
              <div className="tool-info">
                <strong>Tool:</strong> {step.toolName}
                <pre>{JSON.stringify(step.toolArgs, null, 2)}</pre>
              </div>
            )}
            {step.type === 'tool_result' && (
              <div className="tool-result">
                <strong>Result:</strong>
                <pre>{JSON.stringify(step.toolResult, null, 2)}</pre>
              </div>
            )}
            {(step.type === 'thinking' || step.type === 'response') && (
              <p>{step.content}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
