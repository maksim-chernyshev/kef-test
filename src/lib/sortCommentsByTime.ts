import {IComment} from "../types/types";

export const sortCommentsByTime = (comments: IComment[]): IComment[] => {
    return comments
        .slice()
        .sort(
            (a, b) =>
                new Date(b.created).getTime() - new Date(a.created).getTime(),
        );
};
