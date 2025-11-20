import { useState } from 'react';
import { Tab, TabLibraryFolder, TabProgress } from '@/types/tabs';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import {
  Music,
  Search,
  Filter,
  Plus,
  Folder,
  FolderOpen,
  FileText,
  Download,
  Upload,
  Star,
  Clock,
  Play,
  MoreVertical,
  Trash2,
  Copy,
  Edit
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/hooks/useLanguage';
import { InteractiveButton } from '@/components/InteractiveButton';

interface TabLibraryProps {
  tabs: Tab[];
  folders: TabLibraryFolder[];
  progress: TabProgress[];
  onTabSelect: (tab: Tab) => void;
  onTabDelete: (tabId: string) => void;
  onTabDuplicate: (tabId: string) => void;
  onCreateFolder: (name: string, parentId?: string) => void;
  onImportTab: (file: File) => void;
  onExportTab: (tabId: string) => void;
}

export const TabLibrary = ({
  tabs,
  folders,
  progress,
  onTabSelect,
  onTabDelete,
  onTabDuplicate,
  onCreateFolder,
  onImportTab,
  onExportTab,
}: TabLibraryProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFolder, setSelectedFolder] = useState<string>('all');
  const [filterBy, setFilterBy] = useState<'all' | 'difficulty' | 'genre' | 'favorites'>('all');
  const [sortBy, setSortBy] = useState<'title' | 'artist' | 'date' | 'progress'>('title');
  const [newFolderName, setNewFolderName] = useState('');
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set());
  const [importDialogOpen, setImportDialogOpen] = useState(false);

  const { t } = useLanguage();

  // Filter and sort tabs
  const filteredTabs = tabs.filter(tab => {
    const matchesSearch =
      tab.metadata.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tab.metadata.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tab.metadata.genre.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFolder = selectedFolder === 'all' ||
      folders.find(f => f.id === selectedFolder)?.tabIds.includes(tab.id);

    return matchesSearch && matchesFolder;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'title':
        return a.metadata.title.localeCompare(b.metadata.title);
      case 'artist':
        return a.metadata.artist.localeCompare(b.metadata.artist);
      case 'date':
        return b.updatedAt - a.updatedAt;
      case 'progress':
        const progressA = progress.find(p => p.tabId === a.id)?.learnedSections.length || 0;
        const progressB = progress.find(p => p.tabId === b.id)?.learnedSections.length || 0;
        return progressB - progressA;
      default:
        return 0;
    }
  });

  const handleFileImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onImportTab(file);
      event.target.value = '';
    }
  };

  const toggleFolder = (folderId: string) => {
    const newExpanded = new Set(expandedFolders);
    if (newExpanded.has(folderId)) {
      newExpanded.delete(folderId);
    } else {
      newExpanded.add(folderId);
    }
    setExpandedFolders(newExpanded);
  };

  const createFolder = () => {
    if (newFolderName.trim()) {
      onCreateFolder(newFolderName.trim());
      setNewFolderName('');
    }
  };

  const getTabProgress = (tabId: string) => {
    return progress.find(p => p.tabId === tabId);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-500';
      case 'intermediate': return 'bg-yellow-500';
      case 'advanced': return 'bg-orange-500';
      case 'expert': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-4">
      {/* Header with Search and Actions */}
      <Card className="p-4">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={t('library.search.placeholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <input
              type="file"
              accept=".txt,.json,.gp5,.gpx"
              onChange={handleFileImport}
              className="hidden"
              id="file-import"
            />
            <InteractiveButton variant="outline" asChild>
              <label htmlFor="file-import" className="cursor-pointer">
                <Upload className="h-4 w-4 mr-2" />
                {t('library.import')}
              </label>
            </InteractiveButton>

            <Dialog>
              <DialogTrigger asChild>
                <InteractiveButton variant="outline">
                  <Plus className="h-4 w-4 mr-2" />
                  {t('library.folder')}
                </InteractiveButton>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{t('library.folder.createTitle')}</DialogTitle>
                </DialogHeader>
                <div className="flex gap-2">
                  <Input
                    placeholder={t('library.folder.namePlaceholder')}
                    value={newFolderName}
                    onChange={(e) => setNewFolderName(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && createFolder()}
                  />
                  <Button onClick={createFolder}>{t('library.create')}</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mt-4">
          <Select value={selectedFolder} onValueChange={setSelectedFolder}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder={t('library.allFolders')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t('library.allTabs')}</SelectItem>
              {folders.map(folder => (
                <SelectItem key={folder.id} value={folder.id}>
                  <div className="flex items-center gap-2">
                    <Folder className="h-4 w-4" />
                    {folder.name}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={(value: any) => setSortBy(value)}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="title">{t('library.sort.title')}</SelectItem>
              <SelectItem value="artist">{t('library.sort.artist')}</SelectItem>
              <SelectItem value="date">{t('library.sort.date')}</SelectItem>
              <SelectItem value="progress">{t('library.sort.progress')}</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Card>

      {/* Tab List */}
      <Card className="p-4">
        <ScrollArea className="h-96">
          {filteredTabs.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Music className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>{t('library.empty.title')}</p>
              <p className="text-sm">{t('library.empty.subtitle')}</p>
            </div>
          ) : (
            <div className="space-y-2">
              {filteredTabs.map((tab) => {
                const tabProgress = getTabProgress(tab.id);
                const progressPercentage = tabProgress
                  ? (tabProgress.learnedSections.length / tab.sections.length) * 100
                  : 0;

                return (
                  <div
                    key={tab.id}
                    className="flex items-center gap-4 p-3 rounded-lg border hover:bg-accent/50 transition-colors cursor-pointer group"
                    onClick={() => onTabSelect(tab)}
                  >
                    {/* Tab Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold truncate">{tab.metadata.title}</h3>
                        <div className={cn("w-2 h-2 rounded-full", getDifficultyColor(tab.metadata.difficulty))} />
                      </div>

                      <p className="text-sm text-muted-foreground truncate mb-1">
                        {tab.metadata.artist}
                      </p>

                      <div className="flex items-center gap-2 text-xs">
                        <Badge variant="outline" className="text-xs">
                          {tab.metadata.genre}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {tab.metadata.tempo} BPM
                        </Badge>
                        {tabProgress && (
                          <Badge variant="secondary" className="text-xs">
                            {Math.round(progressPercentage)}% {t('library.progress.learned')}
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* Progress Bar */}
                    {tabProgress && (
                      <div className="w-20">
                        <div className="w-full bg-muted rounded-full h-2">
                          <div
                            className="bg-primary h-2 rounded-full transition-all"
                            style={{ width: `${progressPercentage}%` }}
                          />
                        </div>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <InteractiveButton
                        size="sm"
                        variant="ghost"
                        onClick={(e) => {
                          e.stopPropagation();
                          onTabSelect(tab);
                        }}
                      >
                        <Play className="h-4 w-4" />
                      </InteractiveButton>

                      <InteractiveButton
                        size="sm"
                        variant="ghost"
                        onClick={(e) => {
                          e.stopPropagation();
                          onExportTab(tab.id);
                        }}
                      >
                        <Download className="h-4 w-4" />
                      </InteractiveButton>

                      <Dialog>
                        <DialogTrigger asChild>
                          <InteractiveButton
                            size="sm"
                            variant="ghost"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <MoreVertical className="h-4 w-4" />
                          </InteractiveButton>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>{tab.metadata.title}</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-2">
                            <Button
                              variant="outline"
                              className="w-full justify-start"
                              onClick={() => onTabDuplicate(tab.id)}
                            >
                              <Copy className="h-4 w-4 mr-2" />
                              {t('library.actions.duplicate')}
                            </Button>
                            <Button
                              variant="outline"
                              className="w-full justify-start text-destructive"
                              onClick={() => onTabDelete(tab.id)}
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              {t('library.actions.delete')}
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>

                    {/* Last Practiced */}
                    {tabProgress && (
                      <div className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {new Date(tabProgress.lastPracticed).toLocaleDateString()}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </ScrollArea>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-primary">{tabs.length}</div>
          <div className="text-sm text-muted-foreground">{t('library.stats.totalTabs')}</div>
        </Card>

        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-primary">{folders.length}</div>
          <div className="text-sm text-muted-foreground">{t('library.stats.folders')}</div>
        </Card>

        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-primary">
            {progress.filter(p => p.learnedSections.length > 0).length}
          </div>
          <div className="text-sm text-muted-foreground">{t('library.stats.inLearning')}</div>
        </Card>

        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-primary">
            {Math.round(progress.reduce((sum, p) => sum + p.practiceTime, 0) / 3600)}
          </div>
          <div className="text-sm text-muted-foreground">{t('library.stats.practiceHours')}</div>
        </Card>
      </div>
    </div>
  );
};