import {useInfiniteQuery} from "@tanstack/react-query";
import {ICommentsPage} from "../types/types";
import getCommentsRequest from "../api/comments/getCommentsRequest";

export const usePageDataQuery = () => {
    return useInfiniteQuery<ICommentsPage, number>({
        queryKey: ['pageData'],
        queryFn: ({pageParam}: any) => getCommentsRequest(pageParam),
        initialPageParam: 1,
        retry: 5,
        getNextPageParam: (lastPage, allPages) => {
            if (allPages.length !== lastPage.pagination.total_pages) {
                // console.log(allPages.length);
                return lastPage.pagination.page + 1
            }
        }
    })
}
