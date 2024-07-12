export interface ICommentsPage {
    pagination: IPagePagination;
    data: IComment[];
}

export interface IPagePagination {
    page: number;
    size: number;
    total_pages: number;
}

export interface IComment {
    id: number;
    created: string;
    text: string;
    author: number;
    parent: number | null;
    likes: number;
    authorData: IAuthor;
    updateLikes: (increment: boolean) => void;
}

export interface IAuthor {
    id: number;
    name?: string;
    avatar?: string;
}

export type CommentTreeType = Record<number, IComment[]>;
