import {IComment, IPagePagination} from "../types/types";
import getCommentsRequest from "../api/comments/getCommentsRequest";

interface IPageData {
    pagination: IPagePagination;
    comments: IComment[];
}

export const getPageData = async (pageNumber: number): Promise<IPageData> => {
    const pageInfo = await getCommentsRequest(pageNumber);

    return {
        pagination: pageInfo.pagination,
        comments: pageInfo.data,
    };
};
