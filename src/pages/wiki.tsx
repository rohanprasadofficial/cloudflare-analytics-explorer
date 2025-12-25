import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HugeiconsIcon } from '@hugeicons/react';
import { Cancel01Icon } from '@hugeicons/core-free-icons';
import { Button } from '@/components/ui/button';
import { WikiSidebar } from '@/components/wiki/wiki-sidebar';
import { WikiContent } from '@/components/wiki/wiki-content';

export function WikiPage() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('getting-started');

  return (
    <div className="fixed inset-0 z-50 flex bg-background">
      {/* Sidebar */}
      <WikiSidebar
        activeSection={activeSection}
        onSectionChange={setActiveSection}
      />

      {/* Main content */}
      <main className="flex-1 overflow-hidden">
        {/* Header */}
        <header className="flex h-14 items-center justify-between border-b px-6">
          <h1 className="text-lg font-semibold">Analytics Explorer Documentation</h1>
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <HugeiconsIcon icon={Cancel01Icon} size={18} strokeWidth={2} />
          </Button>
        </header>

        {/* Content area */}
        <div className="h-[calc(100%-3.5rem)] overflow-y-auto">
          <div className="mx-auto max-w-3xl px-8 py-8">
            <WikiContent activeSection={activeSection} />
          </div>
        </div>
      </main>
    </div>
  );
}
