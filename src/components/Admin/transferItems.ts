// /* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable @typescript-eslint/no-unused-vars */


// "use server"

// import { UploadItem, uploadToDB } from "@/lib/db";
// import { ContentItem, ContentType } from "@/types/ContentItem";
// import { auth, clerkClient } from "@clerk/nextjs/server";
// import { blob } from "stream/consumers";
// import { BUCKET_ENDPOINT } from "../../../config";
// import { ObjectCannedACL, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

// export async function transferItems(item: ContentItem)
// {       

//     const newItem: UploadItem = {
//         // title: string;
//         // description: string;
//         // official: boolean;
//         // type: ContentType;
//         // autherId: string;
//         // alt: string;

//         title: item.title,
//         description: item.description ?? "no content",
//         topics: item.topics,
//         type: item.type,
//         official: item.official,
//         alt: item.altText ?? "",
//         autherId: "user_2sdx8RgwL0AKNU8cEwBLSS9mw7E",
//     }

   
//     // Download the file from url
//     if (!item.url) {
//         throw new Error("No URL")
//         return
//     }

//     const file = await fetch(item.url).then(res => res.blob())


//     const res = await uploadToDB(newItem)
//     if (res instanceof Error) {
//         return {error: "Database error", message: res.message, status: 500}
//     } else if (  typeof res !== "number") {
//         return {error: "Database error", message: "Invalid response from database", status: 500}
//     } 

//     const urlDecodedName = decodeURIComponent(item.url.split("/").pop() as string)
//     const bucketResponse = await UploadToBucket(file, res as number, urlDecodedName)
//     if (bucketResponse != true) {
//         return {error: "Bucket error", message:"Failed to Upload File", status: 500}
//     }
//     return {error: "", message: "Success", status: 200}

// }

// export async function UploadToBucket(f: Blob, id: number, cleanFileName: string) {
//     // Step 1: Import the S3Client object and all necessary SDK commands.
//     const SPACES_SECRET = process.env.SPACES_SECRET;
//     const SPACES_ACCES_KEY = process.env.SPACES_ACCESS_KEY;
//     const ENDPOINT = BUCKET_ENDPOINT
//     if (!SPACES_SECRET || !SPACES_ACCES_KEY) {
//         return new Error("No access key or secret key")
//     }
//     // Step 2: The s3Client function validates your request and directs it to your Space's specified endpoint using the AWS SDK.
//     const s3Client = new S3Client({
//         endpoint: ENDPOINT, // Find your endpoint in the control panel, under Settings. Prepend "https://".
//         forcePathStyle: false, // Configures to use subdomain/virtual calling format.
//         region: "fra1", // Must be "us-east-1" when creating new Spaces. Otherwise, use the region in your endpoint (for example, nyc3).
//         credentials: {
//             accessKeyId: SPACES_ACCES_KEY, // Access key pair. You can create access key pairs using the control panel or API.
//             secretAccessKey: SPACES_SECRET // Secret access key defined through an environment variable.
//         }
//     });

//     // encodeURIComponent NOT needed as bucket does this automatically


//     let key;
//     // Parse the MIME type of the file.
//     if (f.type.startsWith("image")) {
//         key = `images/${id}/${cleanFileName}`;
//     } else if (f.type.startsWith("video")) {
//         key = `videos/${id}/${cleanFileName}`;
//     } else if (f.type === "application/pdf") {
//         key = `pdfs/${id}/${cleanFileName}`;
//     } else if (f.type.startsWith("audio")) {
//         key = `audio/${id}/${cleanFileName}`;
//     } else { 
//         console.log("Invalid file type: " + f.type)
//         return new Error("Invalid file type")
//     }
//     // Create File path from blob
    
//     const arrayBuffer = await f.arrayBuffer();
//     const buffer = Buffer.from(arrayBuffer);
  
//     console.log("Uploading: " + key)
//     console.log("Type: " + f.type)
//     console.log("Size: " + f.size)
//     console.log("Name: " + cleanFileName)
//     console.log("File: " + f)
    
//     // Step 3: Define the parameters for the object you want to upload.
//     const params = {
//     Bucket: "ddl", // The path to the directory you want to upload the object to, starting with your Space name.
//     Key: `content/${key}`, // The name of the object you are uploading, ending with the file's name.
//     Body: buffer, // The file you are uploading.
//     ACL: ObjectCannedACL.public_read, // Defines ACL permissions, such as private or public.
//     ContentType: f.type, // Sets the MIME type of the file.
//     };

// // Step 4: Define a function that uploads your object using SDK's PutObjectCommand object and catches any errors.
//     const uploadObject = async () => {
//     try {
//         const data = await s3Client.send(new PutObjectCommand(params));
//         console.log(
//         "Successfully uploaded object: " +
//             params.Bucket +
//             "/" +
//             params.Key
//         );
//         return true;
//     } catch (err) {
//         return err;
//     }
//     };


//     // Step 5: Call the uploadObject function.
//     return uploadObject();
// }
