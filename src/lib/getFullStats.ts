import getCommentsRequest from "../api/comments/getCommentsRequest";
import {IComment} from "../components/Comment/Comment";
import * as pages from "../data/comments"

export const getFullStats = async () => {
    let allComments: number = 0;
    let allLikes: number = 0;
    let totalPages = Object.keys(pages);

    const commentRequests = totalPages.map(async (page) => {
        const pageNumber = Number(page.match(/\d+$/));

        if (pageNumber !== null) {
            try {
                return await getCommentsRequest(pageNumber);
            } catch (error) {
                console.error(`Error fetching comments for page ${pageNumber}:`, error);
                return null;
            }
        }
    });

    const responses = await Promise.all(commentRequests);

    responses.forEach((item) => {
        if (item) {
            allComments += item.data.length;

            item.data.forEach((comment: IComment) => {
                allLikes += comment.likes;
            });
        }
    });

    return {
        allComments,
        allLikes
    };
};
