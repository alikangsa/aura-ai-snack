import React, { useState, useRef } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Dimensions,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const PAGES = [
  {
    id: 'home',
    badge: 'MOBILE AGENT',
    title: 'Aura AI Workspace',
    subtitle: 'Geser ke kiri/kanan atau gunakan tab bawah untuk berpindah layar.',
    accent: '#00E5FF',
    secondaryAccent: '#9D4EDD',
  },
  {
    id: 'studio',
    badge: 'QUICK PROMPT',
    title: 'AI Action Runner',
    subtitle: 'Uji alur perintah cepat sebelum mengemas aplikasi menjadi APK.',
    accent: '#9D4EDD',
    secondaryAccent: '#00E5FF',
  },
  {
    id: 'build',
    badge: 'APK PIPELINE',
    title: 'Expo to Android APK',
    subtitle: 'Panduan ringkas ekspor dari Snack ke EAS Build profil preview.',
    accent: '#00E5FF',
    secondaryAccent: '#9D4EDD',
  },
];

export default function App() {
  const scrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [promptInput, setPromptInput] = useState('');
  const [logs, setLogs] = useState([
    'Siap di Snack Expo — layout responsif Android aktif.',
    'Geser layar secara horizontal untuk melihat halaman berikutnya.',
  ]);

  const handleSelectPage = (index) => {
    setActiveIndex(index);
    scrollRef.current?.scrollTo({ x: index * SCREEN_WIDTH, animated: true });
  };

  const handleMomentumScrollEnd = (event) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / SCREEN_WIDTH);
    if (index !== activeIndex && index >= 0 && index < PAGES.length) {
      setActiveIndex(index);
    }
  };

  const handleRunPrompt = () => {
    const trimmed = promptInput.trim();
    if (!trimmed) return;
    setLogs((prev) => [
      `[OK] Perintah dicatat: "${trimmed}"`,
      ...prev,
    ]);
    setPromptInput('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#090D16" />

      {/* Top Bar */}
      <View style={styles.topBar}>
        <View style={styles.brandRow}>
          <View style={styles.statusDot} />
          <Text style={styles.brandText}>AURA // EXPO SNACK</Text>
        </View>
        <View style={styles.pillBadge}>
          <Text style={styles.pillText}>
            {activeIndex + 1} / {PAGES.length}
          </Text>
        </View>
      </View>

      {/* Horizontal Swipe Viewport */}
      <KeyboardAvoidingView
        style={styles.flexOne}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          ref={scrollRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={handleMomentumScrollEnd}
          scrollEventThrottle={16}
          style={styles.flexOne}
        >
          {/* Halaman 1: Beranda */}
          <View style={[styles.page, { width: SCREEN_WIDTH }]}>
            <ScrollView
              contentContainerStyle={styles.pageScrollContent}
              showsVerticalScrollIndicator={false}
            >
              <View style={styles.heroCard}>
                <Text style={styles.tagCyan}>{PAGES[0].badge}</Text>
                <Text style={styles.heroTitle}>{PAGES[0].title}</Text>
                <Text style={styles.heroSubtitle}>{PAGES[0].subtitle}</Text>

                <View style={styles.statsRow}>
                  <View style={styles.statBox}>
                    <Text style={styles.statValueCyan}>100%</Text>
                    <Text style={styles.statLabel}>Viewport Fit</Text>
                  </View>
                  <View style={styles.statBoxPurple}>
                    <Text style={styles.statValuePurple}>APK</Text>
                    <Text style={styles.statLabel}>EAS Ready</Text>
                  </View>
                </View>
              </View>

              <View style={styles.infoCard}>
                <Text style={styles.cardHeading}>Alur Kerja Snack ke APK</Text>
                <Text style={styles.bodyText}>
                  1. Tempel kode ini di <Text style={styles.highlightCyan}>snack.expo.dev</Text> dan tes di HP dengan Expo Go.
                </Text>
                <Text style={styles.bodyText}>
                  2. Klik <Text style={styles.highlightPurple}>Download</Text> untuk mengunduh zip project.
                </Text>
                <Text style={styles.bodyText}>
                  3. Jalankan <Text style={styles.highlightCyan}>eas build -p android --profile preview</Text> untuk menghasilkan file <Text style={styles.highlightPurple}>.apk</Text>.
                </Text>
              </View>
            </ScrollView>
          </View>

          {/* Halaman 2: Studio Perintah Cepat */}
          <View style={[styles.page, { width: SCREEN_WIDTH }]}>
            <ScrollView
              contentContainerStyle={styles.pageScrollContent}
              showsVerticalScrollIndicator={false}
            >
              <View style={styles.heroCard}>
                <Text style={styles.tagPurple}>{PAGES[1].badge}</Text>
                <Text style={styles.heroTitle}>{PAGES[1].title}</Text>
                <Text style={styles.heroSubtitle}>{PAGES[1].subtitle}</Text>

                <TextInput
                  style={styles.input}
                  placeholder="Ketik ide fitur atau catatan build..."
                  placeholderTextColor="#6B7A99"
                  value={promptInput}
                  onChangeText={setPromptInput}
                  onSubmitEditing={handleRunPrompt}
                />

                <TouchableOpacity
                  style={styles.primaryButton}
                  onPress={handleRunPrompt}
                  activeOpacity={0.85}
                >
                  <Text style={styles.primaryButtonText}>Simpan ke Log Sesi</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.infoCard}>
                <Text style={styles.cardHeading}>Log Aktivitas</Text>
                {logs.map((item, idx) => (
                  <View key={`${idx}-${item}`} style={styles.logItem}>
                    <Text style={styles.logText}>{item}</Text>
                  </View>
                ))}
              </View>
            </ScrollView>
          </View>

          {/* Halaman 3: Konfigurasi APK */}
          <View style={[styles.page, { width: SCREEN_WIDTH }]}>
            <ScrollView
              contentContainerStyle={styles.pageScrollContent}
              showsVerticalScrollIndicator={false}
            >
              <View style={styles.heroCard}>
                <Text style={styles.tagCyan}>{PAGES[2].badge}</Text>
                <Text style={styles.heroTitle}>{PAGES[2].title}</Text>
                <Text style={styles.heroSubtitle}>{PAGES[2].subtitle}</Text>

                <View style={styles.codeBox}>
                  <Text style={styles.codeTitle}>eas.json (profil APK)</Text>
                  <Text style={styles.codeBlock}>
{`{
  "build": {
    "preview": {
      "android": {
        "buildType": "apk"
      }
    }
  }
}`}
                  </Text>
                </View>

                <TouchableOpacity
                  style={styles.secondaryButton}
                  onPress={() => handleSelectPage(0)}
                  activeOpacity={0.85}
                >
                  <Text style={styles.secondaryButtonText}>Kembali ke Beranda</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Bottom Navigation Bar */}
      <View style={styles.bottomBar}>
        {PAGES.map((page, index) => {
          const isActive = activeIndex === index;
          return (
            <TouchableOpacity
              key={page.id}
              style={[styles.tabItem, isActive && styles.tabItemActive]}
              onPress={() => handleSelectPage(index)}
              activeOpacity={0.8}
            >
              <Text style={[styles.tabText, isActive && styles.tabTextActive]}>
                {page.id.toUpperCase()}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flexOne: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#090D16',
    minHeight: SCREEN_HEIGHT * 0.9,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 229, 255, 0.16)',
    backgroundColor: '#0E1424',
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 9,
    height: 9,
    borderRadius: 5,
    backgroundColor: '#00E5FF',
    marginRight: 8,
  },
  brandText: {
    color: '#F4F7FF',
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 1.1,
  },
  pillBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    backgroundColor: 'rgba(157, 78, 221, 0.2)',
    borderWidth: 1,
    borderColor: 'rgba(157, 78, 221, 0.5)',
  },
  pillText: {
    color: '#D8B4FE',
    fontSize: 12,
    fontWeight: '600',
  },
  page: {
    flex: 1,
  },
  pageScrollContent: {
    padding: 18,
    paddingBottom: 32,
    gap: 16,
  },
  heroCard: {
    backgroundColor: '#121A2F',
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(0, 229, 255, 0.25)',
  },
  tagCyan: {
    color: '#00E5FF',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1.4,
    marginBottom: 8,
  },
  tagPurple: {
    color: '#C084FC',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1.4,
    marginBottom: 8,
  },
  heroTitle: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 8,
  },
  heroSubtitle: {
    color: '#9FB0D1',
    fontSize: 14,
    lineHeight: 21,
    marginBottom: 18,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  statBox: {
    flex: 1,
    backgroundColor: '#0B101D',
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: 'rgba(0, 229, 255, 0.25)',
  },
  statBoxPurple: {
    flex: 1,
    backgroundColor: '#0B101D',
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: 'rgba(157, 78, 221, 0.35)',
  },
  statValueCyan: {
    color: '#00E5FF',
    fontSize: 20,
    fontWeight: '800',
  },
  statValuePurple: {
    color: '#C084FC',
    fontSize: 20,
    fontWeight: '800',
  },
  statLabel: {
    color: '#8A9BBD',
    fontSize: 12,
    marginTop: 4,
  },
  infoCard: {
    backgroundColor: '#11182B',
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: 'rgba(157, 78, 221, 0.22)',
    gap: 10,
  },
  cardHeading: {
    color: '#F4F7FF',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },
  bodyText: {
    color: '#B8C6E3',
    fontSize: 14,
    lineHeight: 21,
  },
  highlightCyan: {
    color: '#00E5FF',
    fontWeight: '700',
  },
  highlightPurple: {
    color: '#C084FC',
    fontWeight: '700',
  },
  input: {
    backgroundColor: '#090E1A',
    color: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: 'rgba(0, 229, 255, 0.3)',
    fontSize: 14,
    marginBottom: 12,
  },
  primaryButton: {
    backgroundColor: '#00E5FF',
    borderRadius: 12,
    paddingVertical: 13,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#061018',
    fontSize: 14,
    fontWeight: '800',
  },
  secondaryButton: {
    backgroundColor: 'rgba(157, 78, 221, 0.22)',
    borderWidth: 1,
    borderColor: '#9D4EDD',
    borderRadius: 12,
    paddingVertical: 13,
    alignItems: 'center',
    marginTop: 14,
  },
  secondaryButtonText: {
    color: '#E9D5FF',
    fontSize: 14,
    fontWeight: '700',
  },
  logItem: {
    backgroundColor: '#0A0F1C',
    padding: 12,
    borderRadius: 10,
    borderLeftWidth: 3,
    borderLeftColor: '#00E5FF',
  },
  logText: {
    color: '#D5E0F5',
    fontSize: 13,
    lineHeight: 19,
  },
  codeBox: {
    backgroundColor: '#080C16',
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: 'rgba(157, 78, 221, 0.3)',
  },
  codeTitle: {
    color: '#00E5FF',
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 8,
  },
  codeBlock: {
    color: '#E2E8F0',
    fontSize: 12.5,
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
    lineHeight: 18,
  },
  bottomBar: {
    flexDirection: 'row',
    backgroundColor: '#0E1424',
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 229, 255, 0.16)',
    padding: 8,
    gap: 8,
  },
  tabItem: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  tabItemActive: {
    backgroundColor: 'rgba(0, 229, 255, 0.14)',
    borderWidth: 1,
    borderColor: 'rgba(0, 229, 255, 0.45)',
  },
  tabText: {
    color: '#7D8FB3',
    fontSize: 12,
    fontWeight: '700',
  },
  tabTextActive: {
    color: '#00E5FF',
  },
});