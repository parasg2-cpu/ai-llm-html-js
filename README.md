# 🤖 AI LLM Chatbot

A simple but powerful AI language model chatbot built entirely with HTML, CSS, and JavaScript. No backend required!

## Features

✨ **Smart Conversation Engine**
- Pattern-based response generation
- Conversation history tracking
- Context-aware responses
- Sentiment analysis

🎨 **Modern UI/UX**
- Clean, responsive design
- Dark mode support
- Real-time typing indicators
- Message timestamps
- Smooth animations

🔧 **Multiple Operating Modes**
- **Creative Mode**: More varied and imaginative responses
- **Technical Mode**: Focus on logical, structured answers
- **Casual Mode**: Friendly, conversational tone

⚙️ **Advanced Features**
- Adjustable creativity level (temperature parameter)
- Conversation export to text file
- Command system for power users
- Context-aware message handling
- Persistent dark mode preference

## Getting Started

### Quick Start

1. Clone the repository:
```bash
git clone https://github.com/parasg2-cpu/ai-llm-html-js.git
cd ai-llm-html-js
```

2. Open `index.html` in your browser (no build step needed!)

3. Start chatting with the AI!

## How It Works

### Architecture

```
┌─────────────────────────────────────┐
│   UI Layer (HTML + CSS)             │
│   ├─ Chat interface                 │
│   ├─ Message display                │
│   └─ Controls                       │
└────────────┬────────────────────────┘
             │
┌────────────▼────────────────────────┐
│   Application Layer (app.js)        │
│   ├─ Message handling               │
│   ├─ UI updates                     │
│   └─ Command parsing                │
└────────────┬────────────────────────┘
             │
┌────────────▼────────────────────────┐
│   LLM Engine (llm.js)               │
│   ├─ Pattern matching               │
│   ├─ Response generation            │
│   └─ Conversation memory            │
└─────────────────────────────────────┘
```

## Usage

### Basic Chat
Simply type your message and press Enter or click Send.

### Commands

Use commands to control the LLM behavior (prefix with `/`):

- `/mode [creative|technical|casual]` - Switch conversation mode
- `/temp [0-1]` - Set creativity level (0=deterministic, 1=random)
- `/summary` - Get conversation statistics
- `/clear` - Clear chat history
- `/help` - Show available commands

### Examples

```
You: hello
AI: Hi there! What's on your mind?

You: /mode technical
AI: Mode switched to technical!

You: what is javascript?
AI: That's an interesting question! Let me break it down for you...

You: tell me a joke
AI: Why do programmers prefer dark mode? Because light attracts bugs! 🐛
```

## Configuration

Edit `llm.js` to customize:

```javascript
// Temperature (creativity level)
this.temperature = 0.7; // 0-1

// Context window (how many messages to remember)
this.contextWindow = 3; // last N messages

// Add your own patterns
this.patterns = {
    customCategory: [
        {
            pattern: /your regex here/i,
            responses: ["Response 1", "Response 2"]
        }
    ]
};
```

## Files

- **index.html** - Main HTML structure
- **style.css** - Styling and responsive design
- **llm.js** - AI LLM engine and pattern definitions
- **app.js** - Chat UI controller and event handlers
- **README.md** - This file

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Opera 76+

All modern browsers with ES6 support.

## Performance

- **Lightweight**: ~50KB total (uncompressed)
- **Fast**: Responses in <500ms
- **No dependencies**: Pure vanilla JavaScript
- **Runs locally**: No server needed

## Future Enhancements

- [ ] Machine learning integration (TensorFlow.js)
- [ ] Local storage for conversation persistence
- [ ] Voice input/output support
- [ ] Multi-user support via WebSockets
- [ ] Advanced NLP with tokenization
- [ ] Custom training data support
- [ ] Integration with real APIs

## Contributing

Contributions welcome! Feel free to:
- Add new response patterns
- Improve the LLM algorithm
- Enhance the UI/UX
- Report bugs
- Suggest features

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Author

Created by parasg2-cpu

---

**Made with ❤️ and JavaScript**

*P.S. - Try asking "tell me a joke" for some fun responses!* 😄