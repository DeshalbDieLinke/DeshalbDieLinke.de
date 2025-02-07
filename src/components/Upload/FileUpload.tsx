/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable  @typescript-eslint/no-explicit-any */

function FileUpload(props: {onFileAdded?: (e: any) => void, className?: string}) {

    const onFileAdded = props.onFileAdded ?? ((e: any) => {});

    return ( <div className="flex flex-col py-4 w-full ">
        <label htmlFor="file" className="btn rounded-xl" >Datei auswählen</label>
        <input  className="w-0 -top-5 absolute h-0 bg-red-200/0 rounded-xl" onChange={onFileAdded} type="file" name="file" id="file" accept="image/* video/* .pdf"/>
        </div> );
}

export default FileUpload;