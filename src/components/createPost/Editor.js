

import { memo } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { determine_status_text, getStatusLoader } from './helpers/editorHelpers';
import styles from "./styles/form.module.css";




const Editor = ({ dispatch, value, savestatus }) => {

    const modules = {
        toolbar: {
            container: [
                [{ header: '1' }, { header: '2' }],
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
        },
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

    const status_text = determine_status_text(savestatus);
    const status_loader = getStatusLoader(savestatus);


    // useEffect(() => {
    //     const element = document.querySelector(".ql-image");
    //     /* 
    //         create input file, 
    //         change handler attached 
    //         after click save and insert url to image
    //         as inline
    //      */
    // }, [])




    return (
        <section id="quill__container" className={styles.editor__container}>
            <div className={styles.save_status}>
                <div>
                    <i>{status_text}</i>
                    {status_loader}
                </div>
            </div>
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