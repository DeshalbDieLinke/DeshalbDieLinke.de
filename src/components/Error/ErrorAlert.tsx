import { useContext, useEffect } from "react";
import { ErrorContext } from "./ErrorContext";
import { MessageCircleWarningIcon } from "lucide-react";


function ErrorAlert() {
    
    const Color  ={
        "error": "red-500",
        "warning": "yellow-500",
        "info": "blue-500",
        "success": "green-500",
    }

    const { error, setError, severity } = useContext(ErrorContext);

    useEffect(() => {
        setTimeout(() => {
            setError(null);
        }, 5000);
    }, []);

    if (!error) {
        return null;
    }


    return ( <>
            <div className={`fixed flex-col right-0 bottom-10 bg-white border-${Color[severity]} border-4 min-w-100 p-4`}>
                <MessageCircleWarningIcon color={Color[severity]} />
                {/* Content error */}
                <div>
                    <h1 className={"text-" + Color[severity]}> {error}</h1>

                </div>
                {/* Close button */}
                <button className={"btn-sm btn btn-primary "} onClick={() => setError(null)}>Close</button>
            </div>
        </>
     );
}

export default ErrorAlert;