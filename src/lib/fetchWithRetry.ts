import getCommentsRequest from "../api/comments/getCommentsRequest";

const MAX_RETRIES = 3;

export const fetchWithRetry = async (pageNumber: number, retries: number = MAX_RETRIES): Promise<any> => {
    for (let attempt = 1; attempt <= retries; attempt++) {
        try {
            return await getCommentsRequest(pageNumber);
        } catch (error) {
            console.error(`Attempt ${attempt} - Error fetching comments for page ${pageNumber}:`, error);
            if (attempt === retries) throw error;
        }
    }
};
