import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { motion } from 'motion/react';
import { User, Mail, Briefcase, GraduationCap, Code, FileText, Camera, Edit2, Save, X } from 'lucide-react';
import { User as UserType } from '../types';

const Profile = () => {
  const { user, token, login } = useAuth();
  const [profile, setProfile] = useState<UserType | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch('/api/user/profile', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await res.json();
        setProfile(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [token]);

  const handleSave = async () => {
    if (!profile) return;
    setSaving(true);
    try {
      const res = await fetch('/api/user/profile', {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          bio: profile.bio,
          skills: profile.skills,
          experience: profile.experience,
          education: profile.education
        }),
      });
      if (res.ok) {
        setIsEditing(false);
        // Update local storage user if needed
        const updatedUser = { ...user!, ...profile };
        login(token!, updatedUser);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="flex items-center justify-center h-screen">Loading profile...</div>;
  if (!profile) return <div>Profile not found.</div>;

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Header Card */}
      <div className="card relative overflow-hidden p-0">
        <div className="h-48 bg-gradient-to-r from-primary to-secondary"></div>
        <div className="p-8 pt-0 -mt-16 flex flex-col md:flex-row items-end gap-6">
          <div className="relative group">
            <div className="w-32 h-32 rounded-3xl border-4 border-white dark:border-slate-900 bg-slate-100 dark:bg-slate-800 overflow-hidden shadow-xl">
              {profile.avatar ? (
                <img src={profile.avatar} alt={profile.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-400">
                  <User size={64} />
                </div>
              )}
            </div>
            <button className="absolute bottom-2 right-2 p-2 bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all">
              <Camera size={18} />
            </button>
          </div>
          <div className="flex-1 pb-4">
            <h1 className="text-3xl font-bold">{profile.name}</h1>
            <p className="text-slate-500 font-medium flex items-center gap-2">
              <Mail size={16} /> {profile.email}
            </p>
          </div>
          <div className="pb-4">
            {isEditing ? (
              <div className="flex gap-2">
                <button 
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all flex items-center gap-2"
                >
                  <X size={18} /> Cancel
                </button>
                <button 
                  onClick={handleSave}
                  disabled={saving}
                  className="btn-primary flex items-center gap-2 px-6"
                >
                  <Save size={18} /> {saving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            ) : (
              <button 
                onClick={() => setIsEditing(true)}
                className="btn-primary flex items-center gap-2 px-6"
              >
                <Edit2 size={18} /> Edit Profile
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="space-y-8">
          <div className="card space-y-4">
            <h3 className="text-lg font-bold flex items-center gap-2">
              <Code size={20} className="text-primary" /> Skills
            </h3>
            {isEditing ? (
              <textarea
                value={profile.skills || ''}
                onChange={(e) => setProfile({ ...profile, skills: e.target.value })}
                className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-primary/20 transition-all min-h-[100px]"
                placeholder="React, TypeScript, Node.js..."
              />
            ) : (
              <div className="flex flex-wrap gap-2">
                {profile.skills ? profile.skills.split(',').map((skill, i) => (
                  <span key={i} className="px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-sm font-medium">
                    {skill.trim()}
                  </span>
                )) : <p className="text-sm text-slate-400">No skills added yet.</p>}
              </div>
            )}
          </div>

          <div className="card space-y-4">
            <h3 className="text-lg font-bold flex items-center gap-2">
              <FileText size={20} className="text-primary" /> Resume
            </h3>
            <div className="p-4 rounded-xl border-2 border-dashed border-slate-200 dark:border-slate-700 text-center space-y-3">
              <FileText size={32} className="mx-auto text-slate-400" />
              <p className="text-sm text-slate-500">Upload your latest resume (PDF, Max 5MB)</p>
              <button className="text-primary font-bold text-sm hover:underline">Choose File</button>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-2 space-y-8">
          <div className="card space-y-4">
            <h3 className="text-lg font-bold">About Me</h3>
            {isEditing ? (
              <textarea
                value={profile.bio || ''}
                onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-primary/20 transition-all min-h-[150px]"
                placeholder="Tell us about yourself..."
              />
            ) : (
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                {profile.bio || "No bio added yet. Tell the world who you are!"}
              </p>
            )}
          </div>

          <div className="card space-y-6">
            <h3 className="text-lg font-bold flex items-center gap-2">
              <Briefcase size={20} className="text-primary" /> Experience
            </h3>
            {isEditing ? (
              <textarea
                value={profile.experience || ''}
                onChange={(e) => setProfile({ ...profile, experience: e.target.value })}
                className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-primary/20 transition-all min-h-[150px]"
                placeholder="Work experience..."
              />
            ) : (
              <div className="space-y-6">
                {profile.experience ? (
                  <p className="text-slate-600 dark:text-slate-400 whitespace-pre-wrap">{profile.experience}</p>
                ) : <p className="text-sm text-slate-400">No experience added yet.</p>}
              </div>
            )}
          </div>

          <div className="card space-y-6">
            <h3 className="text-lg font-bold flex items-center gap-2">
              <GraduationCap size={20} className="text-primary" /> Education
            </h3>
            {isEditing ? (
              <textarea
                value={profile.education || ''}
                onChange={(e) => setProfile({ ...profile, education: e.target.value })}
                className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-primary/20 transition-all min-h-[100px]"
                placeholder="Education details..."
              />
            ) : (
              <div className="space-y-6">
                {profile.education ? (
                  <p className="text-slate-600 dark:text-slate-400 whitespace-pre-wrap">{profile.education}</p>
                ) : <p className="text-sm text-slate-400">No education added yet.</p>}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
