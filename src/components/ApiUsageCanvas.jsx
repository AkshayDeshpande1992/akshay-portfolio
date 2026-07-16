import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check } from 'lucide-react';

const ApiUsageCanvas = () => {
  const [copied, setCopied] = useState(false);

  const apiExample = `POST https://multi-agent-orchestrator-u7db.onrender.com/api/agent/run
Content-Type: "application/json"

Body: "Create a plan to learn AI, considering latest advancements in AI"
`;

  const curlExample = `curl -X POST https://multi-agent-orchestrator-u7db.onrender.com/api/agent/run \\
  -H "Content-Type: application/json" \\
  -d '"Create a plan to learn AI, considering latest advancements in AI"
  '`;

  const jsExample = `const response = await fetch(
  'https://multi-agent-orchestrator-u7db.onrender.com/api/agent/run',
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body:  'Create a plan to learn AI, considering latest advancements in AI'
  }
);

const data = await response.json();
console.log(data);`;

  const [activeTab, setActiveTab] = useState('rest');

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getExample = () => {
    switch (activeTab) {
      case 'curl':
        return curlExample;
      case 'javascript':
        return jsExample;
      default:
        return apiExample;
    }
  };

  return (
    <div className="space-y-6 p-2">
      {/* Tabs */}
      <div className="flex gap-2 border-b border-cyan-400/20">
        {['rest', 'curl', 'javascript'].map((tab) => (
          <motion.button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 font-medium text-sm transition-all ${
              activeTab === tab
                ? 'text-cyan-400 border-b-2 border-cyan-400'
                : 'text-gray-400 hover:text-gray-300'
            }`}
            whileHover={{ y: -2 }}
          >
            {tab === 'rest' && 'REST'}
            {tab === 'curl' && 'cURL'}
            {tab === 'javascript' && 'JavaScript'}
          </motion.button>
        ))}
      </div>

      {/* Code Block */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className="relative"
      >
        <div className="bg-gray-950/50 border border-cyan-400/20 rounded-lg p-4 font-mono text-sm overflow-x-auto max-h-96">
          <pre className="text-cyan-300 whitespace-pre-wrap break-words">
            {getExample()}
          </pre>
        </div>

        {/* Copy Button */}
        <motion.button
          onClick={() => copyToClipboard(getExample())}
          className="absolute top-3 right-3 p-2 bg-cyan-400/10 border border-cyan-400/20 rounded-lg hover:bg-cyan-400/20 transition-all"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {copied ? (
            <Check size={18} className="text-green-400" />
          ) : (
            <Copy size={18} className="text-cyan-400" />
          )}
        </motion.button>
      </motion.div>

      {/* Response Example */}
      <div>
        <h4 className="text-sm font-bold text-gray-300 mb-2">
          Response Example
        </h4>
        <div className="bg-gray-950/50 border border-cyan-400/20 rounded-lg p-4 font-mono text-sm">
          <pre className="text-green-300 whitespace-pre-wrap break-words text-xs">
            {`{
  "status": "success",
  "agents_involved": [
    "PlannerAgent",
    "ResearcherAgent",
    "AnalysisAgent"
  ],
  "result": "Comprehensive AI learning plan with latest advancements...",
  "execution_time_ms": 2840
}`}
          </pre>
        </div>
      </div>

      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="bg-cyan-400/5 border border-cyan-400/10 rounded-lg p-3">
          <p className="text-xs font-bold text-cyan-400 mb-1">Multi-Agent</p>
          <p className="text-xs text-gray-400">
            Orchestrates multiple specialized agents
          </p>
        </div>
        <div className="bg-cyan-400/5 border border-cyan-400/10 rounded-lg p-3">
          <p className="text-xs font-bold text-cyan-400 mb-1">Real-time</p>
          <p className="text-xs text-gray-400">
            SignalR streaming for live updates
          </p>
        </div>
        <div className="bg-cyan-400/5 border border-cyan-400/10 rounded-lg p-3">
          <p className="text-xs font-bold text-cyan-400 mb-1">LLM Agnostic</p>
          <p className="text-xs text-gray-400">
            Works with OpenAI, Groq, Gemini & more
          </p>
        </div>
      </div>
    </div>
  );
};

export default ApiUsageCanvas;
