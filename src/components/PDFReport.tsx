import React from 'react';
import { Document, Page, Text, View, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';
import { LoShuGridResult } from '../engine/modules/loshu';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    padding: 30,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
    color: '#3b28cc',
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 10,
    color: '#4f46e5',
  },
  text: {
    fontSize: 14,
    marginBottom: 5,
    color: '#374151',
  },
  grid: {
    display: 'flex',
    flexDirection: 'column',
    width: 200,
    alignSelf: 'center',
    border: '1px solid #000',
    marginTop: 20,
    marginBottom: 20,
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
  },
  cell: {
    width: 66,
    height: 66,
    border: '1px solid #000',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 20,
  }
});

const ReportDocument: React.FC<{ result: LoShuGridResult }> = ({ result }) => {
  const { psychic, destiny, kua, generatedNumbers } = result;
  
  const digitCounts: Record<number, number> = {
    1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0
  };
  generatedNumbers.forEach(n => {
    if (n >= 1 && n <= 9) digitCounts[n]++;
  });

  const getCellDisplay = (num: number) => {
    const count = digitCounts[num] || 0;
    return count > 0 ? String(num).repeat(count) : ' ';
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.title}>AstroNumeris: Cosmic Numerology Report</Text>
          
          <Text style={styles.subtitle}>Core Numbers</Text>
          <Text style={styles.text}>Psychic Number (Mulank): {psychic}</Text>
          <Text style={styles.text}>Destiny Number (Bhagyank): {destiny}</Text>
          <Text style={styles.text}>Kua Number: {kua}</Text>

          <Text style={[styles.subtitle, { marginTop: 20 }]}>Lo Shu Grid</Text>
          <View style={styles.grid}>
            <View style={styles.row}>
              <View style={styles.cell}><Text>{getCellDisplay(4)}</Text></View>
              <View style={styles.cell}><Text>{getCellDisplay(9)}</Text></View>
              <View style={styles.cell}><Text>{getCellDisplay(2)}</Text></View>
            </View>
            <View style={styles.row}>
              <View style={styles.cell}><Text>{getCellDisplay(3)}</Text></View>
              <View style={styles.cell}><Text>{getCellDisplay(5)}</Text></View>
              <View style={styles.cell}><Text>{getCellDisplay(7)}</Text></View>
            </View>
            <View style={styles.row}>
              <View style={styles.cell}><Text>{getCellDisplay(8)}</Text></View>
              <View style={styles.cell}><Text>{getCellDisplay(1)}</Text></View>
              <View style={styles.cell}><Text>{getCellDisplay(6)}</Text></View>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export const DownloadReportButton: React.FC<{ result: LoShuGridResult }> = ({ result }) => (
  <PDFDownloadLink 
    document={<ReportDocument result={result} />} 
    fileName="AstroNumeris-Report.pdf"
    className="mt-4 px-6 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-lg hover:from-emerald-400 hover:to-teal-400 transition-colors font-medium shadow-[0_0_15px_rgba(16,185,129,0.3)]"
  >
    {({ blob, url, loading, error }) => (loading ? 'Generating Report...' : 'Download Full PDF Report')}
  </PDFDownloadLink>
);
