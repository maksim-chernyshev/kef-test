import getCommentsRequest from "../api/comments/getCommentsRequest";
import {IComment} from "../components/Comment/Comment";
import * as pages from "../data/comments"
import {fetchWithRetry} from "./fetchWithRetry";

export const getFullStats = async () => {
    let allComments = 0;
    let allLikes = 0;
    const pagesCount = Object.keys(pages);

    const commentRequests = pagesCount.map((page) => {
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
