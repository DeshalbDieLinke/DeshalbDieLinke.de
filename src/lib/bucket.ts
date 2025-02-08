/* eslint-disable @typescript-eslint/no-unused-vars */

"use server"
import { PutObjectCommand, S3Client, ObjectCannedACL, GetObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { BUCKET_CDN_ENDPOINT, BUCKET_ENDPOINT } from '../../config';
import { ListObjectsV2Command } from '@aws-sdk/client-s3';

export async function UploadToBucket(f: File, id: number) {
    // Step 1: Import the S3Client object and all necessary SDK commands.
    const SPACES_SECRET = process.env.SPACES_SECRET;
    const SPACES_ACCES_KEY = process.env.SPACES_ACCESS_KEY;
    const ENDPOINT = BUCKET_ENDPOINT
    if (!SPACES_SECRET || !SPACES_ACCES_KEY) {
        return new Error("No access key or secret key")
    }
// Step 2: The s3Client function validates your request and directs it to your Space's specified endpoint using the AWS SDK.
    const s3Client = new S3Client({
        endpoint: ENDPOINT, // Find your endpoint in the control panel, under Settings. Prepend "https://".
        forcePathStyle: false, // Configures to use subdomain/virtual calling format.
        region: "fra1", // Must be "us-east-1" when creating new Spaces. Otherwise, use the region in your endpoint (for example, nyc3).
        credentials: {
            accessKeyId: SPACES_ACCES_KEY, // Access key pair. You can create access key pairs using the control panel or API.
            secretAccessKey: SPACES_SECRET // Secret access key defined through an environment variable.
        }
    });

    // encodeURIComponent NOT needed as bucket does this automatically
    const cleanFileName = f.name

    let key;
    // Parse the MIME type of the file.
    if (f.type.startsWith("image")) {
        key = `images/${id}/${cleanFileName}`;
    } else if (f.type.startsWith("video")) {
        key = `videos/${id}/${cleanFileName}`;
    } else if (f.type === "application/pdf") {
        key = `pdfs/${id}/${cleanFileName}`;
    } else if (f.type.startsWith("audio")) {
        key = `audio/${id}/${cleanFileName}`;
    } else { 
        console.log("Invalid file type: " + f.type)
        return new Error("Invalid file type")
    }
    // Create File path from blob
    
    const arrayBuffer = await f.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
  
    console.log("Uploading: " + key)
    console.log("Type: " + f.type)
    console.log("Size: " + f.size)
    console.log("Name: " + f.name)
    console.log("File: " + f)
    
    // Step 3: Define the parameters for the object you want to upload.
    const params = {
    Bucket: "ddl", // The path to the directory you want to upload the object to, starting with your Space name.
    Key: `content/${key}`, // The name of the object you are uploading, ending with the file's name.
    Body: buffer, // The file you are uploading.
    ACL: ObjectCannedACL.public_read, // Defines ACL permissions, such as private or public.
    ContentType: f.type, // Sets the MIME type of the file.
    };

// Step 4: Define a function that uploads your object using SDK's PutObjectCommand object and catches any errors.
    const uploadObject = async () => {
    try {
        const data = await s3Client.send(new PutObjectCommand(params));
        console.log(
        "Successfully uploaded object: " +
            params.Bucket +
            "/" +
            params.Key
        );
        return true;
    } catch (err) {
        return err;
    }
    };


    // Step 5: Call the uploadObject function.
    return uploadObject();
}

export async function listDirBucket(dir: string): Promise<string[]>{
    const SPACES_SECRET = process.env.SPACES_SECRET;
    const SPACES_ACCES_KEY = process.env.SPACES_ACCESS_KEY;
    const ENDPOINT = BUCKET_ENDPOINT;

    if (!SPACES_SECRET || !SPACES_ACCES_KEY) {
        throw new Error("No access key or secret key");
    }

    const s3Client = new S3Client({
        endpoint: ENDPOINT,
        forcePathStyle: false,
        region: "fra1",
        credentials: {
            accessKeyId: SPACES_ACCES_KEY,
            secretAccessKey: SPACES_SECRET
        }
    });

    const params = {
        Bucket: "ddl",
        Prefix: dir,
    };

    try {
        const data = await s3Client.send(new ListObjectsV2Command(params));
        if (!data.Contents) {
            return [];
        }
        const listOfItems = data.Contents ? data.Contents.map((item) => item.Key ?? "") : [];
        return listOfItems;
    } catch (err) {
        console.log(`Error listing objects: ${err} at ${dir}`);
    }
    return [];

}

export async function deleteFromBucket(keys: string[]) { 
    // DELETE OBJECT from bucket
    const SPACES_SECRET = process.env.SPACES_SECRET;
    const SPACES_ACCES_KEY = process.env.SPACES_ACCESS_KEY;
    const ENDPOINT = BUCKET_ENDPOINT;

    if (!SPACES_SECRET || !SPACES_ACCES_KEY) {
        throw new Error("No access key or secret key");
    }

    const s3Client = new S3Client({
        endpoint: ENDPOINT,
        forcePathStyle: false,
        region: "fra1",
        credentials: {
            accessKeyId: SPACES_ACCES_KEY,
            secretAccessKey: SPACES_SECRET
        }
    });

    keys.forEach(async (key) => {
        const params = {
            Bucket: "ddl",
            Key: key,
        };
    
        try {
            const data = await s3Client.send(new DeleteObjectCommand(params));
            console.log(`Deleting object: ${params.Key}`);
            return data;
        } catch (err) {
            console.log(`Error deleting object: ${err}`);
        }
    });
    
}