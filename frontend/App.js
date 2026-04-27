import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity
} from 'react-native';

const categories = ['Plumbing', 'Electrical', 'Cleaning', 'Tutoring', 'Appliance repair'];
const urgencyOptions = ['Immediate (same day)', 'Within 24 hours', 'Flexible'];
const contactOptions = ['WhatsApp', 'Phone'];

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Find the best local service fast</Text>
        <Text style={styles.subtitle}>
          Submit once. We compare local providers and send your best option via WhatsApp.
        </Text>

        <Label text="Service category" />
        <View style={styles.chipWrap}>
          {categories.map((item) => (
            <View key={item} style={styles.chip}>
              <Text style={styles.chipText}>{item}</Text>
            </View>
          ))}
        </View>

        <Label text="Postcode" />
        <TextInput placeholder="e.g. SW1A 1AA" style={styles.input} />

        <Label text="Budget (optional)" />
        <TextInput placeholder="e.g. £80-£150" style={styles.input} />

        <Label text="Urgency" />
        <View style={styles.rowWrap}>
          {urgencyOptions.map((item) => (
            <View key={item} style={styles.optionPill}>
              <Text style={styles.optionText}>{item}</Text>
            </View>
          ))}
        </View>

        <Label text="Preferred contact" />
        <View style={styles.rowWrap}>
          {contactOptions.map((item) => (
            <View key={item} style={styles.optionPill}>
              <Text style={styles.optionText}>{item}</Text>
            </View>
          ))}
        </View>

        <Label text="WhatsApp number" />
        <TextInput placeholder="+44..." style={styles.input} />

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Submit request</Text>
        </TouchableOpacity>

        <Text style={styles.note}>
          Production flow: connect this form schema to Google Forms/Sheets and send results through
          WhatsApp Business.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

function Label({ text }) {
  return <Text style={styles.label}>{text}</Text>;
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  content: { padding: 18, gap: 10 },
  title: { fontSize: 24, fontWeight: '700', color: '#111827' },
  subtitle: { color: '#4B5563', marginBottom: 8 },
  label: { fontSize: 14, fontWeight: '600', color: '#1F2937', marginTop: 6 },
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10
  },
  chipWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: {
    backgroundColor: '#E0F2FE',
    borderColor: '#7DD3FC',
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6
  },
  chipText: { color: '#0C4A6E', fontSize: 12 },
  rowWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  optionPill: {
    backgroundColor: '#EEF2FF',
    borderColor: '#C7D2FE',
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6
  },
  optionText: { color: '#312E81', fontSize: 12 },
  button: {
    backgroundColor: '#111827',
    borderRadius: 10,
    marginTop: 10,
    paddingVertical: 12,
    alignItems: 'center'
  },
  buttonText: { color: '#FFFFFF', fontWeight: '700' },
  note: { marginTop: 10, color: '#6B7280', fontSize: 12 }
});
