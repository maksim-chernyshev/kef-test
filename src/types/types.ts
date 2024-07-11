export interface ICommentsPage {
    pagination: {
        page: number;
        size: number;
        total_pages: number;
    };
    data: IComment[];
}

export interface IComment {
    id: number;
    created: string;
    text: string;
    author: number;
    parent: number | null;
    likes: number;
    authorData: IAuthor;
}

export interface IAuthor {
    id: number;
    name?: string;
    avatar?: string;
}
