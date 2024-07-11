import {fetchWithRetry} from "./fetchWithRetry";
import {IComment} from "src/types/types";

interface ICommentsStats {
    comments: number;
    likes: number;
}

export const getCommentsStats = async (
    pagesCount: number,
): Promise<ICommentsStats> => {
    let comments = 0;
    let likes = 0;
    const pagesArray: number[] = [];

    for (let i = 1; i <= pagesCount; i++) {
        pagesArray.push(i);
    }

    const commentRequests = pagesArray.map((page) => {
        return page ? fetchWithRetry(page) : null;
    });

    try {
        const pagesData = await Promise.all(commentRequests);

        pagesData.forEach((page) => {
            if (page) {
                comments += page.data.length;
                likes += page.data.reduce(
                    (sum: number, comment: IComment) => sum + comment.likes,
                    0,
                );
            }
        });
    } catch (error) {
        throw new Error((error as Error).message);
    }

    return {
        comments,
        likes,
    };
};
