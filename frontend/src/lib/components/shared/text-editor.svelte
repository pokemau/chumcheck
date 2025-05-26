<script lang="ts">
  import { onMount, onDestroy, tick } from 'svelte';
  import { Editor } from '@tiptap/core';
  import StarterKit from '@tiptap/starter-kit';
  import Placeholder from '@tiptap/extension-placeholder';
  import TextAlign from '@tiptap/extension-text-align';
  import Underline from '@tiptap/extension-underline';

  export let value: string = '';
  export let placeholder: string = 'Start writing...';
  export let classNames: string = '';

  let editor: Editor;
  let element: HTMLElement;
  let isBoldActive: boolean = false;
  let isItalicActive: boolean = false;
  let isUnderlineActive: boolean = false;

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

  function toggleBulletList() {
    editor.chain().focus().toggleBulletList().run();
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
      onclick={toggleBulletList}
      class="px-2 py-1 bg-gray-700 text-sm border border-gray-600 rounded text-white hover:bg-gray-600"
    >Bullet List</button>
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
  <div bind:this={element} style="min-height:200px;width:100%;border:1px solid #333;border-radius:8px;background:#181c23;padding:12px;"></div>
</div>