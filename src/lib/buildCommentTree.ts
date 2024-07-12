import {CommentTreeType, IComment} from "src/types/types";

export const buildCommentTree = (comments: IComment[]): CommentTreeType => {
    const commentTree: CommentTreeType = {};

    comments.forEach((comment) => {
        const parentId = comment.parent ?? 0;

        if (!commentTree[parentId]) {
            commentTree[parentId] = [];
        }

        commentTree[parentId].push(comment);
    });

    return commentTree;
};
