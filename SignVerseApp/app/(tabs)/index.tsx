import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Play, Trophy, Target, Clock, TrendingUp } from 'lucide-react-native';

export default function HomeScreen() {
  const dailyProgress = 65;
  const weeklyStreak = 7;
  const totalSigns = 245;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Image 
              source={{ uri: '/assets/images/0mY--tYd.jpg' }} 
              style={styles.logo}
            />
            <Text style={styles.appName}>SignVerse</Text>
          </View>
          <Text style={styles.greeting}>Welcome back, Sarah!</Text>
        </View>

        {/* Daily Progress Card */}
        <LinearGradient
          colors={['#4A90E2', '#357ABD']}
          style={styles.progressCard}
        >
          <View style={styles.progressHeader}>
            <Text style={styles.progressTitle}>Today's Progress</Text>
            <Text style={styles.progressPercentage}>{dailyProgress}%</Text>
          </View>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${dailyProgress}%` }]} />
          </View>
          <Text style={styles.progressSubtext}>Great job! You're almost there!</Text>
        </LinearGradient>

        {/* Stats Row */}
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Trophy size={24} color="#FFD700" />
            <Text style={styles.statNumber}>{weeklyStreak}</Text>
            <Text style={styles.statLabel}>Day Streak</Text>
          </View>
          <View style={styles.statCard}>
            <Target size={24} color="#4A90E2" />
            <Text style={styles.statNumber}>{totalSigns}</Text>
            <Text style={styles.statLabel}>Signs Learned</Text>
          </View>
          <View style={styles.statCard}>
            <TrendingUp size={24} color="#34C759" />
            <Text style={styles.statNumber}>92%</Text>
            <Text style={styles.statLabel}>Accuracy</Text>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Start</Text>
          <View style={styles.quickActions}>
            <TouchableOpacity style={styles.actionCard}>
              <LinearGradient
                colors={['#FF6B6B', '#FF5252']}
                style={styles.actionGradient}
              >
                <Play size={32} color="#FFFFFF" />
                <Text style={styles.actionTitle}>Continue Lesson</Text>
                <Text style={styles.actionSubtitle}>Basic Greetings</Text>
              </LinearGradient>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.actionCard}>
              <LinearGradient
                colors={['#4ECDC4', '#44A08D']}
                style={styles.actionGradient}
              >
                <Clock size={32} color="#FFFFFF" />
                <Text style={styles.actionTitle}>Daily Challenge</Text>
                <Text style={styles.actionSubtitle}>5 min practice</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>

        {/* Recent Lessons */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Lessons</Text>
          <View style={styles.lessonsList}>
            {recentLessons.map((lesson, index) => (
              <TouchableOpacity key={index} style={styles.lessonCard}>
                <View style={styles.lessonThumbnail}>
                  <Image 
                    source={{ uri: lesson.thumbnail }} 
                    style={styles.thumbnailImage}
                  />
                  <View style={styles.playOverlay}>
                    <Play size={16} color="#FFFFFF" />
                  </View>
                </View>
                <View style={styles.lessonInfo}>
                  <Text style={styles.lessonTitle}>{lesson.title}</Text>
                  <Text style={styles.lessonCategory}>{lesson.category}</Text>
                  <View style={styles.lessonProgress}>
                    <View style={styles.progressBarSmall}>
                      <View style={[styles.progressFillSmall, { width: `${lesson.progress}%` }]} />
                    </View>
                    <Text style={styles.progressText}>{lesson.progress}%</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Weekly Challenge */}
        <LinearGradient
          colors={['#667eea', '#764ba2']}
          style={styles.challengeCard}
        >
          <Text style={styles.challengeTitle}>Weekly Challenge</Text>
          <Text style={styles.challengeDescription}>
            Learn 20 new signs this week and earn the "Sign Master" badge!
          </Text>
          <View style={styles.challengeProgress}>
            <Text style={styles.challengeProgressText}>12/20 signs completed</Text>
            <View style={styles.challengeProgressBar}>
              <View style={[styles.challengeProgressFill, { width: '60%' }]} />
            </View>
          </View>
        </LinearGradient>
      </ScrollView>
    </SafeAreaView>
  );
}

const recentLessons = [
  {
    title: 'Basic Greetings',
    category: 'Beginner',
    progress: 80,
    thumbnail: 'https://images.pexels.com/photos/5699456/pexels-photo-5699456.jpeg?auto=compress&cs=tinysrgb&w=300'
  },
  {
    title: 'Family Members',
    category: 'Beginner',
    progress: 45,
    thumbnail: 'https://images.pexels.com/photos/1128318/pexels-photo-1128318.jpeg?auto=compress&cs=tinysrgb&w=300'
  },
  {
    title: 'Colors & Numbers',
    category: 'Intermediate',
    progress: 25,
    thumbnail: 'https://images.pexels.com/photos/1148998/pexels-photo-1148998.jpeg?auto=compress&cs=tinysrgb&w=300'
  }
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    padding: 20,
    paddingTop: 10,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  logo: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 8,
  },
  appName: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    color: '#4A90E2',
  },
  greeting: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#8E8E93',
  },
  progressCard: {
    margin: 20,
    padding: 20,
    borderRadius: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  progressTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: '#FFFFFF',
  },
  progressPercentage: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    color: '#FFFFFF',
  },
  progressBar: {
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 4,
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 4,
  },
  progressSubtext: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  statsRow: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginHorizontal: 4,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  statNumber: {
    fontFamily: 'Poppins-Bold',
    fontSize: 20,
    color: '#1D1D1F',
    marginTop: 8,
  },
  statLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#8E8E93',
    textAlign: 'center',
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
    color: '#1D1D1F',
    marginBottom: 16,
  },
  quickActions: {
    flexDirection: 'row',
    gap: 12,
  },
  actionCard: {
    flex: 1,
    borderRadius: 16,
    overflow: 'hidden',
  },
  actionGradient: {
    padding: 20,
    alignItems: 'center',
  },
  actionTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
    marginTop: 8,
  },
  actionSubtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 4,
  },
  lessonsList: {
    gap: 12,
  },
  lessonCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    flexDirection: 'row',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  lessonThumbnail: {
    width: 60,
    height: 60,
    borderRadius: 8,
    overflow: 'hidden',
    position: 'relative',
  },
  thumbnailImage: {
    width: '100%',
    height: '100%',
  },
  playOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  lessonInfo: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'space-between',
  },
  lessonTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#1D1D1F',
  },
  lessonCategory: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#8E8E93',
  },
  lessonProgress: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  progressBarSmall: {
    flex: 1,
    height: 4,
    backgroundColor: '#E5E5EA',
    borderRadius: 2,
  },
  progressFillSmall: {
    height: '100%',
    backgroundColor: '#4A90E2',
    borderRadius: 2,
  },
  progressText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: '#4A90E2',
  },
  challengeCard: {
    margin: 20,
    padding: 20,
    borderRadius: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  challengeTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 20,
    color: '#FFFFFF',
    marginBottom: 8,
  },
  challengeDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 16,
    lineHeight: 20,
  },
  challengeProgress: {
    gap: 8,
  },
  challengeProgressText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#FFFFFF',
  },
  challengeProgressBar: {
    height: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 3,
  },
  challengeProgressFill: {
    height: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 3,
  },
});