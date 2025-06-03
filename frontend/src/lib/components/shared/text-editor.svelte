<script lang="ts">
  import { onMount, onDestroy, tick } from 'svelte';
  import { Editor } from '@tiptap/core';
  import StarterKit from '@tiptap/starter-kit';
  import Placeholder from '@tiptap/extension-placeholder';
  import TextAlign from '@tiptap/extension-text-align';
  import Underline from '@tiptap/extension-underline';

  export let value: string = '';
  export let rows: number = 8; // Default to 8 rows if not specified
  export let placeholder: string = 'Start writing...';
  export let classNames: string = '';

  let editor: Editor;
  let element: HTMLElement;
  let isBoldActive: boolean = false;
  let isItalicActive: boolean = false;
  let isUnderlineActive: boolean = false;

  $: editorHeight = `${rows * 24}px`;

  onMount(async () => {
    editor = new Editor({
      element,
      extensions: [
        StarterKit,
        Underline,
        TextAlign.configure({ types: ['heading', 'paragraph'] }),
        Placeholder.configure({ placeholder }),
      ],
      content: value || '<p></p>',
      editorProps: {
        attributes: {
          class: classNames,
        },
      },
      onUpdate: ({ editor }) => {
        value = editor.getHTML();
        isBoldActive = editor.isActive('bold');
        isItalicActive = editor.isActive('italic');
        isUnderlineActive = editor.isActive('underline');
      },
      onSelectionUpdate: ({ editor }) => {
        isBoldActive = editor.isActive('bold');
        isItalicActive = editor.isActive('italic');
        isUnderlineActive = editor.isActive('underline');
      },
    });
    await tick();
    isBoldActive = editor.isActive('bold');
    isItalicActive = editor.isActive('italic');
    isUnderlineActive = editor.isActive('underline');
  });

  onDestroy(() => {
    editor?.destroy();
  });

  function toggleBold() {
    editor.chain().focus().toggleBold().run();
    isBoldActive = editor.isActive('bold');
  }

  function toggleItalic() {
    editor.chain().focus().toggleItalic().run();
    isItalicActive = editor.isActive('italic');
  }

  function toggleUnderline() {
    editor.chain().focus().toggleUnderline().run();
    isUnderlineActive = editor.isActive('underline');
  }

  function addBulletPoint() {
    const { state } = editor;
    const { selection } = state;
    const currentNode = state.doc.nodeAt(selection.from);
    
    if (currentNode && currentNode.textContent.trim().length > 0) {
      editor.chain()
        .focus()
        .insertContent('\n• ')
        .run();
    } else {
      editor.chain()
        .focus()
        .insertContent('• ')
        .run();
    }
  }

  function setTextAlign(alignment: string) {
    editor.chain().focus().setTextAlign(alignment).run();
  }
</script>

<div class="editor-container w-full">
  <div class="toolbar mb-2 flex flex-wrap gap-2">
    <button
      onclick={toggleBold}
      class="px-2 py-1 border rounded text-white text-sm
        {isBoldActive ? 'bg-blue-600 border-blue-600 hover:bg-blue-600' : ' bg-gray-700 border-gray-700 hover:bg-gray-800'}"
      aria-pressed={isBoldActive}
    ><b>B</b></button>
    <button
      onclick={toggleItalic}
      class="px-2 py-1 border rounded text-white text-sm
        {isItalicActive ? 'bg-blue-600 border-blue-600 hover:bg-blue-600' : ' bg-gray-700 border-gray-700 hover:bg-gray-800'}"
      aria-pressed={isItalicActive}
    ><i>I</i></button>
    <button
      onclick={toggleUnderline}
      class="px-2 py-1 border rounded text-white text-sm
        {isUnderlineActive ? 'bg-blue-600 border-blue-600 hover:bg-blue-600' : ' bg-gray-700 border-gray-700 hover:bg-gray-800'}"
      aria-pressed={isUnderlineActive}
    ><u>U</u></button>
    <button
      onclick={addBulletPoint}
      class="px-2 py-1 bg-gray-700 text-sm border border-gray-600 rounded text-white hover:bg-gray-600"
    >Bullet</button>
    <button
      onclick={() => setTextAlign('left')}
      class="px-2 py-1 bg-gray-700 text-sm border border-gray-600 rounded text-white hover:bg-gray-600"
    >Align Left</button>
    <button
      onclick={() => setTextAlign('center')}
      class="px-2 py-1 bg-gray-700 text-sm border border-gray-600 rounded text-white hover:bg-gray-600"
    >Align Center</button>
    <button
      onclick={() => setTextAlign('right')}
      class="px-2 py-1 bg-gray-700 text-sm border border-gray-600 rounded text-white hover:bg-gray-600"
    >Align Right</button>
  </div>
  <div class="border border-[#333] rounded-lg">
    <div 
      bind:this={element} 
      style="width:100%;height:{editorHeight};overflow-y:auto;"
      class="prose-invert"
    ></div>
  </div>
</div>

<style>
  :global(.ProseMirror) {
    height: 100%;
    outline: none;
    border: none;
    padding: 0.5rem;
  }
  
  :global(.ProseMirror p) {
    margin: 0;
  }
</style>