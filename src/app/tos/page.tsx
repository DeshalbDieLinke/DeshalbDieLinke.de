import DDLMarkdown from '@/components/DDLMarkdown';
import fs from 'fs';
import path from 'path';
import Markdown from 'react-markdown';


function TOSPage(){

    const filePath = path.join(process.cwd(), 'public/data/tos.md');
    let markdownContent: string;

    try {
        markdownContent = fs.readFileSync(filePath, 'utf-8');
    } catch (error) {
        console.error('Error reading Markdown file:', error);
      markdownContent = 'Error loading Terms of Service.'; // Provide a default value
    }
    return (
    <DDLMarkdown markdown={markdownContent} />
    );
};

export default TOSPage;
