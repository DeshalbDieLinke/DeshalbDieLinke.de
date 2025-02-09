import DDLMarkdown from '@/components/DDLMarkdown';
import fs from 'fs';
import path from 'path';


function datenschutz(){

    const filePath = path.join(process.cwd(), 'public/data/faq.md');
    let markdownContent: string;

    try {
        markdownContent = fs.readFileSync(filePath, 'utf-8');
    } catch (error) {
        console.error('Error reading Markdown file:', error);
      markdownContent = 'Error loading Datenschutz.'; // Provide a default value
    }
    return (
    <DDLMarkdown markdown={markdownContent} />
    );
};

export default datenschutz;
