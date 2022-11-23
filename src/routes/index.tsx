import { NavigationContainer } from '@react-navigation/native'
import { useContext } from 'react'
import PlayerModal from '../components/PlayerModal'
import { MusicContext } from '../contexts/MusicContextProvider'
import { MainTab } from './stack.routes'

export function Routes() {
    const {currentSound, musicModal} = useContext(MusicContext);

    return (
        <NavigationContainer>
            <MainTab />
            {currentSound.id &&
                <PlayerModal 
                    visible={musicModal}
                />
            }
        </NavigationContainer>
    )
}