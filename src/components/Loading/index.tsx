import { View, ActivityIndicator, ActivityIndicatorProps } from 'react-native';
import { THEME } from '../../theme';

import { styles } from './styles';

interface LoadingProps extends ActivityIndicatorProps {}

export function Loading({...rest}: LoadingProps ) {
  return (
    <View style={styles.container}>
        <ActivityIndicator
            color={THEME.COLORS.PRIMARY}
            {...rest}
        />
    </View>
  );
}