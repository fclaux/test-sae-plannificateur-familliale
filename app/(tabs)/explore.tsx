import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default function ShoppingList() {
  const [item, setItem] = useState('');
  const [category, setCategory] = useState('');
  const [shoppingList, setShoppingList] = useState<{ item: string; category: string }[]>([]);

  const addItem = () => {
    if (item.trim() && category) {
      setShoppingList([...shoppingList, { item, category }]);
      setItem('');
      setCategory('');
    }
  };

  const removeItem = (index: number) => {
    const newList = shoppingList.filter((_, i) => i !== index);
    setShoppingList(newList);
  };

  // Trier la liste par catégorie
  const sortedList = [...shoppingList].sort((a, b) => a.category.localeCompare(b.category));

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Liste de Courses</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Ajouter un article"
        value={item}
        onChangeText={setItem}
      />

      <Picker
        selectedValue={category}
        style={styles.picker}
        onValueChange={(itemValue: string) => setCategory(itemValue)}
      >
        <Picker.Item label="Sélectionner une catégorie" value="" />
        <Picker.Item label="Fruits" value="Fruits" />
        <Picker.Item label="Légumes" value="Légumes" />
        <Picker.Item label="Produits laitiers" value="Produits laitiers" />
        <Picker.Item label="Viande" value="Viande" />
        <Picker.Item label="Pain" value="Pain" />
        <Picker.Item label="Autres" value="Autres" />
      </Picker>

      <Button title="Ajouter" onPress={addItem} />

      <FlatList
        data={sortedList}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.listItem}>
            <Text>{item.item} ({item.category})</Text>
            <Button title="Supprimer" onPress={() => removeItem(index)} />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 10,
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});
