import React from 'react';
import { Document, Page, Text, View, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';
import type { LoShuGridResult } from '../engine/modules/loshu';
import type { InputProfile, ExpandedProfile } from '../engine/core/types';
import { getNumberDetail, numerologyData } from '../engine/data';

const cosmicDark = '#050510';
const cosmicPurple = '#a855f7';
const cosmicIndigo = '#6366f1';
const cosmicCyan = '#22d3ee';
const cosmicText = '#e5e7eb';
const cosmicMuted = '#9ca3af';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: cosmicDark,
    padding: 40,
  },
  header: {
    marginBottom: 30,
    borderBottom: `2px solid ${cosmicPurple}`,
    paddingBottom: 15,
  },
  logo: {
    fontSize: 32,
    color: cosmicCyan,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: cosmicIndigo,
    textAlign: 'center',
  },
  section: {
    marginBottom: 25,
    padding: 15,
    backgroundColor: '#111122',
    borderRadius: 8,
    border: `1px solid ${cosmicIndigo}`,
  },
  sectionTitle: {
    fontSize: 18,
    color: cosmicPurple,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 11,
    color: cosmicText,
    marginBottom: 6,
    lineHeight: 1.5,
  },
  bold: {
    color: cosmicCyan,
  },
  gridContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: 200,
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 10,
    border: `2px solid ${cosmicPurple}`,
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
  },
  cell: {
    width: 66,
    height: 66,
    border: `1px solid ${cosmicIndigo}`,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1a1a2e',
  },
  cellText: {
    fontSize: 24,
    color: cosmicCyan,
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 40,
    right: 40,
    textAlign: 'center',
    color: cosmicMuted,
    fontSize: 10,
    borderTop: `1px solid ${cosmicIndigo}`,
    paddingTop: 10,
  }
});

interface ReportProps {
  profile: InputProfile;
  expandedProfile: ExpandedProfile;
  grid: LoShuGridResult;
}

const ReportDocument: React.FC<ReportProps> = ({ profile, expandedProfile, grid }) => {
  const { psychic, destiny, kua, generatedNumbers } = grid;
  
  const digitCounts: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0 };
  generatedNumbers.forEach(n => { if (n >= 1 && n <= 9) digitCounts[n]++; });

  const getCellDisplay = (num: number) => {
    const count = digitCounts[num] || 0;
    return count > 0 ? String(num).repeat(count) : ' ';
  };

  const psychicDetail = getNumberDetail(psychic);
  const destinyDetail = getNumberDetail(destiny);

  return (
    <Document>
      {/* Page 1: Core Profile & Grid */}
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.logo}>✦ AstroNumeris ✦</Text>
          <Text style={styles.subtitle}>Cosmic Numerology Report for {profile.name}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Birth Details</Text>
          <Text style={styles.text}>Name: <Text style={styles.bold}>{profile.name}</Text></Text>
          <Text style={styles.text}>Date of Birth: <Text style={styles.bold}>{new Date(profile.dob).toDateString()}</Text></Text>
          <Text style={styles.text}>Gender: <Text style={styles.bold}>{profile.gender}</Text></Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Core Numbers</Text>
          <Text style={styles.text}>Psychic Number (Mulank): <Text style={styles.bold}>{psychic}</Text> - Ruled by {psychicDetail?.planet}</Text>
          <Text style={styles.text}>Destiny Number (Bhagyank): <Text style={styles.bold}>{destiny}</Text> - Ruled by {destinyDetail?.planet}</Text>
          <Text style={styles.text}>Kua Number: <Text style={styles.bold}>{kua}</Text></Text>
          
          {expandedProfile.masterNumbers.length > 0 && (
            <Text style={styles.text}>Master Numbers: <Text style={styles.bold}>{expandedProfile.masterNumbers.join(', ')}</Text></Text>
          )}
          {expandedProfile.karmicDebt > 0 && (
            <Text style={styles.text}>Karmic Debt Number: <Text style={styles.bold}>{expandedProfile.karmicDebt}</Text></Text>
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Lo Shu Grid</Text>
          <View style={styles.gridContainer}>
            <View style={styles.row}>
              <View style={styles.cell}><Text style={styles.cellText}>{getCellDisplay(4)}</Text></View>
              <View style={styles.cell}><Text style={styles.cellText}>{getCellDisplay(9)}</Text></View>
              <View style={styles.cell}><Text style={styles.cellText}>{getCellDisplay(2)}</Text></View>
            </View>
            <View style={styles.row}>
              <View style={styles.cell}><Text style={styles.cellText}>{getCellDisplay(3)}</Text></View>
              <View style={styles.cell}><Text style={styles.cellText}>{getCellDisplay(5)}</Text></View>
              <View style={styles.cell}><Text style={styles.cellText}>{getCellDisplay(7)}</Text></View>
            </View>
            <View style={styles.row}>
              <View style={styles.cell}><Text style={styles.cellText}>{getCellDisplay(8)}</Text></View>
              <View style={styles.cell}><Text style={styles.cellText}>{getCellDisplay(1)}</Text></View>
              <View style={styles.cell}><Text style={styles.cellText}>{getCellDisplay(6)}</Text></View>
            </View>
          </View>
        </View>

        <Text style={styles.footer} render={({ pageNumber, totalPages }) => (`Page ${pageNumber} of ${totalPages}`)} fixed />
      </Page>

      {/* Page 2: Name Analysis & Life Cycles */}
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.logo}>✦ AstroNumeris ✦</Text>
          <Text style={styles.subtitle}>Deep Analysis</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Name Vibrations</Text>
          {expandedProfile.nameAnalysis.map((analysis, i) => (
            <View key={i} style={{ marginBottom: 10 }}>
              <Text style={[styles.text, { color: cosmicPurple, fontWeight: 'bold' }]}>
                {i === 0 ? "Full Name Analysis" : `Word: ${analysis.name}`}
              </Text>
              <Text style={styles.text}>Soul Urge (Vowels): <Text style={styles.bold}>{analysis.soulUrge}</Text></Text>
              <Text style={styles.text}>Personality (Consonants): <Text style={styles.bold}>{analysis.personality}</Text></Text>
              <Text style={styles.text}>Total Expression: <Text style={styles.bold}>{analysis.destiny}</Text></Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Challenge Cycles (Pinnacles)</Text>
          <Text style={styles.text}>Phase 1 (Ages 0 - {expandedProfile.challengeCycles.firstCycleAgeUpto}): <Text style={styles.bold}>{expandedProfile.challengeCycles.firstCycle}</Text></Text>
          <Text style={styles.text}>Phase 2 (Ages {expandedProfile.challengeCycles.firstCycleAgeUpto} - {expandedProfile.challengeCycles.secondCycleAgeUpto}): <Text style={styles.bold}>{expandedProfile.challengeCycles.secondCycle}</Text></Text>
          <Text style={styles.text}>Phase 3 (Ages {expandedProfile.challengeCycles.secondCycleAgeUpto} - {expandedProfile.challengeCycles.thirdCycleAgeUpto}): <Text style={styles.bold}>{expandedProfile.challengeCycles.thirdCycle}</Text></Text>
          <Text style={styles.text}>Phase 4 (Ages {expandedProfile.challengeCycles.fourthCycleAgeFrom} onwards): <Text style={styles.bold}>{expandedProfile.challengeCycles.fourthCycle}</Text></Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Missing Energies & Remedies</Text>
          {expandedProfile.missingNumbers.length === 0 ? (
            <Text style={styles.text}>You have no missing energies in your core grid.</Text>
          ) : (
            expandedProfile.missingNumbers.map(num => (
              <Text key={num} style={styles.text}>
                <Text style={styles.bold}>Missing {num}: </Text>
                {numerologyData.missingNumbers[num.toString() as keyof typeof numerologyData.missingNumbers]}
              </Text>
            ))
          )}
        </View>

        <Text style={styles.footer} render={({ pageNumber, totalPages }) => (`Page ${pageNumber} of ${totalPages}`)} fixed />
        <Text style={styles.footer} render={({ pageNumber, totalPages }) => (`Page ${pageNumber} of ${totalPages}`)} fixed />
      </Page>

      {/* Page 3: Planes & Yogs */}
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.logo}>✦ AstroNumeris ✦</Text>
          <Text style={styles.subtitle}>Advanced Analysis</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Planes & Yogs</Text>
          {expandedProfile.planes.length === 0 ? (
            <Text style={styles.text}>No specific planes formed in the core grid.</Text>
          ) : (
            expandedProfile.planes.map(p => {
              const desc = numerologyData.planes[p as keyof typeof numerologyData.planes];
              return (
                <View key={p} style={{ marginBottom: 10 }}>
                  <Text style={[styles.text, { color: p.includes('Yog') ? cosmicCyan : cosmicPurple, fontWeight: 'bold' }]}>
                    {p} {p.includes('Yog') ? '✦' : ''}
                  </Text>
                  <Text style={styles.text}>{desc?.description}</Text>
                </View>
              );
            })
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Driver & Conductor Synergy (81 Combos)</Text>
          {(() => {
            const comboInfo = (numerologyData as any).eightOneCombinations?.[psychic]?.[destiny];
            if (comboInfo) {
              return (
                <View>
                  <Text style={styles.text}>Driver {psychic} - Conductor {destiny}</Text>
                  <Text style={styles.text}>Synergy Rating: <Text style={styles.bold}>{comboInfo.synergyRating} / 5</Text></Text>
                  <Text style={styles.text}>{comboInfo.traits}</Text>
                </View>
              );
            }
            return <Text style={styles.text}>Detailed synergy information not available.</Text>;
          })()}
        </View>

        <Text style={styles.footer} render={({ pageNumber, totalPages }) => (`Page ${pageNumber} of ${totalPages}`)} fixed />
      </Page>
    </Document>
  );
};

export const DownloadReportButton: React.FC<ReportProps> = (props) => (
  <PDFDownloadLink 
    document={<ReportDocument {...props} />} 
    fileName="AstroNumeris-Report.pdf"
    className="mt-4 px-6 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-lg hover:from-emerald-400 hover:to-teal-400 transition-colors font-medium shadow-[0_0_15px_rgba(16,185,129,0.3)]"
  >
    {({ loading }) => (loading ? 'Generating Cosmic Report...' : 'Download Full PDF Report')}
  </PDFDownloadLink>
);
