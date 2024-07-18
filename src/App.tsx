import React from "react";
import Comments from "src/components/Comments/Comments";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

function App() {
    return (
        <div className="app-wrapper">
            <QueryClientProvider client={queryClient}>
                <Comments />
                <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
        </div>
    );
}

export default App;
