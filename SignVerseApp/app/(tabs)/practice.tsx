import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Camera, Video, Target, Award, RefreshCw, CircleCheck as CheckCircle } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { useState } from 'react';

export default function PracticeScreen() {
  const [facing, setFacing] = useState<CameraType>('front');
  const [permission, requestPermission] = useCameraPermissions();
  const [isRecording, setIsRecording] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const [practiceMode, setPracticeMode] = useState<'select' | 'camera' | 'feedback'>('select');
  const [currentSign, setCurrentSign] = useState('Hello');
  const [accuracy, setAccuracy] = useState(0);

  const practiceOptions = [
    {
      title: 'Quick Practice',
      description: 'Practice 5 random signs',
      icon: Target,
      color: ['#4ECDC4', '#44A08D'],
      duration: '5 min'
    },
    {
      title: 'Daily Challenge',
      description: 'Complete today\'s challenge',
      icon: Award,
      color: ['#FF6B6B', '#FF8E53'],
      duration: '10 min'
    },
    {
      title: 'Custom Practice',
      description: 'Choose specific signs to practice',
      icon: RefreshCw,
      color: ['#667eea', '#764ba2'],
      duration: 'Flexible'
    }
  ];

  const handleStartPractice = (type: string) => {
    if (!permission?.granted) {
      requestPermission();
      return;
    }
    setPracticeMode('camera');
    setShowCamera(true);
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    // Simulate AI feedback
    setTimeout(() => {
      const randomAccuracy = Math.floor(Math.random() * 30) + 70; // 70-100%
      setAccuracy(randomAccuracy);
      setPracticeMode('feedback');
      setShowCamera(false);
    }, 1000);
  };

  const handleNextSign = () => {
    const signs = ['Hello', 'Thank You', 'Please', 'Sorry', 'Help'];
    const nextSign = signs[Math.floor(Math.random() * signs.length)];
    setCurrentSign(nextSign);
    setPracticeMode('camera');
    setShowCamera(true);
    setAccuracy(0);
  };

  const handleFinishPractice = () => {
    setPracticeMode('select');
    setShowCamera(false);
    setAccuracy(0);
    Alert.alert('Great Job!', 'You\'ve completed your practice session. Keep up the good work!');
  };

  if (!permission) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.centerContent}>
          <Text style={styles.message}>Loading camera permissions...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!permission.granted) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.centerContent}>
          <Camera size={64} color="#4A90E2" />
          <Text style={styles.permissionTitle}>Camera Access Required</Text>
          <Text style={styles.permissionMessage}>
            We need camera access to analyze your sign language practice and provide feedback.
          </Text>
          <TouchableOpacity style={styles.permissionButton} onPress={requestPermission}>
            <Text style={styles.permissionButtonText}>Grant Permission</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  if (practiceMode === 'camera' && showCamera) {
    return (
      <SafeAreaView style={styles.container}>
        <CameraView style={styles.camera} facing={facing}>
          <View style={styles.cameraOverlay}>
            <View style={styles.cameraHeader}>
              <Text style={styles.currentSignText}>Practice: {currentSign}</Text>
              <TouchableOpacity 
                style={styles.closeButton}
                onPress={() => {
                  setShowCamera(false);
                  setPracticeMode('select');
                }}
              >
                <Text style={styles.closeButtonText}>✕</Text>
              </TouchableOpacity>
            </View>
            
            <View style={styles.cameraCenter}>
              <View style={styles.signFrame} />
              <Text style={styles.instructionText}>
                Position your hands within the frame and perform the "{currentSign}" sign
              </Text>
            </View>

            <View style={styles.cameraControls}>
              <TouchableOpacity
                style={[styles.recordButton, isRecording && styles.recordButtonActive]}
                onPress={() => {
                  if (isRecording) {
                    handleStopRecording();
                  } else {
                    setIsRecording(true);
                  }
                }}
              >
                <View style={[styles.recordButtonInner, isRecording && styles.recordButtonInnerActive]} />
              </TouchableOpacity>
              <Text style={styles.recordButtonText}>
                {isRecording ? 'Stop Recording' : 'Start Recording'}
              </Text>
            </View>
          </View>
        </CameraView>
      </SafeAreaView>
    );
  }

  if (practiceMode === 'feedback') {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.feedbackContainer}>
          <LinearGradient
            colors={accuracy >= 80 ? ['#34C759', '#30D158'] : accuracy >= 60 ? ['#FF9500', '#FFAD33'] : ['#FF3B30', '#FF6961']}
            style={styles.feedbackCard}
          >
            <CheckCircle size={48} color="#FFFFFF" />
            <Text style={styles.feedbackTitle}>
              {accuracy >= 80 ? 'Excellent!' : accuracy >= 60 ? 'Good Job!' : 'Keep Practicing!'}
            </Text>
            <Text style={styles.accuracyText}>{accuracy}% Accuracy</Text>
            <Text style={styles.feedbackDescription}>
              {accuracy >= 80 
                ? 'Your sign was performed with great accuracy!'
                : accuracy >= 60 
                ? 'Good attempt! Try to be more precise with hand positioning.'
                : 'Keep practicing! Focus on hand shape and movement.'}
            </Text>
          </LinearGradient>

          <View style={styles.improvementTips}>
            <Text style={styles.tipsTitle}>Tips for Improvement:</Text>
            <View style={styles.tipsList}>
              <Text style={styles.tipItem}>• Keep your hands clearly visible</Text>
              <Text style={styles.tipItem}>• Maintain proper hand shape throughout</Text>
              <Text style={styles.tipItem}>• Use smooth, deliberate movements</Text>
              <Text style={styles.tipItem}>• Practice in good lighting</Text>
            </View>
          </View>

          <View style={styles.feedbackActions}>
            <TouchableOpacity style={styles.nextButton} onPress={handleNextSign}>
              <Text style={styles.nextButtonText}>Next Sign</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.finishButton} onPress={handleFinishPractice}>
              <Text style={styles.finishButtonText}>Finish Practice</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Practice Signs</Text>
        <Text style={styles.subtitle}>Improve your signing with AI-powered feedback</Text>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>127</Text>
          <Text style={styles.statLabel}>Signs Practiced</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>89%</Text>
          <Text style={styles.statLabel}>Avg. Accuracy</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>12</Text>
          <Text style={styles.statLabel}>Day Streak</Text>
        </View>
      </View>

      <View style={styles.practiceOptions}>
        {practiceOptions.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={styles.optionCard}
            onPress={() => handleStartPractice(option.title)}
          >
            <LinearGradient
              colors={option.color}
              style={styles.optionGradient}
            >
              <View style={styles.optionHeader}>
                <option.icon size={32} color="#FFFFFF" />
                <Text style={styles.optionDuration}>{option.duration}</Text>
              </View>
              <Text style={styles.optionTitle}>{option.title}</Text>
              <Text style={styles.optionDescription}>{option.description}</Text>
            </LinearGradient>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.recentPractice}>
        <Text style={styles.sectionTitle}>Recent Practice Sessions</Text>
        <View style={styles.sessionsList}>
          {recentSessions.map((session, index) => (
            <View key={index} style={styles.sessionCard}>
              <View style={styles.sessionInfo}>
                <Text style={styles.sessionTitle}>{session.title}</Text>
                <Text style={styles.sessionDate}>{session.date}</Text>
              </View>
              <View style={styles.sessionStats}>
                <Text style={styles.sessionAccuracy}>{session.accuracy}%</Text>
                <Text style={styles.sessionSigns}>{session.signs} signs</Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
}

const recentSessions = [
  {
    title: 'Daily Challenge',
    date: 'Today, 2:30 PM',
    accuracy: 92,
    signs: 8
  },
  {
    title: 'Quick Practice',
    date: 'Yesterday, 6:15 PM',
    accuracy: 87,
    signs: 5
  },
  {
    title: 'Custom Practice',
    date: '2 days ago',
    accuracy: 94,
    signs: 12
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
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  message: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#8E8E93',
    textAlign: 'center',
  },
  permissionTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    color: '#1D1D1F',
    marginTop: 20,
    marginBottom: 12,
    textAlign: 'center',
  },
  permissionMessage: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#8E8E93',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 32,
  },
  permissionButton: {
    backgroundColor: '#4A90E2',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 12,
  },
  permissionButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 24,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  statNumber: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    color: '#1D1D1F',
    marginBottom: 4,
  },
  statLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#8E8E93',
    textAlign: 'center',
  },
  practiceOptions: {
    paddingHorizontal: 20,
    marginBottom: 32,
    gap: 16,
  },
  optionCard: {
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  optionGradient: {
    padding: 20,
  },
  optionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  optionDuration: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  optionTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 20,
    color: '#FFFFFF',
    marginBottom: 8,
  },
  optionDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    lineHeight: 20,
  },
  recentPractice: {
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
    color: '#1D1D1F',
    marginBottom: 16,
  },
  sessionsList: {
    gap: 12,
  },
  sessionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  sessionInfo: {
    flex: 1,
  },
  sessionTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#1D1D1F',
    marginBottom: 4,
  },
  sessionDate: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#8E8E93',
  },
  sessionStats: {
    alignItems: 'flex-end',
  },
  sessionAccuracy: {
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    color: '#34C759',
    marginBottom: 2,
  },
  sessionSigns: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#8E8E93',
  },
  camera: {
    flex: 1,
  },
  cameraOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  cameraHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 60,
  },
  currentSignText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 20,
    color: '#FFFFFF',
  },
  closeButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: '#FFFFFF',
  },
  cameraCenter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  signFrame: {
    width: 200,
    height: 200,
    borderWidth: 3,
    borderColor: '#FFFFFF',
    borderRadius: 20,
    borderStyle: 'dashed',
    marginBottom: 20,
  },
  instructionText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 24,
  },
  cameraControls: {
    alignItems: 'center',
    paddingBottom: 60,
  },
  recordButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  recordButtonActive: {
    backgroundColor: '#FF3B30',
  },
  recordButtonInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FF3B30',
  },
  recordButtonInnerActive: {
    width: 30,
    height: 30,
    borderRadius: 4,
    backgroundColor: '#FFFFFF',
  },
  recordButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#FFFFFF',
  },
  feedbackContainer: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  feedbackCard: {
    borderRadius: 20,
    padding: 32,
    alignItems: 'center',
    marginBottom: 32,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  feedbackTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    color: '#FFFFFF',
    marginTop: 16,
    marginBottom: 8,
  },
  accuracyText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 32,
    color: '#FFFFFF',
    marginBottom: 16,
  },
  feedbackDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    lineHeight: 24,
  },
  improvementTips: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 32,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  tipsTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: '#1D1D1F',
    marginBottom: 12,
  },
  tipsList: {
    gap: 8,
  },
  tipItem: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#8E8E93',
    lineHeight: 20,
  },
  feedbackActions: {
    flexDirection: 'row',
    gap: 12,
  },
  nextButton: {
    flex: 1,
    backgroundColor: '#4A90E2',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  nextButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
  },
  finishButton: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#4A90E2',
  },
  finishButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#4A90E2',
  },
});