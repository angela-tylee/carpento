import { useState, useEffect, useRef, useMemo } from 'react';
import { CKEditor, useCKEditorCloud } from '@ckeditor/ckeditor5-react';

import '../assets/scss/components/_blog-editor.scss';

const LICENSE_KEY =
  'eyJhbGciOiJFUzI1NiJ9.eyJleHAiOjE3NjYxMDIzOTksImp0aSI6IjVhNzZhODcyLTY2ZWUtNGVhZS1hOGU1LTkyYWJiNjY3ZDBmMSIsInVzYWdlRW5kcG9pbnQiOiJodHRwczovL3Byb3h5LWV2ZW50LmNrZWRpdG9yLmNvbSIsImRpc3RyaWJ1dGlvbkNoYW5uZWwiOlsiY2xvdWQiLCJkcnVwYWwiXSwiZmVhdHVyZXMiOlsiRFJVUCIsIkJPWCJdLCJ2YyI6IjU2MDFlNzQ0In0.i1dnT1MDXS2rbykMv7cg8Q2fLD3M-a6ynB4Zjqe3p1fKlqD44yEyKmI6rb43oimWwTmq_KSFBT48Do1tyBTGog';  

const CKEditorDemo = ({ editorData, handleEditorChange }) => {
  const editorContainerRef = useRef(null);
  const editorRef = useRef(null);
  const [isLayoutReady, setIsLayoutReady] = useState(false);
  const cloud = useCKEditorCloud({ version: '44.1.0' });

  useEffect(() => {
    setIsLayoutReady(true);
    return () => setIsLayoutReady(false);
  }, []);

  const { ClassicEditor, editorConfig } = useMemo(() => {
    if (cloud.status !== 'success' || !isLayoutReady) {
      return {};
    }

    const {
      ClassicEditor,
      Autosave,
      BalloonToolbar,
      BlockQuote,
      Bold,
      Essentials,
      Heading,
      Indent,
      IndentBlock,
      Italic,
      Link,
      List,
      Paragraph,
      // SpecialCharacters,
      // Table,
      // TableCaption,
      // TableCellProperties,
      // TableColumnResize,
      // TableProperties,
      // TableToolbar,
      Underline,
    } = cloud.CKEditor;

    return {
      ClassicEditor,
      editorConfig: {
        toolbar: {
          items: [
            'heading',
            '|',
            'bold',
            'italic',
            'underline',
            '|',
            // 'specialCharacters',
            'link',
            // 'insertTable',
            'blockQuote',
            '|',
            'bulletedList',
            'numberedList',
            'outdent',
            'indent',
          ],
          shouldNotGroupWhenFull: false,
        },
        plugins: [
          Autosave,
          BalloonToolbar,
          BlockQuote,
          Bold,
          Essentials,
          Heading,
          Indent,
          IndentBlock,
          Italic,
          Link,
          List,
          Paragraph,
          // SpecialCharacters,
          // Table,
          // TableCaption,
          // TableCellProperties,
          // TableColumnResize,
          // TableProperties,
          // TableToolbar,
          Underline,
        ],
        balloonToolbar: ['heading', '|', 'bold', 'italic', '|', 'link', 'bulletedList', 'numberedList'],
        heading: {
          options: [
            {
              model: 'paragraph',
              title: 'Paragraph',
              class: 'ck-heading_paragraph',
            },
            {
              model: 'heading1',
              view: 'h1',
              title: 'Heading 1',
              class: 'ck-heading_heading1',
            },
            {
              model: 'heading2',
              view: 'h2',
              title: 'Heading 2',
              class: 'ck-heading_heading2',
            },
            {
              model: 'heading3',
              view: 'h3',
              title: 'Heading 3',
              class: 'ck-heading_heading3',
            },
            {
              model: 'heading4',
              view: 'h4',
              title: 'Heading 4',
              class: 'ck-heading_heading4',
            },
            {
              model: 'heading5',
              view: 'h5',
              title: 'Heading 5',
              class: 'ck-heading_heading5',
            },
            {
              model: 'heading6',
              view: 'h6',
              title: 'Heading 6',
              class: 'ck-heading_heading6',
            },
          ],
        },
        initialData:'',
          // '<h2>Congratulations on setting up CKEditor 5! 🎉</h2>',
          // '<h2>Congratulations on setting up CKEditor 5! 🎉</h2>\n<p>\n\tYou\'ve successfully created a CKEditor 5 project. This powerful text editor\n\twill enhance your application, enabling rich text editing capabilities that\n\tare customizable and easy to use.\n</p>\n<h3>What\'s next?</h3>\n<ol>\n\t<li>\n\t\t<strong>Integrate into your app</strong>: time to bring the editing into\n\t\tyour application. Take the code you created and add to your application.\n\t</li>\n\t<li>\n\t\t<strong>Explore features:</strong> Experiment with different plugins and\n\t\ttoolbar options to discover what works best for your needs.\n\t</li>\n\t<li>\n\t\t<strong>Customize your editor:</strong> Tailor the editor\'s\n\t\tconfiguration to match your application\'s style and requirements. Or\n\t\teven write your plugin!\n\t</li>\n</ol>\n<p>\n\tKeep experimenting, and don\'t hesitate to push the boundaries of what you\n\tcan achieve with CKEditor 5. Your feedback is invaluable to us as we strive\n\tto improve and evolve. Happy editing!\n</p>\n<h3>Helpful resources</h3>\n<ul>\n\t<li>📝 <a href="https://portal.ckeditor.com/checkout?plan=free">Trial sign up</a>,</li>\n\t<li>📕 <a href="https://ckeditor.com/docs/ckeditor5/latest/installation/index.html">Documentation</a>,</li>\n\t<li>⭐️ <a href="https://github.com/ckeditor/ckeditor5">GitHub</a> (star us if you can!),</li>\n\t<li>🏠 <a href="https://ckeditor.com">CKEditor Homepage</a>,</li>\n\t<li>🧑‍💻 <a href="https://ckeditor.com/ckeditor-5/demo/">CKEditor 5 Demos</a>,</li>\n</ul>\n<h3>Need help?</h3>\n<p>\n\tSee this text, but the editor is not starting up? Check the browser\'s\n\tconsole for clues and guidance. It may be related to an incorrect license\n\tkey if you use premium features or another feature-related requirement. If\n\tyou cannot make it work, file a GitHub issue, and we will help as soon as\n\tpossible!\n</p>\n',
        licenseKey: LICENSE_KEY,
        link: {
          addTargetToExternalLinks: true,
          defaultProtocol: 'https://',
          decorators: {
            toggleDownloadable: {
              mode: 'manual',
              label: 'Downloadable',
              attributes: {
                download: 'file',
              },
            },
          },
        },
        placeholder: '請輸入內容',
        // table: {
        // 	contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells', 'tableProperties', 'tableCellProperties']
        // }
      },
    };
  }, [cloud, isLayoutReady]);

  return (
    <div className="main-container">
      <div
        className="editor-container editor-container_classic-editor"
        ref={editorContainerRef}
      >
        <div className="editor-container__editor">
          {/* TODO: Add loading effect */}
          <div ref={editorRef}>
            {ClassicEditor && editorConfig && (
              <CKEditor
                editor={ClassicEditor}
                config={editorConfig}
                data={editorData || ''}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  handleEditorChange(data); // Update parent state when editor content changes
                }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CKEditorDemo;

// const BlogEditor = () => {
//   return (
//     <div>BlogEditor</div>
//   )
// }

// export default BlogEditor
