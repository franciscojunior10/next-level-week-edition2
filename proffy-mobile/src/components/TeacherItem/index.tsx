import React, { useCallback, useState } from 'react';
import { RectButton } from 'react-native-gesture-handler';
import { 
  View,
  Text,
  Image,
  Linking 
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import heartOutineFrom from '../../assets/images/icons/heart-outline.png';
import unFavoriteIcon from '../../assets/images/icons/unfavorite.png';
import whatsappIcon from '../../assets/images/icons/whatsapp.png';

import styles from './styles';

export interface Teacher {
  id: number;
  avatar: string;
  bio: string;
  cost: number;
  name: string;
  subject: string;
  whatsapp: string;
}

interface TeacherItemPrpos {
  teacher: Teacher;
  favorited: boolean;
}

const TeacherItem: React.FC<TeacherItemPrpos> = ({ teacher, favorited }) => {
  const [isFavorited, setIsFavorited] = useState(favorited);
  
  const handleLinkWhatsapp = useCallback(() => {
    Linking.openURL(`whatsapp://send?phone=55${teacher.whatsapp}`);
  }, []);
  
  const handleToggleFavorite = useCallback(async () => {
    const favorites = await AsyncStorage.getItem('favorites');
    
    let favoritesArray = [];

    if (favorites) {
      favoritesArray = JSON.parse(favorites);
    }

    if (isFavorited) {
      const favoritedIndex = favoritesArray.findIndex((teacherItem: Teacher) => {
        return teacherItem.id === teacher.id;
      });

      favoritesArray.splice(favoritedIndex, 1);

      setIsFavorited(false);
    } else {
      favoritesArray.push(teacher);
      
      setIsFavorited(true);
    }

    await AsyncStorage.setItem('favorites', JSON.stringify(favoritesArray));
  }, [AsyncStorage]);

  return (
    <View style={styles.container}>
      <View style={styles.profile}>
        <Image 
          style={styles.avatar}
          source={{ uri: teacher.avatar }}
        />

        <View style={styles.profileInfo}>
          <Text style={styles.name}>{teacher.name}</Text>
          <Text style={styles.subject}>{teacher.subject}</Text>
        </View>
      </View>  

      
      <Text style={styles.bio}>
        {teacher.bio}
      </Text>    

      <View style={styles.footer}>
        <Text style={styles.price}>
          Preço/hora {'   '}
          <Text style={styles.priceValue}>R$ {teacher.cost}</Text>
        </Text>

        <View style={styles.buttonsConatainer}>
          <RectButton
            onPress={handleToggleFavorite} 
            style={[
              styles.favoriteButton, 
              isFavorited ? styles.favorited : {},
            ]}
          >
            { isFavorited 
              ? <Image source={unFavoriteIcon} /> 
              : <Image source={heartOutineFrom} /> 
            }
          </RectButton>

          <RectButton onPress={handleLinkWhatsapp} style={styles.contactButton}>
            <Image source={whatsappIcon} />
            <Text style={styles.contactButtonText}>Entrar em contato</Text>
          </RectButton>
        </View>
      </View>
    </View>
  );
}

export default TeacherItem;