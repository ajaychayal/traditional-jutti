import { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot } from 'lucide-react';
import clsx from 'clsx';
import styles from './AIChatWidget.module.scss';

export default function AIChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! I'm your AI shopping assistant. How can I help you find the perfect Jutti today?", sender: 'ai' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const newUserMessage = {
      id: Date.now(),
      text: inputValue.trim(),
      sender: 'user'
    };

    setMessages(prev => [...prev, newUserMessage]);
    setInputValue('');
    setIsTyping(true);

    // Mock AI Response
    setTimeout(() => {
      const newAiMessage = {
        id: Date.now() + 1,
        text: "Thanks for your message! Our AI is currently in demo mode, but soon it will help you track orders and find the best Punjabi Juttis.",
        sender: 'ai'
      };
      setMessages(prev => [...prev, newAiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <>
      <button 
        className={clsx(styles.chatBtn, { [styles.hidden]: isOpen })} 
        onClick={() => setIsOpen(true)}
        aria-label="Open AI Chat"
      >
        <MessageSquare size={24} />
        <span className={styles.tooltip}>Chat with AI</span>
      </button>

      <div className={clsx(styles.chatWindow, { [styles.open]: isOpen })}>
        <div className={styles.chatHeader}>
          <div className={styles.headerInfo}>
            <Bot size={20} />
            <h3>AI Assistant</h3>
          </div>
          <button className={styles.closeBtn} onClick={() => setIsOpen(false)} aria-label="Close Chat">
            <X size={20} />
          </button>
        </div>

        <div className={styles.chatBody}>
          {messages.map((msg) => (
            <div key={msg.id} className={clsx(styles.messageWrapper, styles[msg.sender])}>
              {msg.sender === 'ai' && (
                <div className={styles.avatar}>
                  <Bot size={14} />
                </div>
              )}
              <div className={styles.messageBubble}>
                {msg.text}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className={clsx(styles.messageWrapper, styles.ai)}>
              <div className={styles.avatar}>
                <Bot size={14} />
              </div>
              <div className={styles.typingIndicator}>
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <form className={styles.chatFooter} onSubmit={handleSendMessage}>
          <input 
            type="text" 
            placeholder="Type your message..." 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button type="submit" disabled={!inputValue.trim()} aria-label="Send Message">
            <Send size={18} />
          </button>
        </form>
      </div>
    </>
  );
}
