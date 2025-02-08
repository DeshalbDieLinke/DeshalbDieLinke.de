    // "use client";
    // import { DDL } from "@/lib/DDL";
    // import React, { useEffect } from "react";
    // import { transferItems } from "./transferItems";

    // function TransferContent() {

    //     const [successfullyTransferred, setSuccessfullyTransferred] = React.useState(false);
    //     const [failedToTransfer, setFailedToTransfer] = React.useState(false);
    //     useEffect(() => {
    //         DDL.GetContentItems((materials) => {
    //             materials.forEach((item) => {
    //                 transferItems(item).then((res) => {
    //                     if (res) {
    //                         setSuccessfullyTransferred(true);
    //                     } else {
    //                         setFailedToTransfer(true);
    //                     }
    //                 });

    //             });});
            
    //         }, 
            
    //         []);

        
    //     return ( 
    //         <div>
    //             <h1>Transfer Content</h1>
    //             <p>Transfer from old db to new </p>
    //             {successfullyTransferred && <p>Successfully transferred: {successfullyTransferred}</p>}
    //             {failedToTransfer && <p>Failed to transfer: {failedToTransfer}</p>}
            
    //         </div>

    //     );
    // }

    // export default TransferContent;