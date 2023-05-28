import React from "react";
import ReactMarkdown from "react-markdown";

interface MarkdownProps {
  markdown: string;
}

const MarkdownRenderer: React.FC<MarkdownProps> = ({ markdown }) => {
  return <ReactMarkdown>{markdown}</ReactMarkdown>;
};

export default MarkdownRenderer;
