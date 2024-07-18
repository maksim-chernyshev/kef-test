import {useQuery} from "@tanstack/react-query";
import {IAuthor} from "../types/types";
import getAuthorsRequest from "../api/authors/getAuthorsRequest";

export const useAuthorsQuery = () => {
    return useQuery<IAuthor[]>({
        queryKey: ["authors"],
        queryFn: getAuthorsRequest,
    });
};
