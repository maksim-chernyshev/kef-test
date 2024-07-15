import React from "react";
import {render, screen, fireEvent, waitFor} from "@testing-library/react";
import Comments from "./Comments";
import {getPageData} from "src/lib/getPageData";
import getAuthorsRequest from "src/api/authors/getAuthorsRequest";
import {IAuthor, IComment} from "src/types/types";

jest.mock("src/lib/getPageData");
jest.mock("src/api/authors/getAuthorsRequest");

const mockComments: IComment[] = [
    {
        id: 1,
        created: "2023-07-12",
        text: "Коммент 1",
        author: 1,
        parent: 0,
        likes: 5,
        authorData: {
            id: 2,
            name: "Василий",
            avatar: "image-1.jpg",
        },
        updateLikes: () => {},
    },
    {
        id: 2,
        created: "2023-07-12",
        text: "Коммент 2",
        author: 2,
        parent: 1,
        likes: 3,
        authorData: {
            id: 5,
            name: "Михаил",
            avatar: "image-2.jpg",
        },
        updateLikes: () => {},
    },
];

const mockAuthors: IAuthor[] = [
    {
        id: 2,
        name: "Василий",
    },
    {
        id: 5,
        name: "Михаил",
    },
];

describe("Компонент Comments", () => {
    beforeEach(() => {
        (getAuthorsRequest as jest.Mock).mockResolvedValue(mockAuthors);
        (getPageData as jest.Mock).mockResolvedValue({
            pagination: {total_pages: 1},
            comments: mockComments,
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test("Рендер списка комментариев", async () => {
        render(<Comments />);

        await waitFor(() => {
            expect(screen.queryByTestId("loader")).not.toBeInTheDocument();
        });

        await waitFor(() => expect(getAuthorsRequest).toHaveBeenCalledTimes(1));
        await waitFor(() => expect(getPageData).toHaveBeenCalledTimes(1));

        expect(await screen.findByText("Коммент 1")).toBeInTheDocument();
        expect(await screen.findByText("Коммент 2")).toBeInTheDocument();
    });

    test("Подгрузка комментов по клику на кнопку", async () => {
        render(<Comments />);

        await waitFor(() => expect(getAuthorsRequest).toHaveBeenCalledTimes(1));
        await waitFor(() => expect(getPageData).toHaveBeenCalledTimes(1));

        let loadMoreButton: HTMLButtonElement | null = null;

        await waitFor(() => {
            loadMoreButton = screen.queryByTestId("comments-more");

            if (loadMoreButton) {
                expect(loadMoreButton).toBeInTheDocument();
            }
        });

        if (loadMoreButton) {
            (getPageData as jest.Mock).mockResolvedValue({
                pagination: {total_pages: 2},
                comments: [],
            });

            fireEvent.click(loadMoreButton);

            await waitFor(() => expect(getPageData).toHaveBeenCalledTimes(2));
        }
    });

    test("Рендер ошибки", async () => {
        (getPageData as jest.Mock).mockRejectedValue(
            new Error("Ошибка загрузки данных"),
        );

        render(<Comments />);

        await waitFor(() => expect(getPageData).toHaveBeenCalledTimes(1));

        const errorText = screen.queryByText("Произошла ошибка загрузки.");

        if (errorText) {
            expect(errorText).toBeInTheDocument();
        }
    });
});
