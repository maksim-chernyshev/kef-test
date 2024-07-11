import {getCommentsStats} from '../../lib/getCommentsStats';
import {render, screen, waitFor} from "@testing-library/react";
import CommentsHeader from "./CommentsHeader";

jest.mock('../../lib/getCommentsStats', () => ({
    getCommentsStats: jest.fn(),
}));

describe('Получение статистики', () => {
    test('Получение кол-ва комментариев', async () => {
        (getCommentsStats as jest.Mock).mockResolvedValue({ comments: 29 });

        const data = await getCommentsStats(1);
        expect(data.comments).toBe(29);
    });

    test('Получение кол-ва лайков', async () => {
        (getCommentsStats as jest.Mock).mockResolvedValue({ likes : 2344 });

        const data = await getCommentsStats(1);
        expect(data.likes).toBe(2344);
    });

    test('Рендер текста загрузки', async () => {
        (getCommentsStats as jest.Mock).mockResolvedValue({ comments: 0, likes: 0 });

        render(<CommentsHeader pages={1} />);

        expect(screen.getByText('Загрузка...')).toBeInTheDocument();
    });

    test('Рендер компонента с данными', async () => {
        (getCommentsStats as jest.Mock).mockResolvedValue({ comments: 2, likes: 3 });

        render(<CommentsHeader pages={1} />);

        await waitFor(() => expect(screen.getByText('2 комментария')).toBeInTheDocument());
        expect(screen.getByText('3')).toBeInTheDocument();
    });

    test('Рендер компонента с ошибкой', async () => {
        (getCommentsStats as jest.Mock).mockRejectedValue(new Error('Failed to fetch'));

        render(<CommentsHeader pages={1} />);

        await waitFor(() => expect(screen.getByText('Ошибка загрузки')).toBeInTheDocument());
    });
});
