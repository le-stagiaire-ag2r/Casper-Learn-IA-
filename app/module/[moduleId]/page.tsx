import { Module } from '@/types';
import modulesData from '@/data/modules.json';
import ModuleContent from '@/components/ModuleContent';
import Link from 'next/link';

export function generateStaticParams() {
  return modulesData.map((module) => ({
    moduleId: module.id,
  }));
}

export default function ModulePage({ params }: { params: { moduleId: string } }) {
  const module = modulesData.find((m) => m.id === params.moduleId) as Module;

  if (!module) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-4">Module introuvable</h2>
        <Link href="/" className="text-casper-primary hover:underline">
          Retour à l&apos;accueil
        </Link>
      </div>
    );
  }

  return <ModuleContent moduleData={module} />;
}
