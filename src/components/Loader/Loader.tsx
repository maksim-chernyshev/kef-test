import {LoaderStyled} from "./styled";

export const Loader = () => (
    <LoaderStyled>
        <div className="spinner" data-testid="loader" />
    </LoaderStyled>
);
