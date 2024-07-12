import {IComment} from "../types/types";

export const countLikes = (comments: IComment[]): number => {
    return comments.reduce((acc, current) => {
        return acc + current.likes;
    }, 0);
};
