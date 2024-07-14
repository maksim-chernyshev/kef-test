import React from "react";
import Comments from "src/components/Comments/Comments";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
    return (
        <div className="app-wrapper">
            <QueryClientProvider client={queryClient}>
                <Comments />
            </QueryClientProvider>
        </div>
    );
}

export default App;
