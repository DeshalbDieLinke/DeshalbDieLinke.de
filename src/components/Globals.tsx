// This is to wrap the entire app with providers
// Use this in any index file in place of a main.
import { ClerkProvider } from "@clerk/nextjs"
import {ErrorProvider} from "./Error/ErrorContext"
import {ErrorBoundary} from "react-error-boundary"
import ErrorAlert from "./Error/ErrorAlert"
import { deDE } from "@clerk/localizations"
import { AnimatePresence } from 'framer-motion'


export default function Globals({ children, className }: { children: React.ReactNode, className?: string }) {
    
    const PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY

    {if (!PUBLISHABLE_KEY) {
        throw new Error("PUBLISHABLE_KEY not set")
    }}
    
   
    return (
        // custom error boundary middleware
        <ErrorProvider >

                <ErrorBoundary fallbackRender={({ error, resetErrorBoundary }) => (
                    <div>
                        <p>Something went VERY wrong:</p>
                        <pre>{error.message}</pre>
                        <button onClick={resetErrorBoundary}>Try again</button>
                    </div>
                )}>
                    <ClerkProvider  dynamic publishableKey={PUBLISHABLE_KEY} afterSignOutUrl={"/"} localization={deDE} >
                        <AnimatePresence mode="wait">
                            <div className={className}>
                                {children}
                            </div>
                        </AnimatePresence>
                    </ClerkProvider>
                </ErrorBoundary>
                <ErrorAlert />
        </ErrorProvider>
    )
}