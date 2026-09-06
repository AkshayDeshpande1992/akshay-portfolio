import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check, Play, Loader, AlertCircle } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github-dark.css';

const ApiUsageCanvas = () => {
  const [copied, setCopied] = useState(false);
  const [inputText, setInputText] = useState(
    'Create a plan to learn AI, considering latest advancements in AI'
  );
  const [activeTab, setActiveTab] = useState('rest');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [renderedView, setRenderedView] = useState(true);

  const apiUrl = process.env.REACT_APP_API_URL || 'https://multi-agent-orchestrator-u7db.onrender.com/api/agent/run';

  const apiExample = `POST ${apiUrl}\nContent-Type: \"application/json\"\n\nBody: \"Create a plan to learn AI, considering latest advancements in AI\"\n`;

  const curlExample = `curl -X POST ${apiUrl} \\\n  -H \"Content-Type: application/json\" \\\n  -d '\"Create a plan to learn AI, considering latest advancements in AI\"'\n`;

  const jsExample = `const response = await fetch(\n  '${apiUrl}',\n  {\n    method: 'POST',\n    headers: {\n      'Content-Type': 'application/json'\n    },\n    body: JSON.stringify('Create a plan to learn AI, considering latest advancements in AI')\n  }\n);\n\nconst data = await response.json();\nconsole.log(data);`;

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

  const runApi = async () => {
    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        // The API examples show a raw JSON string in the body (e.g. -d '"..."'),
        // so we stringify the inputText to match that shape.
        body: JSON.stringify(inputText)
      });

      // try to parse JSON, otherwise capture text
      const text = await res.text();
      let parsed = null;
      try {
        parsed = JSON.parse(text);
      } catch (e) {
        parsed = text;
      }

      if (!res.ok) {
        setError({ status: res.status, body: parsed });
      } else {
        setResponse(parsed);
      }
    } catch (e) {
      setError({ message: e.message });
    } finally {
      setLoading(false);
    }
  };

  const extractStringFromResponse = (resp) => {
    if (!resp) return '';
    if (typeof resp === 'string') return resp;
    if (typeof resp === 'object') {
      if (typeof resp.result === 'string') return resp.result;
      if (typeof resp.content === 'string') return resp.content;
      // Some APIs return { choices:[{message:{content: '...'}}] }
      try {
        if (Array.isArray(resp.choices) && resp.choices.length) {
          const first = resp.choices[0];
          if (first && first.message && typeof first.message.content === 'string') return first.message.content;
          if (first && typeof first.text === 'string') return first.text;
        }
      } catch (e) {
        // ignore
      }
      // fallback to pretty JSON
      return JSON.stringify(resp, null, 2);
    }
    return String(resp);
  };

  const looksLikeMarkdown = (text) => {
    if (!text) return false;
    const mdIndicators = [
      /^#{1,6}\s+/m,
      /^>\s+/m,
      /```/,
      /\[.+\]\(.+\)/,
      /^-\s+/m,
      /^\*\s+/m,
      /\n-{3,}\n/,
      /\*\*.+\*\*/
    ];
    return mdIndicators.some((re) => re.test(text));
  };

  const renderResponse = () => {
    if (loading) {
      return (
        <div className="flex items-center gap-2 text-sm text-gray-300">
          <Loader className="animate-spin" /> Running...
        </div>
      );
    }

    if (error) {
      return (
        <pre className="text-red-300 whitespace-pre-wrap break-words text-xs">
          {JSON.stringify(error, null, 2)}
        </pre>
      );
    }

    if (response) {
      const text = extractStringFromResponse(response);
      const isMd = looksLikeMarkdown(text);

      if (isMd && renderedView) {
        return (
          <div className="prose max-w-full text-sm markdown-body">
            <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>{text}</ReactMarkdown>
          </div>
        );
      }

      // Raw view (either not markdown or user chose raw)
      return (
        <pre className="text-green-300 whitespace-pre-wrap break-words text-xs">
          {text}
        </pre>
      );
    }

    return (
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
    );
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

      {/* Interactive Run UI */}
      <div>
        <h4 className="text-sm font-bold text-gray-300 mb-2">Try it live</h4>
        <div className="bg-gray-950/50 border border-cyan-400/20 rounded-lg p-4">
          <label className="text-xs text-gray-400">Request body</label>
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            rows={4}
            className="w-full mt-2 p-3 bg-transparent border border-cyan-400/10 rounded-md text-sm text-gray-100 font-mono focus:outline-none"
          />

          <div className="flex gap-2 mt-3">
            <motion.button
              onClick={runApi}
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2 bg-cyan-400/10 border border-cyan-400/30 rounded-lg text-sm text-cyan-400 hover:bg-cyan-400/20 transition-all disabled:opacity-50"
              whileHover={{ scale: 1.02 }}
            >
              {loading ? <Loader className="animate-spin" /> : <Play size={16} />}
              <span>{loading ? 'Running...' : 'Run'}</span>
            </motion.button>

            <motion.button
              onClick={() => { setInputText('Create a plan to learn AI, considering latest advancements in AI'); setResponse(null); setError(null); }}
              className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm hover:border-cyan-400/50 transition-all"
              whileHover={{ scale: 1.02 }}
            >
              Reset
            </motion.button>

            <motion.button
              onClick={() => copyToClipboard(inputText)}
              className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm hover:border-cyan-400/50 transition-all"
              whileHover={{ scale: 1.02 }}
            >
              <Copy size={14} />
              <span>Copy</span>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Response Example */}
      <div>
        <h4 className="text-sm font-bold text-gray-300 mb-2">Response</h4>
        <div className="bg-gray-950/50 border border-cyan-400/20 rounded-lg p-4 font-mono text-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="text-xs text-gray-400">Output</div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setRenderedView((v) => !v)}
                className="text-xs px-2 py-1 border rounded-md bg-white/5 border-white/10 hover:border-cyan-400/50"
              >
                {renderedView ? 'Rendered' : 'Raw'}
              </button>
            </div>
          </div>

          {renderResponse()}

          <div className="mt-3 flex gap-2">
            <motion.button
              onClick={() => {
                const fullText = error ? JSON.stringify(error, null, 2) : (response ? extractStringFromResponse(response) : '');
                if (fullText) copyToClipboard(fullText);
              }}
              className="flex items-center gap-2 px-3 py-1 bg-cyan-400/10 border border-cyan-400/20 rounded-lg text-xs text-cyan-400 hover:bg-cyan-400/20 transition-all disabled:opacity-50"
              whileHover={{ scale: 1.02 }}
            >
              <Copy size={14} />
              <span>Copy Response</span>
            </motion.button>

            <motion.button
              onClick={() => { setResponse(null); setError(null); }}
              className="flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-xs hover:border-cyan-400/50 transition-all"
              whileHover={{ scale: 1.02 }}
            >
              Clear
            </motion.button>

            {error && (
              <div className="flex items-center gap-2 text-red-300 text-xs">
                <AlertCircle size={14} /> <span>Error</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="bg-cyan-400/5 border border-cyan-400/10 rounded-lg p-3">
          <p className="text-xs font-bold text-cyan-400 mb-1">Multi-Agent</p>
          <p className="text-xs text-gray-400">Orchestrates multiple specialized agents</p>
        </div>
        <div className="bg-cyan-400/5 border border-cyan-400/10 rounded-lg p-3">
          <p className="text-xs font-bold text-cyan-400 mb-1">Real-time</p>
          <p className="text-xs text-gray-400">SignalR streaming for live updates</p>
        </div>
        <div className="bg-cyan-400/5 border border-cyan-400/10 rounded-lg p-3">
          <p className="text-xs font-bold text-cyan-400 mb-1">LLM Agnostic</p>
          <p className="text-xs text-gray-400">Works with OpenAI, Groq, Gemini & more</p>
        </div>
      </div>
    </div>
  );
};

export default ApiUsageCanvas;
