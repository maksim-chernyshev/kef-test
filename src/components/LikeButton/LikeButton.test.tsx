import {fireEvent, render} from "@testing-library/react";
import LikeButton from "./LikeButton";

describe("Проверка кнопки лайка", () => {
    test("Картинка лайка поменялась", async () => {
        const onClickMock = jest.fn();

        const {getByAltText} = render(
            <LikeButton isLiked={false} onClick={onClickMock} />,
        );
        const likedImage = getByAltText("Поставить лайк");
        expect(likedImage).toBeInTheDocument();
        expect(likedImage.getAttribute("src")).toContain(
            "like-red-unfilled.png",
        );

        fireEvent.click(likedImage);

        expect(onClickMock).toHaveBeenCalledTimes(1);
        const {getByAltText: getByAltText2} = render(
            <LikeButton isLiked={true} onClick={onClickMock} />,
        );
        const notLikedImage = getByAltText2("Снять лайк");

        expect(notLikedImage).toBeInTheDocument();
        expect(notLikedImage.getAttribute("src")).toContain(
            "like-red-filled.png",
        );

        fireEvent.click(notLikedImage);

        expect(onClickMock).toHaveBeenCalledTimes(2);
    });
});
