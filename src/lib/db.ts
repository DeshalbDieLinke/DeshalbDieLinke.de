import { ContentItem } from '@/types/ContentItem';
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';

export interface UploadItem {
    title: string;
    description: string;
    official: boolean;
    type: string;
    autherId: string;
    alt: string;
}


// A `main` function so that we can use async/await
export async function uploadToDB(content: UploadItem) {
    const prisma = new PrismaClient()
    .$extends(withAccelerate());

    const item = await prisma.content.create({
    data: {
        title: content.title ?? "untitled",
        content: content.description ?? "no content",
        published: true,
        official: content.official ?? false,
        type: content.type ?? "image",
        authorId: content.autherId,
        alt: content.alt ?? "",
    },
    });
    console.log(
    `Created users: ${item.title} (${item.type} post)) `,
    );
    prisma.$disconnect();
}

// async function getContent() {
//     const allPosts = await prisma.content.findMany({
//         where: { published: true },
//     });
//     console.log(`Retrieved all published posts: ${JSON.stringify(allPosts)}`);
//     prisma.$disconnect();
    
// } 

// async function updateContent(content: ContentItem) {
//     const updatedPost = await prisma.content.update({
//         where: {
//             id: content.id,
//         },
//         // ONLY update the fields provided in the content object
//         data: {
//             title: content.title,
//             content: content.description,
//             published: content.official,
//             type: content.type,
//             authorId: content.autherID,
//             alt: content.altText,
//         },
//     });
//         console.log(`Published the newly created post: ${JSON.stringify(updatedPost)}`);
//         prisma.$disconnect();
// }

// async function getContentByUserId(userId: string): Promise<ContentItem[]> {
//     const postsByUser = await prisma.content
//     .findMany({
//         where: {
//             authorId: userId
//         },
//     });
//     console.log(`Retrieved all posts from a specific user: ${JSON.stringify(postsByUser)}`);
//     prisma.$disconnect();
//     // POSSIBLE BUG: Not passing the postsByUser array to the caller
//     return postsByUser; // Return the postsByUser array
// }