import React, { useCallback} from 'react';
import { useNavigation } from '@react-navigation/native';
import { 
  View,
  Text,
  ImageBackground,
} from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

import giveCalssesBgImage from '../../assets/images/give-classes-background.png';

import styles from './styles';

const GiveClasses: React.FC = () => {
  const { goBack } = useNavigation();

  const handleNavigateBack = useCallback(() => {
    goBack();
  }, []);

  return (
    <View style={styles.container} >
      <ImageBackground 
        resizeMode="contain" 
        source={giveCalssesBgImage} 
        style={styles.content}
      >
        <Text style={styles.title}>
          Quer ser um Proffy?
        </Text>
        <Text style={styles.description}>
          Para começar, voçê precisa se 
          cadastrar como professor na nossa plataforma web.
        </Text>
      </ImageBackground>

      <RectButton onPress={handleNavigateBack} style={styles.okButton}>
        <Text style={styles.okButtonText}>Tudo bem</Text>
      </RectButton>
    </View>
  );
}

export default GiveClasses;