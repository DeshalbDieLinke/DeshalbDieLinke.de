// ErrorContext.tsx
import { createContext, useState, useEffect } from "react";

export interface ErrorContextProps {
    error: string | null;
    setError: (error: string | null) => void;
    severity: "error" | "warning" | "info" | "success";
    setSeverity: (severity: "error" | "warning" | "info" | "success") => void;
}

export const ErrorContext = createContext<ErrorContextProps>({
    error: null,
    severity: "error",
    setSeverity: () => { },
    setError: function (error: string | null): void {
        console.error("Error Context not initialized" + error);
    }
});

export const ErrorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [error, setError] = useState<string | null>(null);
    const [severity, setSeverity] = useState<"error" | "warning" | "info" | "success">("error");

    useEffect(() => {
        console.log("Error Updated:", error);
    }, [error]);

    return (
        <ErrorContext.Provider value={{ error, setError, severity, setSeverity}}>
            {children}
        </ErrorContext.Provider>
    );
};
