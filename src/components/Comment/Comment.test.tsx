import {fireEvent, render} from "@testing-library/react";
import Comment from "./Comment";
import {IComment} from "../../types/types";

const defaultUser = "default-user.jpg";

const commentData = {
    id: 2,
    author: 5,
    parent: null,
    created: "2024-07-12T10:00:00Z",
    text: "Текст комментария",
    likes: 10,
    authorData: {
        id: 1,
        name: "John Doe",
        avatar: "author-avatar-url",
    },
    updateLikes: () => {},
};

describe("Comment", () => {
    test("Рендеринг компонента Comment с аватаром и данными автора", () => {
        const {getByAltText, getByText} = render(<Comment {...commentData} />);

        const avatarImg = getByAltText(`Аватар ${commentData.authorData.name}`);
        expect(avatarImg).toBeInTheDocument();
        expect(avatarImg.getAttribute("src")).toBe(
            commentData.authorData.avatar,
        );

        const authorName = getByText(commentData.authorData.name);
        expect(authorName).toBeInTheDocument();

        const commentCreated = getByText(commentData.created);
        expect(commentCreated).toBeInTheDocument();

        const commentText = getByText(commentData.text);
        expect(commentText).toBeInTheDocument();

        const likesCounter = getByText(commentData.likes.toString());
        expect(likesCounter).toBeInTheDocument();
    });

    test("Обработка клика на кнопку лайка", () => {
        const {getByAltText, getByText} = render(<Comment {...commentData} />);

        const likeButton = getByAltText("Поставить лайк").parentElement;

        if (likeButton) {
            fireEvent.click(likeButton);
        }

        const likesCounterUpdated = getByText(
            (commentData.likes + 1).toString(),
        );
        expect(likesCounterUpdated).toBeInTheDocument();

        if (likeButton) {
            fireEvent.click(likeButton);
        }

        const likesCounterOriginal = getByText(commentData.likes.toString());
        expect(likesCounterOriginal).toBeInTheDocument();
    });

    test("Отображение аватара и имени пользователя, если данные автора отсутствуют", () => {
        const commentData: IComment = {
            id: 2,
            author: 5,
            parent: null,
            created: "2024-07-12T10:00:00Z",
            text: "Текст комментария",
            likes: 10,
            authorData: {
                id: 1,
                name: undefined,
                avatar: undefined,
            },
            updateLikes: () => {},
        };

        const {getByAltText, getByText} = render(<Comment {...commentData} />);

        const defaultAvatar = getByAltText("Аватар пользователя не найден");
        expect(defaultAvatar).toBeInTheDocument();
        expect(defaultAvatar.getAttribute("src")).toBe(defaultUser);

        const defaultUserName = getByText("Пользователь не найден");
        expect(defaultUserName).toBeInTheDocument();
    });
});
