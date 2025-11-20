import { useTabManager } from "@/hooks/useTabManager";
import { useTuningSettings } from "@/hooks/useTuningSettings";
import { useLanguage } from "@/hooks/useLanguage";
import { TunerSection } from "@/components/TunerSection";
import { TuningSelector } from "@/components/TuningSelector";
import { InstrumentSelector } from "@/components/InstrumentSelector";
import { ThemeSelector } from "@/components/ThemeSelector";
import { LanguageSelector } from "@/components/LanguageSelector";
import { TuningHistory } from "@/components/TuningHistory";
import { AudioSettings } from "@/components/AudioSettings";
import { TabViewer } from "@/components/TabViewer";
import { TabLibrary } from "@/components/TabLibrary";
import { TabEditor } from "@/components/TabEditor";
import { TabLearningMode } from "@/components/TabLearningMode";
import { TabFretboard } from "@/components/TabFretboard";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BackgroundEffects } from "@/components/BackgroundEffects";
import { AppHeader } from "@/components/AppHeader";
import { PageTransition } from "@/components/PageTransition";
import { AnimatePresence } from "framer-motion";

const Index = () => {
  const tabManager = useTabManager();
  const { currentTuning } = useTuningSettings();
  const { t } = useLanguage();

  return (
    <div className="min-h-screen relative overflow-hidden">
      <BackgroundEffects />

      <div className="container mx-auto p-4 max-w-6xl relative z-10">
        <AppHeader />

        <Tabs defaultValue="tuner" className="w-full space-y-12">
          <div className="flex justify-center">
            <TabsList className="glass-effect p-1 rounded-full inline-flex">
              <TabsTrigger value="tuner" className="rounded-full px-6 py-2.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all">{t('nav.tuner')}</TabsTrigger>
              <TabsTrigger value="tabs" className="rounded-full px-6 py-2.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all">{t('nav.tabs')}</TabsTrigger>
              <TabsTrigger value="library" className="rounded-full px-6 py-2.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all">{t('nav.library')}</TabsTrigger>
              <TabsTrigger value="editor" className="rounded-full px-6 py-2.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all">{t('nav.editor')}</TabsTrigger>
              <TabsTrigger value="settings" className="rounded-full px-6 py-2.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all">{t('nav.settings')}</TabsTrigger>
              <TabsTrigger value="history" className="rounded-full px-6 py-2.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all">{t('nav.history')}</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="tuner" className="space-y-8">
            <PageTransition>
              <TunerSection />
            </PageTransition>
          </TabsContent>

          <TabsContent value="settings" className="space-y-8">
            <PageTransition>
              <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="space-y-8">
                    <div className="glass-effect-strong rounded-2xl p-6 card-elevated">
                      <AudioSettings />
                    </div>
                    <div className="glass-effect-strong rounded-2xl p-6 card-elevated">
                      <InstrumentSelector />
                    </div>
                    <div className="glass-effect-strong rounded-2xl p-6 card-elevated">
                      <TuningSelector />
                    </div>
                  </div>
                  <div className="space-y-8">
                    <div className="glass-effect-strong rounded-2xl p-6 card-elevated">
                      <LanguageSelector />
                    </div>
                    <div className="glass-effect-strong rounded-2xl p-6 card-elevated">
                      <ThemeSelector />
                    </div>
                    <div className="glass-effect-strong rounded-2xl p-6 card-elevated">
                      <TuningHistory />
                    </div>
                  </div>
                </div>
              </div>
            </PageTransition>
          </TabsContent>

          <TabsContent value="tabs" className="space-y-6">
            <PageTransition>
              {tabManager.currentTab ? (
                <div className="max-w-6xl mx-auto">
                  <TabViewer
                    tab={tabManager.currentTab}
                    playback={tabManager.playback}
                    settings={tabManager.settings}
                    onPlaybackChange={tabManager.updatePlayback}
                    onPositionClick={(section, measure, beat) => {
                      tabManager.updatePlayback({
                        currentSection: section,
                        currentMeasure: measure,
                        currentBeat: beat
                      });
                    }}
                  />
                  <div className="mt-4">
                    <TabFretboard
                      tab={tabManager.currentTab}
                      playback={tabManager.playback}
                      highlightCurrentPosition={tabManager.settings.highlightCurrentPosition}
                    />
                  </div>
                </div>
              ) : (
                <Card className="max-w-2xl mx-auto p-8 text-center">
                  <h3 className="text-lg font-semibold mb-4">{t('tab.load')}</h3>
                  <p className="text-muted-foreground mb-4">
                    {t('tab.load.desc')}
                  </p>
                </Card>
              )}
            </PageTransition>
          </TabsContent>

          <TabsContent value="library" className="space-y-6">
            <PageTransition>
              <div className="max-w-6xl mx-auto">
                <TabLibrary
                  tabs={tabManager.tabs}
                  folders={tabManager.folders}
                  progress={tabManager.progress}
                  onTabSelect={(tab) => {
                    tabManager.setCurrentTab(tab);
                    tabManager.setTuningFromTab(tab);
                  }}
                  onTabDelete={tabManager.deleteTab}
                  onTabDuplicate={tabManager.duplicateTab}
                  onCreateFolder={tabManager.createFolder}
                  onImportTab={tabManager.importTab}
                  onExportTab={tabManager.exportTab}
                />
              </div>
            </PageTransition>
          </TabsContent>

          <TabsContent value="editor" className="space-y-6">
            <PageTransition>
              <div className="max-w-6xl mx-auto">
                {tabManager.currentTab ? (
                  <TabEditor
                    tab={tabManager.currentTab}
                    editor={tabManager.editor}
                    onTabUpdate={(updates) => tabManager.updateTab(tabManager.currentTab!.id, updates)}
                    onEditorUpdate={tabManager.updateEditor}
                    undo={tabManager.undo}
                    redo={tabManager.redo}
                    canUndo={tabManager.canUndo}
                    canRedo={tabManager.canRedo}
                    copyMeasure={tabManager.copyMeasure}
                    pasteMeasure={tabManager.pasteMeasure}
                    playback={tabManager.playback}
                    onPlaybackChange={tabManager.updatePlayback}
                  />
                ) : (
                  <Card className="p-8 text-center">
                    <h3 className="text-lg font-semibold mb-4">{t('tab.create')}</h3>
                    <p className="text-muted-foreground mb-4">
                      {t('tab.create.desc')}
                    </p>
                    <Button onClick={() => {
                      const newTab = tabManager.addTab({
                        metadata: {
                          title: t('tab.new'),
                          artist: '',
                          tuning: 'standard-e',
                          difficulty: 'intermediate',
                          genre: 'Rock',
                          tempo: 120,
                          timeSignature: { numerator: 4, denominator: 4 },
                          tags: [],
                        },
                        sections: [{
                          name: 'Intro',
                          measures: [{
                            notes: [[]],
                            timeSignature: { numerator: 4, denominator: 4 },
                            tempo: 120,
                          }],
                        }],
                      });
                      tabManager.setCurrentTab(newTab);
                    }}>
                      {t('tab.create.button')}
                    </Button>
                  </Card>
                )}
              </div>
            </PageTransition>
          </TabsContent>

          <TabsContent value="history" className="space-y-6">
            <PageTransition>
              <div className="max-w-4xl mx-auto">
                <TuningHistory />
              </div>
            </PageTransition>
          </TabsContent>
        </Tabs>

        {/* Footer */}
        <div className="mt-20 text-center">
          <div className="glass-effect rounded-2xl p-6 max-w-2xl mx-auto">
            <p className="text-muted-foreground text-lg font-medium">{t('footer.tunings')}</p>
            <p className="mt-2 text-muted-foreground/80">{t('footer.environment')}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
