

import { memo } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import styles from "./styles/form.module.css";


const Editor = ({ dispatch, value }) => {

    const modules = {
        toolbar: [
            [{ header: '1' }, { header: '2' }, { font: [] }],
            [{ size: [] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [
                { list: 'ordered' },
                { list: 'bullet' },
                { indent: '-1' },
                { indent: '+1' },
            ],
            ['link', 'image', 'code-block'],
            [{ 'script': 'sub' }, { 'script': 'super' }],

            ['clean'],
        ],
        syntax: true,
        clipboard: {
            // toggle to add extra line breaks when pasting HTML:
            matchVisual: false,
        },
    }

    const changeHandler = (content, delta, source, editor) => {
        const values = { html: content, delta: editor.getContents(), text: editor.getText() };
        dispatch({ type: "content", payload: { content: values } });
    };

    return (
        <section id="quill__container" className={styles.editor__container}>
            <div className={styles.editor} id="quill__editor">
                <script>
                    {
                        window.hljs.configure({   // optionally configure hljs
                            languages: ['javascript', 'ruby', 'python', "java", 'sql',
                                'yml', 'php', 'json', 'bash', 'css',
                                'html', 'c#', 'c++']
                        })
                    }
                </script>
                <ReactQuill
                    placeholder="post content..."
                    theme="snow"
                    modules={modules}
                    scrollingContainer="#quill__container"
                    onChange={changeHandler}
                    value={value}
                    style={{ width: "100%", height: "100%" }}
                />
            </div>
        </section>
    )
};

export default memo(Editor);