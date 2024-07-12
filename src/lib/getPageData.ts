import {IComment, IPagePagination} from "../types/types";
import getCommentsRequest from "../api/comments/getCommentsRequest";

interface IPageData {
    pagination: IPagePagination;
    comments: IComment[];
}

export const getPageData = async (
    pageNumber: number,
    retryCount = 5,
): Promise<IPageData> => {
    try {
        const pageInfo = await getCommentsRequest(pageNumber);

        return {
            pagination: pageInfo.pagination,
            comments: pageInfo.data,
        };
    } catch (error) {
        if (retryCount > 0) {
            console.error(`Ошибка загрузки данных. Попытка №${6 - retryCount}`);
            return getPageData(pageNumber, retryCount - 1);
        } else {
            throw new Error("Не удалось загрузить данные страницы");
        }
    }
};
