import {useInfiniteQuery} from "@tanstack/react-query";
import {ICommentsPage} from "../types/types";
import getCommentsRequest from "../api/comments/getCommentsRequest";

export const usePageDataQuery = () => {
    return useInfiniteQuery<ICommentsPage, number>({
        queryKey: ["pageData"],
        queryFn: ({pageParam}) => getCommentsRequest(pageParam as number),
        initialPageParam: 1,
        getNextPageParam: (lastPage, allPages) => {
            if (allPages.length !== lastPage.pagination.total_pages) {
                return lastPage.pagination.page + 1;
            }
        },
    });
};
