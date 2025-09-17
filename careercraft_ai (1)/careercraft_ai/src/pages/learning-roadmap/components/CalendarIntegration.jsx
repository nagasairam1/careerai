import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const CalendarIntegration = ({ scheduledSessions, onScheduleSession, onUpdateSession, className = '' }) => {
  const [isScheduling, setIsScheduling] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [sessionDuration, setSessionDuration] = useState('60');
  const [selectedCourse, setSelectedCourse] = useState('');

  const durationOptions = [
    { value: '30', label: '30 minutes' },
    { value: '60', label: '1 hour' },
    { value: '90', label: '1.5 hours' },
    { value: '120', label: '2 hours' }
  ];

  const courseOptions = [
    { value: 'react-fundamentals', label: 'React Fundamentals' },
    { value: 'javascript-advanced', label: 'Advanced JavaScript' },
    { value: 'data-structures', label: 'Data Structures & Algorithms' },
    { value: 'system-design', label: 'System Design Basics' }
  ];

  const timeSlots = [
    '09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'
  ];

  const getUpcomingSessions = () => {
    const today = new Date();
    return scheduledSessions?.filter(session => new Date(session.date) >= today)?.sort((a, b) => new Date(a.date) - new Date(b.date))?.slice(0, 5);
  };

  const handleScheduleSession = () => {
    if (selectedDate && selectedTime && selectedCourse) {
      const newSession = {
        id: Date.now()?.toString(),
        date: selectedDate,
        time: selectedTime,
        duration: parseInt(sessionDuration),
        course: selectedCourse,
        status: 'scheduled'
      };
      onScheduleSession(newSession);
      setIsScheduling(false);
      setSelectedDate('');
      setSelectedTime('');
      setSelectedCourse('');
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date?.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  const getSessionStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'text-success bg-success/10';
      case 'in-progress':
        return 'text-primary bg-primary/10';
      case 'scheduled':
        return 'text-warning bg-warning/10';
      case 'missed':
        return 'text-error bg-error/10';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };

  return (
    <div className={`bg-card border border-border rounded-lg ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-border">
        <div className="flex items-center space-x-2">
          <Icon name="Calendar" size={20} className="text-primary" />
          <h2 className="text-lg font-semibold text-foreground">Learning Schedule</h2>
        </div>
        <Button
          variant="default"
          size="sm"
          onClick={() => setIsScheduling(true)}
          iconName="Plus"
          iconPosition="left"
        >
          Schedule Session
        </Button>
      </div>
      {/* Upcoming Sessions */}
      <div className="p-6">
        <h3 className="text-sm font-medium text-foreground mb-4">Upcoming Sessions</h3>
        
        {getUpcomingSessions()?.length > 0 ? (
          <div className="space-y-3">
            {getUpcomingSessions()?.map((session) => (
              <div
                key={session?.id}
                className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Icon name="BookOpen" size={16} className="text-primary" />
                  </div>
                  <div>
                    <div className="font-medium text-foreground text-sm">
                      {courseOptions?.find(c => c?.value === session?.course)?.label || session?.course}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {formatDate(session?.date)} at {session?.time} • {session?.duration}min
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSessionStatusColor(session?.status)}`}>
                    {session?.status?.charAt(0)?.toUpperCase() + session?.status?.slice(1)}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onUpdateSession(session?.id, 'in-progress')}
                  >
                    <Icon name="Play" size={14} />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <Icon name="Calendar" size={32} className="text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground text-sm">No upcoming sessions scheduled</p>
            <Button
              variant="outline"
              size="sm"
              className="mt-3"
              onClick={() => setIsScheduling(true)}
            >
              Schedule Your First Session
            </Button>
          </div>
        )}
      </div>
      {/* Quick Stats */}
      <div className="border-t border-border p-6">
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-lg font-bold text-foreground">
              {scheduledSessions?.filter(s => s?.status === 'completed')?.length}
            </div>
            <div className="text-xs text-muted-foreground">Completed</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-foreground">
              {scheduledSessions?.filter(s => s?.status === 'scheduled')?.length}
            </div>
            <div className="text-xs text-muted-foreground">Scheduled</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-foreground">
              {scheduledSessions?.reduce((total, session) => 
                session?.status === 'completed' ? total + session?.duration : total, 0
              )}
            </div>
            <div className="text-xs text-muted-foreground">Minutes</div>
          </div>
        </div>
      </div>
      {/* Schedule Session Modal */}
      {isScheduling && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-1200 p-4">
          <div className="bg-card border border-border rounded-lg p-6 max-w-md w-full">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-foreground">Schedule Learning Session</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsScheduling(false)}
              >
                <Icon name="X" size={16} />
              </Button>
            </div>

            <div className="space-y-4">
              {/* Course Selection */}
              <Select
                label="Select Course"
                options={courseOptions}
                value={selectedCourse}
                onChange={setSelectedCourse}
                placeholder="Choose a course"
                required
              />

              {/* Date Selection */}
              <Input
                label="Date"
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e?.target?.value)}
                min={new Date()?.toISOString()?.split('T')?.[0]}
                required
              />

              {/* Time Selection */}
              <Select
                label="Time"
                options={timeSlots?.map(time => ({ value: time, label: time }))}
                value={selectedTime}
                onChange={setSelectedTime}
                placeholder="Select time"
                required
              />

              {/* Duration Selection */}
              <Select
                label="Duration"
                options={durationOptions}
                value={sessionDuration}
                onChange={setSessionDuration}
              />
            </div>

            <div className="flex items-center justify-end space-x-3 mt-6">
              <Button
                variant="outline"
                onClick={() => setIsScheduling(false)}
              >
                Cancel
              </Button>
              <Button
                variant="default"
                onClick={handleScheduleSession}
                disabled={!selectedDate || !selectedTime || !selectedCourse}
              >
                Schedule Session
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarIntegration;