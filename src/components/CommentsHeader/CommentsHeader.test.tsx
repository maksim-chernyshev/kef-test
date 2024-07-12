import {render} from "@testing-library/react";
import CommentsHeader from "./CommentsHeader";

describe("компонент CommentsHeader", () => {
    it("Рендер загрузки", () => {
        const {getByText} = render(
            <CommentsHeader stats={{comments: 0, likes: 0}} isError={false} />,
        );

        expect(getByText("Загрузка...")).toBeInTheDocument();
    });

    it("Рендер ошибки", () => {
        const {getByText} = render(
            <CommentsHeader stats={{comments: 0, likes: 0}} isError={true} />,
        );

        expect(getByText("Ошибка загрузки")).toBeInTheDocument();
    });

    it("Рендер количества комментариев", () => {
        const {getByText} = render(
            <CommentsHeader stats={{comments: 5, likes: 10}} isError={false} />,
        );

        expect(getByText("5 комментариев")).toBeInTheDocument();
    });

    it("Рендер количества лайков", () => {
        const {getByText} = render(
            <CommentsHeader stats={{comments: 5, likes: 10}} isError={false} />,
        );

        expect(getByText("10")).toBeInTheDocument();
    });
});
