/**
 * Simple Neural Language Model
 * A pattern-based AI that learns from conversation patterns
 */

class SimpleLLM {
    constructor() {
        this.mode = 'creative';
        this.conversationHistory = [];
        this.vocabulary = new Map();
        this.patterns = this.initializePatterns();
        this.temperature = 0.7;
        this.contextWindow = 3;
    }

    initializePatterns() {
        return {
            greetings: [
                { pattern: /hello|hi|hey|greetings/i, responses: [
                    "Hello! How can I assist you today?",
                    "Hi there! What's on your mind?",
                    "Hey! Great to meet you. What can I help with?"
                ]},
                { pattern: /how are you/i, responses: [
                    "I'm functioning optimally, thanks for asking! How are you doing?",
                    "I'm doing great! Ready to help. What's your question?",
                    "All systems operational! How can I help?"
                ]}
            ],
            questions: [
                { pattern: /what is|what's|explain|tell me about/i, responses: [
                    "That's an interesting question! Let me break it down for you...",
                    "Great query! Here's what I think...",
                    "Interesting! I'd explain it this way..."
                ]},
                { pattern: /how do i|how can i|help me/i, responses: [
                    "I can definitely help with that! Here's what you should do...",
                    "Great question! Let me guide you through this...",
                    "I've got some helpful steps for you..."
                ]}
            ],
            feedback: [
                { pattern: /thank you|thanks|appreciate/i, responses: [
                    "You're welcome! Happy to help!",
                    "My pleasure! Feel free to ask if you need anything else.",
                    "Glad I could assist!"
                ]},
                { pattern: /i don't know|not sure|confused/i, responses: [
                    "No worries! We can figure this out together.",
                    "Let me try to clarify that for you...",
                    "That's okay, let's explore this step by step."
                ]}
            ],
            emotions: [
                { pattern: /happy|excited|great|awesome/i, responses: [
                    "That's wonderful! I love the positive energy!",
                    "Awesome! Your enthusiasm is contagious!",
                    "That's fantastic! Keep up that energy!"
                ]},
                { pattern: /sad|upset|frustrated|angry/i, responses: [
                    "I'm sorry to hear that. Would you like to talk about it?",
                    "That sounds tough. How can I help make it better?",
                    "I understand. Let's see if we can work through this together."
                ]}
            ],
            technical: [
                { pattern: /javascript|python|code|programming/i, responses: [
                    "Oh, coding! A topic close to my circuits. What would you like to know?",
                    "Programming questions - I love these! What's your technical challenge?",
                    "Code-related inquiry detected! Let's debug this together."
                ]},
                { pattern: /error|bug|broken|not working/i, responses: [
                    "Let's troubleshoot this systematically...",
                    "Common issues with that include: [attempting to identify root cause]...",
                    "Debugging time! Walk me through what happened..."
                ]}
            ],
            social: [
                { pattern: /tell me a joke|funny|make me laugh/i, responses: [
                    "Why did the AI go to school? To improve its learning model! 😄",
                    "Why do programmers prefer dark mode? Because light attracts bugs! 🐛",
                    "A SQL query walks into a bar, walks up to two tables and asks... 'Can I join you?' 🍺"
                ]},
                { pattern: /goodbye|bye|see you|farewell/i, responses: [
                    "Goodbye! It was great chatting with you. Come back anytime!",
                    "Bye! Thanks for the conversation. See you soon!",
                    "Take care! Looking forward to our next chat!"
                ]}
            ]
        };
    }

    addToHistory(role, message) {
        this.conversationHistory.push({ role, message, timestamp: new Date() });
        if (this.conversationHistory.length > this.contextWindow * 2) {
            this.conversationHistory.shift();
        }
    }

    getContext() {
        return this.conversationHistory
            .slice(-this.contextWindow)
            .map(h => `${h.role}: ${h.message}`)
            .join('\n');
    }

    generateResponse(userMessage) {
        this.addToHistory('user', userMessage);

        let response = this.matchPatterns(userMessage);

        if (!response) {
            response = this.generateCreativeResponse(userMessage);
        }

        this.addToHistory('assistant', response);
        return response;
    }

    matchPatterns(message) {
        for (const category in this.patterns) {
            for (const patternObj of this.patterns[category]) {
                if (patternObj.pattern.test(message)) {
                    return this.selectRandomResponse(patternObj.responses);
                }
            }
        }
        return null;
    }

    generateCreativeResponse(message) {
        const responseTemplates = [
            "That's an interesting perspective! Could you elaborate on that?",
            "I see what you mean. Have you considered...?",
            "That makes sense! On the other hand...",
            "Fascinating point! Let me think about that...",
            "I appreciate that viewpoint. Here's another angle...",
            "You've touched on something important there!",
            "That's worth exploring. What do you think about...?",
            "Great observation! Building on that idea..."
        ];

        let response = this.selectRandomResponse(responseTemplates);

        if (message.length > 50) {
            response += " " + this.generateDetailedResponse(message);
        }

        return response;
    }

    generateDetailedResponse(message) {
        const keywords = message.toLowerCase().split(/\s+/);
        const meaningfulKeywords = keywords.filter(w => w.length > 4);

        if (meaningfulKeywords.length > 0) {
            const details = [
                `Regarding your mention of "${meaningfulKeywords[0]}", that's quite significant.`,
                `Your focus on "${meaningfulKeywords[0]}" suggests an interesting direction.`,
                `When you mention "${meaningfulKeywords[0]}", I think about how...`,
                `That aspect about "${meaningfulKeywords[0]}" is compelling because...`
            ];
            return this.selectRandomResponse(details);
        }

        return "I'm curious to know more about your thoughts on this.";
    }

    selectRandomResponse(responses) {
        if (!responses || responses.length === 0) return "I'm processing your request...";
        
        if (Math.random() > this.temperature) {
            return responses[0];
        }
        
        const index = Math.floor(Math.random() * responses.length);
        return responses[index];
    }

    setMode(mode) {
        if (['creative', 'technical', 'casual'].includes(mode)) {
            this.mode = mode;
            
            if (mode === 'creative') this.temperature = 0.8;
            else if (mode === 'technical') this.temperature = 0.5;
            else if (mode === 'casual') this.temperature = 0.7;
            
            return `Mode switched to ${mode}!`;
        }
        return "Invalid mode. Choose from: creative, technical, casual";
    }

    setTemperature(value) {
        if (value >= 0 && value <= 1) {
            this.temperature = value;
            return `Creativity level set to ${(value * 100).toFixed(0)}%`;
        }
        return "Temperature must be between 0 and 1";
    }

    getConversationSummary() {
        return {
            totalMessages: this.conversationHistory.length,
            mode: this.mode,
            temperature: this.temperature,
            recentMessages: this.conversationHistory.slice(-5)
        };
    }

    clearHistory() {
        this.conversationHistory = [];
    }

    analyzeMessage(message) {
        const analysis = {
            length: message.length,
            wordCount: message.split(/\s+/).length,
            questionMark: message.includes('?'),
            exclamation: message.includes('!'),
            sentiment: this.analyzeSentiment(message)
        };
        return analysis;
    }

    analyzeSentiment(message) {
        const positive = /happy|great|awesome|love|excellent|amazing|wonderful/i;
        const negative = /sad|hate|terrible|awful|horrible|worst|bad/i;
        
        if (positive.test(message)) return 'positive';
        if (negative.test(message)) return 'negative';
        return 'neutral';
    }
}

const llm = new SimpleLLM();