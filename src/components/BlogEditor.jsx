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
            'link',
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
          <div ref={editorRef}>
            {ClassicEditor && editorConfig && (
              <CKEditor
                editor={ClassicEditor}
                ref={editorRef}
                config={editorConfig}
                data={editorData || ''}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  handleEditorChange(data); 
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