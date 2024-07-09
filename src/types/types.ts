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
    name: string;
    avatar: string;
}
