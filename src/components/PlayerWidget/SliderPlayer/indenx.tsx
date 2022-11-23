import styled from 'styled-components/native';

export interface SlideProps {
    maxTintColor: string
    minTintColor: string
    width: number
}

const Container = styled.TouchableOpacity`
    width: 100%;
    height: 2px;
    background-color: ${ (p: SlideProps) => p.maxTintColor};
`
const PlayerValue = styled.View`
    width: ${ (p: SlideProps) => p.width }%
    height: 2px;
    background-color: ${ (p: SlideProps) => p.minTintColor};
`;

interface PlayerSliderParams {
    maximumTintColor: string,
    minimumTintColor: string,
    value: number,
}

const SliderPlayer = ({ maximumTintColor, minimumTintColor, value }: PlayerSliderParams) => {
    return (
        <Container maxTintColor={maximumTintColor}>
            <PlayerValue minTintColor={minimumTintColor} width={value} >
            </PlayerValue>
        </Container>
    );
}

export default SliderPlayer;