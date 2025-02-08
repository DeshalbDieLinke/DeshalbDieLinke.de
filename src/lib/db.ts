/* eslint-disable @typescript-eslint/no-unused-vars */

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
            description: content.description ?? "no content",
            published: true,
            official: content.official ?? false,
            type: content.type ?? "image" as ContentType,
            authorId: content.autherId,
            alt: content.alt ?? "",
        },
        });
        prisma.$disconnect();
        return item.id; 
    } 
    catch (e) {
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
    return allPosts.map(post => ({
        id: post.id,
        topics: post.topics ? post.topics.split(',') : [],
        title: post.title,
        description: post.description ?? undefined,
        altText: post.alt ?? undefined,
        url: "", // Assuming you need to set this manually or fetch it from somewhere
        type: post.type as ContentType,
        official: post.official,
        autherID: post.authorId ?? "",
        broken: false // Assuming a default value
    }));
} 

export async function updateContent(content: ContentItem, file: File, id?: number) {
    const prisma = initPrisma();
    if (!prisma) {
        return new Error("Failed to initialize Prisma client");
    }
    if (!content.id && !id) { 
        console.error("No ID provided for the content item");
        return new Error("No ID provided for the content item");
    }

    const oldItem = await prisma.content.findUnique({ 
        where: {
            id: id ?? content.id,
        },
    });
    if (!oldItem) {
        console.error("No existing content item found with the provided ID");
        return new Error("No existing content item found with the provided ID");
    }
    //TODO make a difference object to compare the old and new content items
    if (content.official != oldItem.official) {
        console.log("EDITING OFFICIAL status");
    }

    //TODO Delete the existing content and upload the new content if new content is provided
    if (file.size > 0 ) {
        console.log("File upload not yet implemented");
        return new Error("File upload not yet implemented: " + file.name + " and " + file.size);
    }

    const topics: string = content.topics.join() ?? oldItem.topics;
    console.log("Updating the post: " + JSON.stringify(content));
    const updatedPost = await prisma.content.update({
        where: {
            id: id ?? content.id,
        },
        //TODO ONLY update the fields provided in the content object
        data: {
            title: content.title ?? oldItem.title,
            description: content.description ?? oldItem.description,
            published: content.official ?? oldItem.official,
            type: content.type as ContentType ?? oldItem.type,
            authorId: content.autherID ?? oldItem.authorId,
            alt: content.altText ?? oldItem.alt,
            topics: topics,
        },
    });
        console.log(`Published the newly created post: ${JSON.stringify(updatedPost)}`);
        prisma.$disconnect();
        return true;
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
    if (!post) {
        return new Error("No post found with the provided ID");
    }
    return {
        id: post.id,
        topics: post.topics ? post.topics.split(',') : [],
        title: post.title,
        description: post.description ?? undefined,
        altText: post.alt ?? undefined,
        url: "", // Assuming you need to set this manually or fetch it from somewhere
        type: post.type as ContentType,
        official: post.official,
        autherID: post.authorId ?? "",
        broken: false // Assuming a default value
    };
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
    return postsByUser.map(post => ({
        id: post.id,
        topics: post.topics ? post.topics.split(',') : [],
        title: post.title,
        description: post.description ?? undefined,
        altText: post.alt ?? undefined,
        url: "", // Assuming you need to set this manually or fetch it from somewhere
        type: post.type as ContentType,
        official: post.official,
        autherID: post.authorId ?? "",
        broken: false // Assuming a default value
    })); // Return the postsByUser array
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