import getCommentsRequest from "src/api/comments/getCommentsRequest";
import {ICommentsPage} from "../types/types";

const MAX_RETRIES: number = 3;

export const fetchWithRetry = async (
    pageNumber: number,
    retries: number = MAX_RETRIES
): Promise<ICommentsPage | undefined> => {
    for (let attempt = 1; attempt <= retries; attempt++) {
        try {
            return await getCommentsRequest(pageNumber);
        } catch (error) {
            console.error(`Attempt ${attempt} - Error fetching comments for page ${pageNumber}:`, error);
            if (attempt === retries) throw new Error((error as Error).message);
        }
    }
};
