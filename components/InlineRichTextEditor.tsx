'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import Bold from '@tiptap/extension-bold'
import Italic from '@tiptap/extension-italic'
import { Bold as BoldIcon, Italic as ItalicIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

interface InlineRichTextEditorProps {
    value: string
    onChange: (value: string) => void
    placeholder?: string
    className?: string
}

export default function InlineRichTextEditor({
    value,
    onChange,
    placeholder = '',
    className = ''
}: InlineRichTextEditorProps) {
    const [showToolbar, setShowToolbar] = useState(false)
    const [toolbarPosition, setToolbarPosition] = useState({ top: 0, left: 0 })

    const editor = useEditor({
        immediatelyRender: false,
        extensions: [
            Document,
            Paragraph,
            Text,
            Bold,
            Italic,
        ],
        content: value || '',
        editorProps: {
            attributes: {
                class: cn(
                    'focus:outline-none',
                    'text-sm font-medium text-neutral-900',
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
                    top: start.top - 45,
                    left: (start.left + end.left) / 2 - 50
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
            {showToolbar && (
                <div
                    className="fixed z-50 flex items-center gap-1 p-1 bg-neutral-900 rounded-lg shadow-lg animate-in fade-in duration-100"
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
                    >
                        <BoldIcon className="size-3" />
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
                    >
                        <ItalicIcon className="size-3" />
                    </button>
                </div>
            )}

            <EditorContent editor={editor} />
        </div>
    )
}
