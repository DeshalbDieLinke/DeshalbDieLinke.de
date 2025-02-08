"use server"

import { ContentItem, ContentType } from '@/types/ContentItem';
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';

export interface UploadItem {
    title: string;
    description: string;
    official: boolean;
    type: ContentType;
    autherId: string;
    alt: string;
}

function initPrisma() {
    let prisma;
    try  {
        prisma = new PrismaClient()
    .$extends(withAccelerate()); }
    catch (e) {
        return null;
    }
    return prisma;
}

// A `main` function so that we can use async/await
export async function uploadToDB(content: UploadItem): Promise<unknown> {
    const prisma = initPrisma();
    if (!prisma) {
        return new Error("Failed to initialize Prisma client");
    }
    try {
    const item = await prisma.content.create({
    data: {
        title: content.title ?? "untitled",
        content: content.description ?? "no content",
        published: true,
        official: content.official ?? false,
        type: content.type ?? "image" as ContentType,
        authorId: content.autherId,
        alt: content.alt ?? "",
    },
    });
    prisma.$disconnect();
    return item.id; } 
    catch (e) {
        console.error(e);
        return e;
    }
}

export async function getContent(): Promise<ContentItem[] | undefined> {
    const prisma = initPrisma();    
    if (!prisma) {
        return [];
    }
    const allPosts = await prisma.content.findMany({
        where: { published: true },
    });
    console.log(`Retrieved all published posts: ${JSON.stringify(allPosts)}`);
    prisma.$disconnect();
    return allPosts;
} 

export async function updateContent(content: ContentItem, file: File) {
    const prisma = initPrisma();
    if (!prisma) {
        return new Error("Failed to initialize Prisma client");
    }
    if (!content.id) { 
        console.error("No ID provided for the content item");
        return;
    }

    const oldItem = await prisma.content.findUnique({ 
        where: {
            id: content.id,
        },
    });
    if (oldItem == content) {
        console.log("No changes detected");
        return;
    }
    if (content.official != oldItem.official) {
        console.log("EDITING OFFICIAL status");
    }

    //TODO Delete the existing content and upload the new content if new content is provided
    if (file) {
        return new Error("File upload not yet implemented");
    }
    const updatedPost = await prisma.content.update({
        where: {
            id: content.id,
        },
        //TODO ONLY update the fields provided in the content object
        data: {
            title: content.title ?? oldItem.title,
            content: content.description ?? oldItem.content,
            published: content.official ?? oldItem.official,
            type: content.type as ContentType ?? oldItem.type,
            authorId: content.autherID ?? oldItem.authorId,
            alt: content.altText ?? oldItem.alt,
        },
    });
        console.log(`Published the newly created post: ${JSON.stringify(updatedPost)}`);
        prisma.$disconnect();
}


export async function getContentById(id: number) {
    const prisma = initPrisma();
    if (!prisma) {
        return new Error("Failed to initialize Prisma client");
    }
    const post = await prisma.content.findUnique({
        where: {
            id: id,
        },
    });
    console.log(`Retrieved a specific post: ${JSON.stringify(post)}`);
    prisma.$disconnect();
    return post;
}

export async function getContentByUserId(userId: string): Promise<ContentItem[] | Error> {
    const prisma = initPrisma();
    if (!prisma) {
        return new Error("Failed to initialize Prisma client");
    }
    const postsByUser = await prisma.content
    .findMany({
        where: {
            authorId: userId
        },
    });
    console.log(`Retrieved all posts from a specific user: ${JSON.stringify(postsByUser)}`);
    prisma.$disconnect();
    // POSSIBLE BUG: Not passing the postsByUser array to the caller
    console.log(postsByUser);
    return postsByUser; // Return the postsByUser array
}

export async function deleteFromDB(id: number) {
    const prisma = initPrisma();
    if (!prisma) {
        return new Error("Failed to initialize Prisma client");
    }
    const deletedPost = await prisma.content.delete({
        where: {
            id: id,
        },
    });
    console.log(`Deleted the post: ${JSON.stringify(deletedPost)}`);
    prisma.$disconnect();
}