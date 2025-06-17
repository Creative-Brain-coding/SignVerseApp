import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, Filter, Play, Clock, Star, Users } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';

export default function LearnScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Beginner', 'Intermediate', 'Advanced', 'Alphabet', 'Numbers', 'Family', 'Food'];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Learn Signs</Text>
          <Text style={styles.subtitle}>Discover new signs and improve your skills</Text>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Search size={20} color="#8E8E93" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search for signs..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholderTextColor="#8E8E93"
            />
          </View>
          <TouchableOpacity style={styles.filterButton}>
            <Filter size={20} color="#4A90E2" />
          </TouchableOpacity>
        </View>

        {/* Categories */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesContainer}
          contentContainerStyle={styles.categoriesContent}
        >
          {categories.map((category) => (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryChip,
                selectedCategory === category && styles.categoryChipActive
              ]}
              onPress={() => setSelectedCategory(category)}
            >
              <Text style={[
                styles.categoryText,
                selectedCategory === category && styles.categoryTextActive
              ]}>
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Featured Lesson */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Featured Lesson</Text>
          <LinearGradient
            colors={['#FF6B6B', '#FF8E53']}
            style={styles.featuredCard}
          >
            <View style={styles.featuredContent}>
              <Text style={styles.featuredTitle}>Master Basic Greetings</Text>
              <Text style={styles.featuredDescription}>
                Learn essential greeting signs used in everyday conversations
              </Text>
              <View style={styles.featuredStats}>
                <View style={styles.featuredStat}>
                  <Clock size={16} color="rgba(255, 255, 255, 0.8)" />
                  <Text style={styles.featuredStatText}>15 min</Text>
                </View>
                <View style={styles.featuredStat}>
                  <Users size={16} color="rgba(255, 255, 255, 0.8)" />
                  <Text style={styles.featuredStatText}>1.2k learners</Text>
                </View>
                <View style={styles.featuredStat}>
                  <Star size={16} color="#FFD700" />
                  <Text style={styles.featuredStatText}>4.9</Text>
                </View>
              </View>
            </View>
            <TouchableOpacity style={styles.playButton}>
              <Play size={24} color="#FFFFFF" />
            </TouchableOpacity>
          </LinearGradient>
        </View>

        {/* Lesson Categories */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Lesson Categories</Text>
          <View style={styles.lessonsGrid}>
            {lessonCategories.map((category, index) => (
              <TouchableOpacity key={index} style={styles.lessonCategoryCard}>
                <LinearGradient
                  colors={category.colors}
                  style={styles.categoryGradient}
                >
                  <Text style={styles.categoryIcon}>{category.icon}</Text>
                  <Text style={styles.categoryName}>{category.name}</Text>
                  <Text style={styles.categoryCount}>{category.count} lessons</Text>
                </LinearGradient>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Popular Lessons */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Popular This Week</Text>
          <View style={styles.lessonsList}>
            {popularLessons.map((lesson, index) => (
              <TouchableOpacity key={index} style={styles.lessonCard}>
                <View style={styles.lessonNumber}>
                  <Text style={styles.lessonNumberText}>{index + 1}</Text>
                </View>
                <View style={styles.lessonInfo}>
                  <Text style={styles.lessonTitle}>{lesson.title}</Text>
                  <Text style={styles.lessonCategory}>{lesson.category}</Text>
                  <View style={styles.lessonMeta}>
                    <View style={styles.lessonMetaItem}>
                      <Clock size={14} color="#8E8E93" />
                      <Text style={styles.lessonMetaText}>{lesson.duration}</Text>
                    </View>
                    <View style={styles.lessonMetaItem}>
                      <Star size={14} color="#FFD700" />
                      <Text style={styles.lessonMetaText}>{lesson.rating}</Text>
                    </View>
                  </View>
                </View>
                <TouchableOpacity style={styles.lessonPlayButton}>
                  <Play size={16} color="#4A90E2" />
                </TouchableOpacity>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Learning Path */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recommended Learning Path</Text>
          <View style={styles.pathContainer}>
            {learningPath.map((step, index) => (
              <View key={index} style={styles.pathStep}>
                <View style={[
                  styles.pathStepNumber,
                  step.completed && styles.pathStepCompleted,
                  step.current && styles.pathStepCurrent
                ]}>
                  <Text style={[
                    styles.pathStepNumberText,
                    (step.completed || step.current) && styles.pathStepNumberTextActive
                  ]}>
                    {index + 1}
                  </Text>
                </View>
                <View style={styles.pathStepContent}>
                  <Text style={styles.pathStepTitle}>{step.title}</Text>
                  <Text style={styles.pathStepDescription}>{step.description}</Text>
                  {step.current && (
                    <TouchableOpacity style={styles.continueButton}>
                      <Text style={styles.continueButtonText}>Continue</Text>
                    </TouchableOpacity>
                  )}
                </View>
                {index < learningPath.length - 1 && (
                  <View style={[
                    styles.pathConnector,
                    step.completed && styles.pathConnectorCompleted
                  ]} />
                )}
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const lessonCategories = [
  {
    name: 'Alphabet',
    count: 26,
    icon: '🔤',
    colors: ['#4ECDC4', '#44A08D']
  },
  {
    name: 'Numbers',
    count: 15,
    icon: '🔢',
    colors: ['#667eea', '#764ba2']
  },
  {
    name: 'Family',
    count: 12,
    icon: '👨‍👩‍👧‍👦',
    colors: ['#f093fb', '#f5576c']
  },
  {
    name: 'Food',
    count: 20,
    icon: '🍎',
    colors: ['#ffecd2', '#fcb69f']
  },
  {
    name: 'Colors',
    count: 10,
    icon: '🎨',
    colors: ['#a8edea', '#fed6e3']
  },
  {
    name: 'Animals',
    count: 18,
    icon: '🐕',
    colors: ['#ff9a9e', '#fecfef']
  }
];

const popularLessons = [
  {
    title: 'Hello & Goodbye',
    category: 'Greetings',
    duration: '8 min',
    rating: '4.9'
  },
  {
    title: 'Thank You & Please',
    category: 'Manners',
    duration: '6 min',
    rating: '4.8'
  },
  {
    title: 'I Love You',
    category: 'Emotions',
    duration: '5 min',
    rating: '5.0'
  },
  {
    title: 'Yes & No',
    category: 'Basic',
    duration: '4 min',
    rating: '4.7'
  },
  {
    title: 'Help & Sorry',
    category: 'Essential',
    duration: '7 min',
    rating: '4.9'
  }
];

const learningPath = [
  {
    title: 'Basic Alphabet',
    description: 'Learn the ASL alphabet and finger spelling',
    completed: true,
    current: false
  },
  {
    title: 'Common Greetings',
    description: 'Master everyday greeting signs',
    completed: true,
    current: false
  },
  {
    title: 'Family Members',
    description: 'Signs for family relationships',
    completed: false,
    current: true
  },
  {
    title: 'Numbers 1-20',
    description: 'Learn to sign numbers and basic counting',
    completed: false,
    current: false
  },
  {
    title: 'Colors & Shapes',
    description: 'Describe objects with colors and shapes',
    completed: false,
    current: false
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
  filterButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  categoriesContainer: {
    marginBottom: 24,
  },
  categoriesContent: {
    paddingHorizontal: 20,
    gap: 8,
  },
  categoryChip: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  categoryChipActive: {
    backgroundColor: '#4A90E2',
  },
  categoryText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#8E8E93',
  },
  categoryTextActive: {
    color: '#FFFFFF',
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  sectionTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
    color: '#1D1D1F',
    marginBottom: 16,
  },
  featuredCard: {
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  featuredContent: {
    flex: 1,
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
    marginBottom: 12,
    lineHeight: 20,
  },
  featuredStats: {
    flexDirection: 'row',
    gap: 16,
  },
  featuredStat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  featuredStatText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  playButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 24,
    padding: 12,
  },
  lessonsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  lessonCategoryCard: {
    width: '48%',
    borderRadius: 12,
    overflow: 'hidden',
  },
  categoryGradient: {
    padding: 16,
    alignItems: 'center',
    minHeight: 120,
    justifyContent: 'center',
  },
  categoryIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  categoryName: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 4,
  },
  categoryCount: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  lessonsList: {
    gap: 12,
  },
  lessonCard: {
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
  lessonNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#4A90E2',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  lessonNumberText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 14,
    color: '#FFFFFF',
  },
  lessonInfo: {
    flex: 1,
  },
  lessonTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#1D1D1F',
    marginBottom: 4,
  },
  lessonCategory: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#8E8E93',
    marginBottom: 8,
  },
  lessonMeta: {
    flexDirection: 'row',
    gap: 16,
  },
  lessonMetaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  lessonMetaText: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#8E8E93',
  },
  lessonPlayButton: {
    backgroundColor: '#F0F7FF',
    borderRadius: 20,
    padding: 8,
  },
  pathContainer: {
    gap: 16,
  },
  pathStep: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    position: 'relative',
  },
  pathStepNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#E5E5EA',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    zIndex: 1,
  },
  pathStepCompleted: {
    backgroundColor: '#34C759',
  },
  pathStepCurrent: {
    backgroundColor: '#4A90E2',
  },
  pathStepNumberText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 14,
    color: '#8E8E93',
  },
  pathStepNumberTextActive: {
    color: '#FFFFFF',
  },
  pathStepContent: {
    flex: 1,
    paddingBottom: 16,
  },
  pathStepTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#1D1D1F',
    marginBottom: 4,
  },
  pathStepDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#8E8E93',
    lineHeight: 20,
    marginBottom: 8,
  },
  continueButton: {
    backgroundColor: '#4A90E2',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    alignSelf: 'flex-start',
  },
  continueButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 12,
    color: '#FFFFFF',
  },
  pathConnector: {
    position: 'absolute',
    left: 15,
    top: 32,
    bottom: -16,
    width: 2,
    backgroundColor: '#E5E5EA',
  },
  pathConnectorCompleted: {
    backgroundColor: '#34C759',
  },
});