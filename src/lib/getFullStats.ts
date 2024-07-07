import getCommentsRequest from "../api/comments/getCommentsRequest";
import {IComment} from "../shared/Comment/Comment";

export const getFullStats = async () => {
    let allComments: number = 0;
    let allLikes: number = 0;

    const responses = await Promise.all([
        getCommentsRequest(1),
        getCommentsRequest(2),
        getCommentsRequest(3)
    ]);

    responses.forEach((item) => {
        allComments += item.data.length;

        item.data?.forEach((comment: IComment) => {
            allLikes += comment.likes;
        })
    });

    return {
        allComments,
        allLikes
    };
}
