import DDLMarkdown from '@/components/DDLMarkdown';
import fs from 'fs';
import path from 'path';


function impressum(){

    const filePath = path.join(process.cwd(), 'public/data/impressum.md');
    let markdownContent: string;

    try {
        markdownContent = fs.readFileSync(filePath, 'utf-8');
    } catch (error) {
        console.error('Error reading Markdown file:', error);
      markdownContent = 'Error loading Impressum.'; // Provide a default value
    }
    return (
    <DDLMarkdown markdown={markdownContent} />
    );
};

export default impressum;
