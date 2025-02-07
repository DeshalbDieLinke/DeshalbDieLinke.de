"use client";
interface UploadLoadingProps {
    status: "idle" | "uploading" | "success" | "error"
}


function UploadLoading({status}: UploadLoadingProps) {




    return (
    <div >

        {status == "uploading" && (
            <div className={"absolute left-0 top-0 upload-container h-full w-full z-8 bg-gray-600/75 bg-filter-blur"}>
                <div className="after:absolute after:w-20 after:h-5 after:rounded-full after:animate-spin after:bg-orange-200 after:z-10 after:shadow-lg after:left-1/2 after:top-1/2 after:-translate-x-1/2 after:-translate-y-1/2">
                </div>
            </div>
        )}
    
        {status == "success"  && (
            <div className="animate-feedback w-20 h-5 bg-green-600 absolute text-white p-4 rounded-m ">
                Upload Successful! 🎉
            </div>
            
        )}
    </div>
    );
}

export default UploadLoading;
