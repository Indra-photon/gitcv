'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Bold from '@tiptap/extension-bold'
import Italic from '@tiptap/extension-italic'
import Underline from '@tiptap/extension-underline'
import { Bold as BoldIcon, Italic as ItalicIcon, Underline as UnderlineIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

interface RichTextEditorProps {
    value: string
    onChange: (value: string) => void
    placeholder?: string
    className?: string
    minHeight?: string
}

export default function RichTextEditor({
    value,
    onChange,
    placeholder = 'Start typing...',
    className = '',
    minHeight = '60px'
}: RichTextEditorProps) {
    const [showToolbar, setShowToolbar] = useState(false)
    const [toolbarPosition, setToolbarPosition] = useState({ top: 0, left: 0 })

    const editor = useEditor({
        immediatelyRender: false,
        extensions: [
            StarterKit.configure({
                bold: false,
                italic: false,
                heading: false,
                codeBlock: false,
                blockquote: false,
            }),
            Bold,
            Italic,
            Underline,
        ],
        content: value || '',
        editorProps: {
            attributes: {
                class: cn(
                    'prose prose-sm max-w-none focus:outline-none',
                    'text-sm text-neutral-700 leading-relaxed',
                    className
                ),
            },
        },
        onUpdate: ({ editor }) => {
            const html = editor.getHTML()
            onChange(html === '<p></p>' ? '' : html)
        },
        onSelectionUpdate: ({ editor }) => {
            const { from, to } = editor.state.selection
            const hasSelection = from !== to

            if (hasSelection) {
                const { view } = editor
                const start = view.coordsAtPos(from)
                const end = view.coordsAtPos(to)

                setToolbarPosition({
                    top: start.top - 50,
                    left: (start.left + end.left) / 2 - 75
                })
                setShowToolbar(true)
            } else {
                setShowToolbar(false)
            }
        },
    })

    useEffect(() => {
        if (editor && value !== editor.getHTML()) {
            editor.commands.setContent(value || '')
        }
    }, [value, editor])

    if (!editor) {
        return null
    }

    return (
        <div className="relative">
            {/* Custom Floating Toolbar */}
            {showToolbar && (
                <div
                    className="fixed z-50 flex items-center gap-1 p-1 bg-neutral-900 rounded-lg shadow-lg border border-neutral-700 animate-in fade-in duration-100"
                    style={{
                        top: `${toolbarPosition.top}px`,
                        left: `${toolbarPosition.left}px`,
                    }}
                >
                    <button
                        onMouseDown={(e) => {
                            e.preventDefault()
                            editor.chain().focus().toggleBold().run()
                        }}
                        className={cn(
                            'p-2 rounded transition-colors',
                            editor.isActive('bold')
                                ? 'bg-blue-600 text-white'
                                : 'text-neutral-200 hover:bg-neutral-800'
                        )}
                        title="Bold (Ctrl+B)"
                    >
                        <BoldIcon className="size-4" />
                    </button>

                    <button
                        onMouseDown={(e) => {
                            e.preventDefault()
                            editor.chain().focus().toggleItalic().run()
                        }}
                        className={cn(
                            'p-2 rounded transition-colors',
                            editor.isActive('italic')
                                ? 'bg-blue-600 text-white'
                                : 'text-neutral-200 hover:bg-neutral-800'
                        )}
                        title="Italic (Ctrl+I)"
                    >
                        <ItalicIcon className="size-4" />
                    </button>

                    <button
                        onMouseDown={(e) => {
                            e.preventDefault()
                            editor.chain().focus().toggleUnderline().run()
                        }}
                        className={cn(
                            'p-2 rounded transition-colors',
                            editor.isActive('underline')
                                ? 'bg-blue-600 text-white'
                                : 'text-neutral-200 hover:bg-neutral-800'
                        )}
                        title="Underline (Ctrl+U)"
                    >
                        <UnderlineIcon className="size-4" />
                    </button>
                </div>
            )}

            {/* Editor Content */}
            <div
                className={cn(
                    'rounded-md border border-neutral-200 bg-white px-3 py-2',
                    'focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500',
                    'transition-all cursor-text'
                )}
                style={{ minHeight }}
                onClick={() => editor.commands.focus()}
            >
                <EditorContent editor={editor} />
                {!value && (
                    <div className="text-neutral-400 text-sm pointer-events-none absolute top-2.5 left-3">
                        {placeholder}
                    </div>
                )}
            </div>
        </div>
    )
}
