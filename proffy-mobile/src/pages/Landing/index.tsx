import React, { useCallback, useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';
import {
  View, 
  Text,
  Image,
} from 'react-native';

import api from '../../services/api';

import landingImg from '../../assets/images/landing.png';
import studyIcon from '../../assets/images/icons/study.png';
import giveClassesIcon from '../../assets/images/icons/give-classes.png';
import heartIcon from '../../assets/images/icons/heart.png';

import styles from './styles';

interface DataProps {
  total: number;
}

const Landing: React.FC = () => {
  const { navigate } = useNavigation();

  const [totalConnections, setTotalConnections] = useState(0);

  useEffect(() => {
    const loadTotalConnections = async (): Promise<void> => {
      const response = await api.get<DataProps>('/connections');
      setTotalConnections(response.data.total);
    };

    loadTotalConnections();
  }, []);

  const handleNavigateToGiveClasses = useCallback(() => {
    navigate('GiveClasses');
  }, []);

  const handleNavigateToStudy = useCallback(() => {
    navigate('StudyTabs');
  }, []);

  return (
    <View style={styles.container}>
      <Image source={landingImg} style={styles.banner} />
    
      <Text style={styles.title}>
        Seja bem-vindo, {`\n`}
        <Text style={styles.titleBold}>
          O que deseja fazer ?
        </Text>
      </Text>

      <View style={styles.buttonContainer}>
        <RectButton 
          onPress={handleNavigateToStudy}
          style={[styles.button, styles.buttonPrimary]}
         > 
          <Image source={studyIcon} />
          
          <Text style={styles.buttonText}>Estudar</Text>
        </RectButton>

        <RectButton
          onPress={handleNavigateToGiveClasses} 
          style={[styles.button, styles.buttonSecondary]}
        > 
          <Image source={giveClassesIcon} />
          
          <Text style={styles.buttonText}>Dar aulas</Text>
        </RectButton>
      </View>

      <Text style={styles.totalConnections}>
        Total de {totalConnections} conexões realizadas {' '}
        <Image source={heartIcon} />
      </Text>
    </View>
  );
}

export default Landing;
