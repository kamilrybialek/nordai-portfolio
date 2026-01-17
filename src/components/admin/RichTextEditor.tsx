import { useState } from 'react';
import { Bold, Italic, List, ListOrdered, Heading2, Heading3, Image as ImageIcon } from 'lucide-react';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
}

const RichTextEditor = ({ value, onChange }: RichTextEditorProps) => {
  const [showPreview, setShowPreview] = useState(false);

  const insertMarkdown = (before: string, after: string = '') => {
    const textarea = document.getElementById('markdown-editor') as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end);
    const beforeText = value.substring(0, start);
    const afterText = value.substring(end);

    const newText = beforeText + before + selectedText + after + afterText;
    onChange(newText);

    // Set cursor position after inserted text
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(
        start + before.length,
        start + before.length + selectedText.length
      );
    }, 0);
  };

  const toolbarButtons = [
    { icon: Heading2, label: 'Heading 2', action: () => insertMarkdown('## ', '\n\n') },
    { icon: Heading3, label: 'Heading 3', action: () => insertMarkdown('### ', '\n\n') },
    { icon: Bold, label: 'Bold', action: () => insertMarkdown('**', '**') },
    { icon: Italic, label: 'Italic', action: () => insertMarkdown('*', '*') },
    { icon: List, label: 'Bullet List', action: () => insertMarkdown('- ', '\n') },
    { icon: ListOrdered, label: 'Numbered List', action: () => insertMarkdown('1. ', '\n') },
    { icon: ImageIcon, label: 'Image', action: () => insertMarkdown('![alt text](', ')') },
  ];

  const renderPreview = (markdown: string) => {
    const lines = markdown.split('\n');
    return lines.map((line, index) => {
      const trimmed = line.trim();

      if (trimmed.startsWith('### ')) {
        return <h3 key={index} className="text-2xl font-bold mb-3 mt-8">{trimmed.substring(4)}</h3>;
      }
      if (trimmed.startsWith('## ')) {
        return <h2 key={index} className="text-3xl font-bold mb-4 mt-10">{trimmed.substring(3)}</h2>;
      }
      if (trimmed.startsWith('# ')) {
        return <h1 key={index} className="text-4xl font-bold mb-6 mt-12">{trimmed.substring(2)}</h1>;
      }
      if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
        return <li key={index} className="ml-6 list-disc">{trimmed.substring(2)}</li>;
      }
      if (/^\d+\.\s/.test(trimmed)) {
        return <li key={index} className="ml-6 list-decimal">{trimmed.replace(/^\d+\.\s/, '')}</li>;
      }
      if (trimmed.startsWith('![')) {
        const match = trimmed.match(/!\[(.*?)\]\((.*?)\)/);
        if (match) {
          return <img key={index} src={match[2]} alt={match[1]} className="max-w-full h-auto my-4 rounded-lg" />;
        }
      }
      if (trimmed) {
        // Process inline formatting
        let processedLine = trimmed;
        processedLine = processedLine.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        processedLine = processedLine.replace(/\*(.*?)\*/g, '<em>$1</em>');

        return <p key={index} className="mb-4" dangerouslySetInnerHTML={{ __html: processedLine }} />;
      }
      return <br key={index} />;
    });
  };

  return (
    <div className="border border-border rounded-lg overflow-hidden">
      {/* Toolbar */}
      <div className="bg-muted/30 border-b border-border p-2 flex items-center gap-1">
        {toolbarButtons.map((button, index) => (
          <button
            key={index}
            type="button"
            onClick={button.action}
            className="p-2 hover:bg-muted rounded transition-colors"
            title={button.label}
          >
            <button.icon className="w-4 h-4" />
          </button>
        ))}
        <div className="ml-auto flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowPreview(!showPreview)}
            className="text-sm px-3 py-1 rounded bg-secondary hover:bg-secondary/80 transition-colors"
          >
            {showPreview ? 'Edit' : 'Preview'}
          </button>
        </div>
      </div>

      {/* Editor/Preview Area */}
      <div className="relative">
        {!showPreview ? (
          <textarea
            id="markdown-editor"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full p-4 min-h-[400px] font-mono text-sm bg-background resize-y focus:outline-none"
            placeholder="Write your content here using Markdown...

## Heading 2
### Heading 3

This is a paragraph with **bold** and *italic* text.

- List item 1
- List item 2

1. Numbered item 1
2. Numbered item 2

![Image description](/path/to/image.jpg)"
          />
        ) : (
          <div className="p-4 min-h-[400px] prose prose-lg max-w-none">
            {renderPreview(value)}
          </div>
        )}
      </div>

      {/* Character count */}
      <div className="bg-muted/30 border-t border-border px-4 py-2 text-xs text-muted-foreground flex justify-between">
        <span>Markdown Editor</span>
        <span>{value.length} characters</span>
      </div>
    </div>
  );
};

export default RichTextEditor;
