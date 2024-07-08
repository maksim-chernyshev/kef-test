import getCommentsRequest from "../api/comments/getCommentsRequest";
import {IComment} from "../components/Comment/Comment";
import * as pages from "../data/comments"

const MAX_RETRIES = 3;

const fetchWithRetry = async (pageNumber: number, retries: number = MAX_RETRIES): Promise<any> => {
    for (let attempt = 1; attempt <= retries; attempt++) {
        try {
            return await getCommentsRequest(pageNumber);
        } catch (error) {
            console.error(`Attempt ${attempt} - Error fetching comments for page ${pageNumber}:`, error);
            if (attempt === retries) throw error;
        }
    }
};

export const getFullStats = async () => {
    let allComments = 0;
    let allLikes = 0;
    const totalPages = Object.keys(pages);

    const commentRequests = totalPages.map((page) => {
        const pageNumber = Number(page.match(/\d+$/));

        return pageNumber
            ? fetchWithRetry(pageNumber)
            : null;
    });

    const responses = await Promise.all(commentRequests);

    responses.forEach((item) => {
        if (item) {
            allComments += item.data.length;
            allLikes += item.data.reduce((sum: number, comment: IComment) => sum + comment.likes, 0);
        }
    });

    return {
        allComments,
        allLikes
    };
};
