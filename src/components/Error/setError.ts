import { useContext, useCallback } from "react";
import { ErrorContext } from "./ErrorContext";

export default function useShowError() {
    const { setError, setSeverity } = useContext(ErrorContext);

    const showError = useCallback(
    (
        message: string,
        severity: "error" | "warning" | "info" | "success" = "error"
    ) => {
        setError(message);
        setSeverity(severity);
    },
    [setError, setSeverity]
    );

    return showError;
}
