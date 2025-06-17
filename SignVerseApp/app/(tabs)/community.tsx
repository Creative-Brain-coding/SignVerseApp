import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MessageCircle, Heart, Share, Trophy, Calendar, Users, Search, Plus } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';

export default function CommunityScreen() {
  const [activeTab, setActiveTab] = useState('discussions');
  const [searchQuery, setSearchQuery] = useState('');

  const tabs = [
    { id: 'discussions', label: 'Discussions', icon: MessageCircle },
    { id: 'challenges', label: 'Challenges', icon: Trophy },
    { id: 'events', label: 'Events', icon: Calendar }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Community</Text>
          <Text style={styles.subtitle}>Connect with fellow sign language learners</Text>
        </View>

        {/* Community Stats */}
        <LinearGradient
          colors={['#667eea', '#764ba2']}
          style={styles.statsCard}
        >
          <Text style={styles.statsTitle}>SignVerse Community</Text>
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Users size={24} color="#FFFFFF" />
              <Text style={styles.statNumber}>12.5K</Text>
              <Text style={styles.statLabel}>Members</Text>
            </View>
            <View style={styles.statItem}>
              <MessageCircle size={24} color="#FFFFFF" />
              <Text style={styles.statNumber}>3.2K</Text>
              <Text style={styles.statLabel}>Discussions</Text>
            </View>
            <View style={styles.statItem}>
              <Trophy size={24} color="#FFFFFF" />
              <Text style={styles.statNumber}>156</Text>
              <Text style={styles.statLabel}>Challenges</Text>
            </View>
          </View>
        </LinearGradient>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Search size={20} color="#8E8E93" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search discussions, challenges..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholderTextColor="#8E8E93"
            />
          </View>
          <TouchableOpacity style={styles.createButton}>
            <Plus size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        {/* Tabs */}
        <View style={styles.tabsContainer}>
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab.id}
              style={[styles.tab, activeTab === tab.id && styles.tabActive]}
              onPress={() => setActiveTab(tab.id)}
            >
              <tab.icon size={20} color={activeTab === tab.id ? '#4A90E2' : '#8E8E93'} />
              <Text style={[
                styles.tabText,
                activeTab === tab.id && styles.tabTextActive
              ]}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Content based on active tab */}
        {activeTab === 'discussions' && (
          <View style={styles.content}>
            {/* Featured Discussion */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Featured Discussion</Text>
              <TouchableOpacity style={styles.featuredPost}>
                <LinearGradient
                  colors={['#FF6B6B', '#FF8E53']}
                  style={styles.featuredGradient}
                >
                  <Text style={styles.featuredTitle}>Tips for Learning ASL Faster</Text>
                  <Text style={styles.featuredDescription}>
                    Share your best strategies and techniques for accelerating your sign language learning journey.
                  </Text>
                  <View style={styles.featuredStats}>
                    <View style={styles.featuredStat}>
                      <MessageCircle size={16} color="rgba(255, 255, 255, 0.8)" />
                      <Text style={styles.featuredStatText}>127 replies</Text>
                    </View>
                    <View style={styles.featuredStat}>
                      <Heart size={16} color="rgba(255, 255, 255, 0.8)" />
                      <Text style={styles.featuredStatText}>89 likes</Text>
                    </View>
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            </View>

            {/* Recent Discussions */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Recent Discussions</Text>
              <View style={styles.discussionsList}>
                {discussions.map((discussion, index) => (
                  <TouchableOpacity key={index} style={styles.discussionCard}>
                    <View style={styles.discussionHeader}>
                      <Image source={{ uri: discussion.avatar }} style={styles.avatar} />
                      <View style={styles.discussionMeta}>
                        <Text style={styles.username}>{discussion.username}</Text>
                        <Text style={styles.timestamp}>{discussion.timestamp}</Text>
                      </View>
                    </View>
                    <Text style={styles.discussionTitle}>{discussion.title}</Text>
                    <Text style={styles.discussionPreview}>{discussion.preview}</Text>
                    <View style={styles.discussionFooter}>
                      <View style={styles.discussionStats}>
                        <View style={styles.discussionStat}>
                          <MessageCircle size={16} color="#8E8E93" />
                          <Text style={styles.discussionStatText}>{discussion.replies}</Text>
                        </View>
                        <View style={styles.discussionStat}>
                          <Heart size={16} color="#8E8E93" />
                          <Text style={styles.discussionStatText}>{discussion.likes}</Text>
                        </View>
                      </View>
                      <TouchableOpacity style={styles.shareButton}>
                        <Share size={16} color="#8E8E93" />
                      </TouchableOpacity>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>
        )}

        {activeTab === 'challenges' && (
          <View style={styles.content}>
            {/* Active Challenge */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>This Week's Challenge</Text>
              <LinearGradient
                colors={['#4ECDC4', '#44A08D']}
                style={styles.challengeCard}
              >
                <View style={styles.challengeHeader}>
                  <Trophy size={32} color="#FFFFFF" />
                  <Text style={styles.challengeTitle}>Sign of the Day</Text>
                </View>
                <Text style={styles.challengeDescription}>
                  Learn and practice one new sign every day for 7 days straight!
                </Text>
                <View style={styles.challengeProgress}>
                  <Text style={styles.challengeProgressText}>Day 4 of 7</Text>
                  <View style={styles.challengeProgressBar}>
                    <View style={[styles.challengeProgressFill, { width: '57%' }]} />
                  </View>
                </View>
                <View style={styles.challengeStats}>
                  <Text style={styles.challengeParticipants}>2,847 participants</Text>
                  <Text style={styles.challengeReward}>🏆 Badge Reward</Text>
                </View>
              </LinearGradient>
            </View>

            {/* Upcoming Challenges */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Upcoming Challenges</Text>
              <View style={styles.challengesList}>
                {upcomingChallenges.map((challenge, index) => (
                  <TouchableOpacity key={index} style={styles.upcomingChallengeCard}>
                    <View style={styles.challengeBadge}>
                      <Text style={styles.challengeBadgeText}>{challenge.type}</Text>
                    </View>
                    <Text style={styles.upcomingChallengeTitle}>{challenge.title}</Text>
                    <Text style={styles.upcomingChallengeDescription}>{challenge.description}</Text>
                    <View style={styles.upcomingChallengeMeta}>
                      <Text style={styles.challengeStartDate}>Starts {challenge.startDate}</Text>
                      <Text style={styles.challengeDuration}>{challenge.duration}</Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>
        )}

        {activeTab === 'events' && (
          <View style={styles.content}>
            {/* Upcoming Events */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Upcoming Events</Text>
              <View style={styles.eventsList}>
                {events.map((event, index) => (
                  <TouchableOpacity key={index} style={styles.eventCard}>
                    <View style={styles.eventDate}>
                      <Text style={styles.eventDay}>{event.day}</Text>
                      <Text style={styles.eventMonth}>{event.month}</Text>
                    </View>
                    <View style={styles.eventInfo}>
                      <Text style={styles.eventTitle}>{event.title}</Text>
                      <Text style={styles.eventDescription}>{event.description}</Text>
                      <View style={styles.eventMeta}>
                        <Text style={styles.eventTime}>{event.time}</Text>
                        <Text style={styles.eventAttendees}>{event.attendees} attending</Text>
                      </View>
                    </View>
                    <TouchableOpacity style={styles.joinButton}>
                      <Text style={styles.joinButtonText}>Join</Text>
                    </TouchableOpacity>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const discussions = [
  {
    username: 'Sarah_ASL',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100',
    timestamp: '2 hours ago',
    title: 'Best apps for practicing fingerspelling?',
    preview: 'I\'m looking for recommendations for apps that can help me improve my fingerspelling speed and accuracy...',
    replies: 23,
    likes: 45
  },
  {
    username: 'DeafCommunity',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100',
    timestamp: '5 hours ago',
    title: 'Cultural aspects of sign language',
    preview: 'Let\'s discuss the importance of understanding Deaf culture when learning ASL...',
    replies: 67,
    likes: 92
  },
  {
    username: 'ASL_Teacher',
    avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=100',
    timestamp: '1 day ago',
    title: 'Common mistakes beginners make',
    preview: 'As an ASL instructor, I\'ve noticed these frequent errors that new learners make...',
    replies: 156,
    likes: 234
  }
];

const upcomingChallenges = [
  {
    type: 'Weekly',
    title: 'Emotion Expression Challenge',
    description: 'Master 10 different emotion signs with proper facial expressions',
    startDate: 'Monday',
    duration: '7 days'
  },
  {
    type: 'Monthly',
    title: 'Storytelling Challenge',
    description: 'Tell a complete story using only sign language',
    startDate: 'Next week',
    duration: '30 days'
  },
  {
    type: 'Community',
    title: 'Sign Chain Challenge',
    description: 'Create a collaborative story where each person adds one sign',
    startDate: 'Friday',
    duration: '14 days'
  }
];

const events = [
  {
    day: '15',
    month: 'DEC',
    title: 'Virtual ASL Meetup',
    description: 'Practice conversational ASL with other learners',
    time: '7:00 PM EST',
    attendees: 47
  },
  {
    day: '18',
    month: 'DEC',
    title: 'Deaf Culture Workshop',
    description: 'Learn about Deaf history and community',
    time: '2:00 PM EST',
    attendees: 23
  },
  {
    day: '22',
    month: 'DEC',
    title: 'Holiday Signs Workshop',
    description: 'Learn signs for holiday celebrations',
    time: '6:00 PM EST',
    attendees: 89
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
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 28,
    color: '#1D1D1F',
    marginBottom: 4,
  },
  subtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#8E8E93',
  },
  statsCard: {
    margin: 20,
    padding: 20,
    borderRadius: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  statsTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 20,
    color: '#FFFFFF',
    marginBottom: 16,
    textAlign: 'center',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    color: '#FFFFFF',
    marginTop: 8,
  },
  statLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 4,
  },
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
    gap: 12,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#1D1D1F',
  },
  createButton: {
    backgroundColor: '#4A90E2',
    borderRadius: 12,
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 24,
    gap: 8,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    gap: 8,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  tabActive: {
    backgroundColor: '#F0F7FF',
    borderWidth: 1,
    borderColor: '#4A90E2',
  },
  tabText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#8E8E93',
  },
  tabTextActive: {
    color: '#4A90E2',
  },
  content: {
    paddingHorizontal: 20,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
    color: '#1D1D1F',
    marginBottom: 16,
  },
  featuredPost: {
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  featuredGradient: {
    padding: 20,
  },
  featuredTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    color: '#FFFFFF',
    marginBottom: 8,
  },
  featuredDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    lineHeight: 20,
    marginBottom: 16,
  },
  featuredStats: {
    flexDirection: 'row',
    gap: 20,
  },
  featuredStat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  featuredStatText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  discussionsList: {
    gap: 16,
  },
  discussionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  discussionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  discussionMeta: {
    flex: 1,
  },
  username: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    color: '#1D1D1F',
  },
  timestamp: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#8E8E93',
  },
  discussionTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#1D1D1F',
    marginBottom: 8,
  },
  discussionPreview: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#8E8E93',
    lineHeight: 20,
    marginBottom: 12,
  },
  discussionFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  discussionStats: {
    flexDirection: 'row',
    gap: 16,
  },
  discussionStat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  discussionStatText: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#8E8E93',
  },
  shareButton: {
    padding: 4,
  },
  challengeCard: {
    borderRadius: 16,
    padding: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  challengeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 12,
  },
  challengeTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 20,
    color: '#FFFFFF',
  },
  challengeDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    lineHeight: 20,
    marginBottom: 16,
  },
  challengeProgress: {
    marginBottom: 16,
  },
  challengeProgressText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#FFFFFF',
    marginBottom: 8,
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
  challengeStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  challengeParticipants: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  challengeReward: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: '#FFFFFF',
  },
  challengesList: {
    gap: 12,
  },
  upcomingChallengeCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  challengeBadge: {
    backgroundColor: '#4A90E2',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  challengeBadgeText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 10,
    color: '#FFFFFF',
  },
  upcomingChallengeTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#1D1D1F',
    marginBottom: 4,
  },
  upcomingChallengeDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#8E8E93',
    lineHeight: 20,
    marginBottom: 12,
  },
  upcomingChallengeMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  challengeStartDate: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: '#4A90E2',
  },
  challengeDuration: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#8E8E93',
  },
  eventsList: {
    gap: 12,
  },
  eventCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  eventDate: {
    backgroundColor: '#4A90E2',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    marginRight: 16,
    minWidth: 60,
  },
  eventDay: {
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    color: '#FFFFFF',
  },
  eventMonth: {
    fontFamily: 'Inter-Medium',
    fontSize: 10,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  eventInfo: {
    flex: 1,
  },
  eventTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#1D1D1F',
    marginBottom: 4,
  },
  eventDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#8E8E93',
    marginBottom: 8,
  },
  eventMeta: {
    flexDirection: 'row',
    gap: 12,
  },
  eventTime: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: '#4A90E2',
  },
  eventAttendees: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#8E8E93',
  },
  joinButton: {
    backgroundColor: '#34C759',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
  },
  joinButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 12,
    color: '#FFFFFF',
  },
});