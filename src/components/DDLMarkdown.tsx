/* eslint-disable @typescript-eslint/no-unused-vars */
// Template for Markdown for DDL

import Markdown from "react-markdown";

function DDLMarkdown(props: {markdown: string}) {
    return (  
        <div className='w-full min-h-[50vh] flex flex-col items-center justify-center p-12'>
            <Markdown
                className='relative'
                components={{
                    h1: ({node, ...props}) => <h1 className='text-3xl font-bold text-center' {...props} > {props.children} </h1>,
                    li: ({node, ...props}) => <li className='list-disc' {...props} > {props.children} </li>,
                }}>
                {props.markdown}
            </Markdown>
        </div>
    );
}

export default DDLMarkdown;