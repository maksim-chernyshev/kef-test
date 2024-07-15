import {PageErrorStyled} from "./styled";
import Button from "src/components/Button/Button";

const PageError = () => {
    const reloadPage = () => {
        window.location.reload();
    };

    return (
        <PageErrorStyled>
            <p>Произошла непредвиденная ошибка</p>

            <Button type="button" onClick={reloadPage}>
                Обновить страницу
            </Button>
        </PageErrorStyled>
    );
};

export default PageError;
