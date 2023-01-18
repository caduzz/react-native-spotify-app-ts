import styled from 'styled-components/native';

export interface SlideProps {
    maxTintColor: string
    minTintColor: string
    width: number
    h: number
    p?: number
}

const Container = styled.View`
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    border-radius: 1px;
    height: ${ (p: SlideProps) => p.h}px;
    background-color: ${ (p: SlideProps) => p.maxTintColor};
`
const PlayerValue = styled.View`
    border-radius: 1px;
    width: ${ (p: SlideProps) => p.width }%
    height: ${ (p: SlideProps) => p.h }px;
    background-color: ${ (p: SlideProps) => p.minTintColor};
`;

const PlayerTouch = styled.View`
    left: -8px;
    width: 8px;
    height: 8px;
    border-radius: 4px;
    background-color: ${ (p: SlideProps) => p.minTintColor};
`

interface PlayerSliderParams {
    maximumTintColor: string,
    minimumTintColor: string,
    value: number,
    height: number,
    padding?: number,
    playerCircle?: false | boolean,
}

const SliderPlayer = ({ maximumTintColor, minimumTintColor, value, height, padding, playerCircle }: PlayerSliderParams) => {
    return (
        <Container maxTintColor={maximumTintColor} h={height}>
            <PlayerValue minTintColor={minimumTintColor} width={value} h={height} p={padding} />
            {playerCircle && <PlayerTouch minTintColor={minimumTintColor} />}
        </Container>
    );
}

export default SliderPlayer;