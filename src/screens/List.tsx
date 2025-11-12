import React from 'react';
import { View } from 'react-native';
import { FlatList } from 'react-native';
import { List as PaperList } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const DATA = Array.from({ length: 20 }).map((_, i) => ({
  id: i + 1,
  title: `Item #${i + 1}`,
  subtitle: `Ini adalah item ke-${i + 1}`,
}));

export default function ListScreen() {
  const navigation = useNavigation<any>();

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <FlatList
        data={DATA}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <PaperList.Item
            title={item.title}
            description={item.subtitle}
            onPress={() => navigation.getParent()?.navigate('Detail', { id: item.id })}
          />
        )}
      />
    </View>
  );
}
