import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { User, Settings, Trophy, Target, Calendar, Bell, Shield, CircleHelp as HelpCircle, LogOut, CreditCard as Edit } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';

export default function ProfileScreen() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [practiceReminders, setPracticeReminders] = useState(true);

  const achievements = [
    { title: 'First Steps', description: 'Completed your first lesson', icon: '🎯', earned: true },
    { title: 'Week Warrior', description: '7-day learning streak', icon: '🔥', earned: true },
    { title: 'Sign Master', description: 'Learned 100 signs', icon: '🏆', earned: true },
    { title: 'Perfect Practice', description: '95% accuracy in practice', icon: '⭐', earned: false },
    { title: 'Community Helper', description: 'Helped 10 learners', icon: '🤝', earned: false },
    { title: 'Monthly Champion', description: '30-day learning streak', icon: '👑', earned: false }
  ];

  const stats = [
    { label: 'Signs Learned', value: '245', icon: Target },
    { label: 'Practice Hours', value: '47', icon: Calendar },
    { label: 'Accuracy Rate', value: '89%', icon: Trophy },
    { label: 'Streak Days', value: '12', icon: Calendar }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <LinearGradient
          colors={['#4A90E2', '#357ABD']}
          style={styles.profileHeader}
        >
          <View style={styles.profileInfo}>
            <Image 
              source={{ uri: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200' }}
              style={styles.profileImage}
            />
            <View style={styles.profileDetails}>
              <Text style={styles.profileName}>Sarah Johnson</Text>
              <Text style={styles.profileLevel}>Intermediate Learner</Text>
              <Text style={styles.profileJoined}>Joined 3 months ago</Text>
            </View>
            <TouchableOpacity style={styles.editButton}>
              <Edit size={20} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
          
          <View style={styles.profileStats}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>245</Text>
              <Text style={styles.statLabel}>Signs</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>12</Text>
              <Text style={styles.statLabel}>Streak</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>89%</Text>
              <Text style={styles.statLabel}>Accuracy</Text>
            </View>
          </View>
        </LinearGradient>

        {/* Learning Progress */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Learning Progress</Text>
          <View style={styles.progressCard}>
            <View style={styles.progressHeader}>
              <Text style={styles.progressTitle}>Current Level: Intermediate</Text>
              <Text style={styles.progressPercentage}>67%</Text>
            </View>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: '67%' }]} />
            </View>
            <Text style={styles.progressSubtext}>78 more signs to reach Advanced level</Text>
          </View>
        </View>

        {/* Statistics Grid */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your Statistics</Text>
          <View style={styles.statsGrid}>
            {stats.map((stat, index) => (
              <View key={index} style={styles.statCard}>
                <stat.icon size={24} color="#4A90E2" />
                <Text style={styles.statValue}>{stat.value}</Text>
                <Text style={styles.statLabel}>{stat.label}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Achievements */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Achievements</Text>
          <View style={styles.achievementsGrid}>
            {achievements.map((achievement, index) => (
              <View key={index} style={[
                styles.achievementCard,
                !achievement.earned && styles.achievementCardLocked
              ]}>
                <Text style={[
                  styles.achievementIcon,
                  !achievement.earned && styles.achievementIconLocked
                ]}>
                  {achievement.earned ? achievement.icon : '🔒'}
                </Text>
                <Text style={[
                  styles.achievementTitle,
                  !achievement.earned && styles.achievementTitleLocked
                ]}>
                  {achievement.title}
                </Text>
                <Text style={[
                  styles.achievementDescription,
                  !achievement.earned && styles.achievementDescriptionLocked
                ]}>
                  {achievement.description}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Settings</Text>
          <View style={styles.settingsCard}>
            <View style={styles.settingItem}>
              <View style={styles.settingInfo}>
                <Bell size={20} color="#4A90E2" />
                <Text style={styles.settingLabel}>Notifications</Text>
              </View>
              <Switch
                value={notificationsEnabled}
                onValueChange={setNotificationsEnabled}
                trackColor={{ false: '#E5E5EA', true: '#4A90E2' }}
                thumbColor="#FFFFFF"
              />
            </View>
            
            <View style={styles.settingItem}>
              <View style={styles.settingInfo}>
                <Calendar size={20} color="#4A90E2" />
                <Text style={styles.settingLabel}>Practice Reminders</Text>
              </View>
              <Switch
                value={practiceReminders}
                onValueChange={setPracticeReminders}
                trackColor={{ false: '#E5E5EA', true: '#4A90E2' }}
                thumbColor="#FFFFFF"
              />
            </View>

            <TouchableOpacity style={styles.settingItem}>
              <View style={styles.settingInfo}>
                <Settings size={20} color="#4A90E2" />
                <Text style={styles.settingLabel}>General Settings</Text>
              </View>
              <Text style={styles.settingArrow}>›</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.settingItem}>
              <View style={styles.settingInfo}>
                <Shield size={20} color="#4A90E2" />
                <Text style={styles.settingLabel}>Privacy & Security</Text>
              </View>
              <Text style={styles.settingArrow}>›</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.settingItem}>
              <View style={styles.settingInfo}>
                <HelpCircle size={20} color="#4A90E2" />
                <Text style={styles.settingLabel}>Help & Support</Text>
              </View>
              <Text style={styles.settingArrow}>›</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Learning Goals */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Learning Goals</Text>
          <View style={styles.goalsCard}>
            <View style={styles.goalItem}>
              <View style={styles.goalInfo}>
                <Text style={styles.goalTitle}>Daily Practice</Text>
                <Text style={styles.goalDescription}>Practice for 15 minutes daily</Text>
              </View>
              <View style={styles.goalProgress}>
                <Text style={styles.goalProgressText}>12/15 min</Text>
                <View style={styles.goalProgressBar}>
                  <View style={[styles.goalProgressFill, { width: '80%' }]} />
                </View>
              </View>
            </View>

            <View style={styles.goalItem}>
              <View style={styles.goalInfo}>
                <Text style={styles.goalTitle}>Weekly Signs</Text>
                <Text style={styles.goalDescription}>Learn 10 new signs this week</Text>
              </View>
              <View style={styles.goalProgress}>
                <Text style={styles.goalProgressText}>7/10 signs</Text>
                <View style={styles.goalProgressBar}>
                  <View style={[styles.goalProgressFill, { width: '70%' }]} />
                </View>
              </View>
            </View>

            <View style={styles.goalItem}>
              <View style={styles.goalInfo}>
                <Text style={styles.goalTitle}>Accuracy Goal</Text>
                <Text style={styles.goalDescription}>Maintain 90% accuracy</Text>
              </View>
              <View style={styles.goalProgress}>
                <Text style={styles.goalProgressText}>89%</Text>
                <View style={styles.goalProgressBar}>
                  <View style={[styles.goalProgressFill, { width: '89%' }]} />
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Sign Out */}
        <View style={styles.section}>
          <TouchableOpacity style={styles.signOutButton}>
            <LogOut size={20} color="#FF3B30" />
            <Text style={styles.signOutText}>Sign Out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  profileHeader: {
    padding: 20,
    paddingTop: 40,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
  },
  profileDetails: {
    flex: 1,
  },
  profileName: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    color: '#FFFFFF',
    marginBottom: 4,
  },
  profileLevel: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 2,
  },
  profileJoined: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.7)',
  },
  editButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 20,
    padding: 8,
  },
  profileStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    color: '#FFFFFF',
  },
  statLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 4,
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
    color: '#1D1D1F',
    marginBottom: 16,
  },
  progressCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  progressTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#1D1D1F',
  },
  progressPercentage: {
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    color: '#4A90E2',
  },
  progressBar: {
    height: 8,
    backgroundColor: '#E5E5EA',
    borderRadius: 4,
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4A90E2',
    borderRadius: 4,
  },
  progressSubtext: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#8E8E93',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  statCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  statValue: {
    fontFamily: 'Poppins-Bold',
    fontSize: 20,
    color: '#1D1D1F',
    marginTop: 8,
    marginBottom: 4,
  },
  achievementsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  achievementCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  achievementCardLocked: {
    backgroundColor: '#F5F5F5',
  },
  achievementIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  achievementIconLocked: {
    opacity: 0.5,
  },
  achievementTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    color: '#1D1D1F',
    textAlign: 'center',
    marginBottom: 4,
  },
  achievementTitleLocked: {
    color: '#8E8E93',
  },
  achievementDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 11,
    color: '#8E8E93',
    textAlign: 'center',
    lineHeight: 16,
  },
  achievementDescriptionLocked: {
    color: '#C7C7CC',
  },
  settingsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F7',
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  settingLabel: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#1D1D1F',
  },
  settingArrow: {
    fontFamily: 'Inter-Regular',
    fontSize: 20,
    color: '#C7C7CC',
  },
  goalsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  goalItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F7',
  },
  goalInfo: {
    flex: 1,
    marginRight: 16,
  },
  goalTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#1D1D1F',
    marginBottom: 4,
  },
  goalDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#8E8E93',
  },
  goalProgress: {
    alignItems: 'flex-end',
    minWidth: 80,
  },
  goalProgressText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: '#4A90E2',
    marginBottom: 4,
  },
  goalProgressBar: {
    width: 60,
    height: 4,
    backgroundColor: '#E5E5EA',
    borderRadius: 2,
  },
  goalProgressFill: {
    height: '100%',
    backgroundColor: '#4A90E2',
    borderRadius: 2,
  },
  signOutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    gap: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  signOutText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#FF3B30',
  },
});