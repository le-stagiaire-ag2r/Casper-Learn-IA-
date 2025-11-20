#!/usr/bin/env python3
"""
GitHub Projects Indexer
Clones and indexes code from specified GitHub repositories
"""

import os
import json
import subprocess
from pathlib import Path
from typing import List, Dict
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


class GitHubProjectIndexer:
    """Indexes code from GitHub projects"""

    def __init__(self, projects_dir: str = "data/projects"):
        self.projects_dir = Path(projects_dir)
        self.projects_dir.mkdir(parents=True, exist_ok=True)
        self.indexed_files = []

        # Projects to index
        self.projects = [
            {
                "name": "Casper-projet",
                "url": "https://github.com/le-stagiaire-ag2r/Casper-projet.git",
                "branch": "v4.0.0",
                "description": "Main Casper project with smart contracts and examples"
            },
            {
                "name": "Casper-Clicker",
                "url": "https://github.com/le-stagiaire-ag2r/Casper-Clicker.git",
                "branch": "main",
                "description": "Casper Clicker game implementation"
            },
            {
                "name": "CasperSecure",
                "url": "https://github.com/le-stagiaire-ag2r/CasperSecure.git",
                "branch": "main",
                "description": "Security-focused Casper utilities and tools"
            }
        ]

        # File extensions to index
        self.code_extensions = [
            '.rs',      # Rust (smart contracts)
            '.ts',      # TypeScript
            '.js',      # JavaScript
            '.tsx',     # TypeScript React
            '.jsx',     # JavaScript React
            '.json',    # Config files
            '.toml',    # Cargo.toml
            '.md',      # Documentation
            '.yaml',    # Config
            '.yml'      # Config
        ]

    def clone_project(self, project: Dict) -> bool:
        """Clone a GitHub project"""
        project_path = self.projects_dir / project['name']

        # Remove existing clone if present
        if project_path.exists():
            logger.info(f"📁 Project {project['name']} already exists, updating...")
            try:
                subprocess.run(
                    ['git', 'pull'],
                    cwd=project_path,
                    check=True,
                    capture_output=True
                )
                logger.info(f"✅ Updated {project['name']}")
                return True
            except subprocess.CalledProcessError as e:
                logger.warning(f"⚠️  Failed to update {project['name']}: {e}")
                return False

        # Clone the project
        logger.info(f"📥 Cloning {project['name']} from {project['url']}...")
        try:
            subprocess.run(
                ['git', 'clone', '--depth', '1', '--branch', project.get('branch', 'main'),
                 project['url'], str(project_path)],
                check=True,
                capture_output=True
            )
            logger.info(f"✅ Cloned {project['name']}")
            return True
        except subprocess.CalledProcessError as e:
            logger.error(f"❌ Failed to clone {project['name']}: {e}")
            return False

    def extract_code_file(self, file_path: Path, project_name: str) -> Dict:
        """Extract information from a code file"""
        try:
            with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
                content = f.read()

            # Get relative path from project root
            rel_path = file_path.relative_to(self.projects_dir / project_name)

            return {
                'file_path': str(rel_path),
                'full_path': str(file_path),
                'project': project_name,
                'extension': file_path.suffix,
                'content': content,
                'size': len(content),
                'lines': content.count('\n') + 1
            }
        except Exception as e:
            logger.error(f"Error reading {file_path}: {e}")
            return None

    def should_index_file(self, file_path: Path) -> bool:
        """Check if file should be indexed"""
        # Check extension
        if file_path.suffix not in self.code_extensions:
            return False

        # Skip certain directories
        skip_dirs = [
            'node_modules', '.git', 'target', 'build', 'dist',
            '__pycache__', '.next', 'venv', 'env'
        ]

        for part in file_path.parts:
            if part in skip_dirs:
                return False

        # Skip very large files (> 500KB)
        try:
            if file_path.stat().st_size > 500000:
                return False
        except:
            return False

        return True

    def index_project(self, project: Dict) -> List[Dict]:
        """Index all relevant files in a project"""
        project_path = self.projects_dir / project['name']

        if not project_path.exists():
            logger.warning(f"⚠️  Project {project['name']} not found, skipping...")
            return []

        logger.info(f"📚 Indexing {project['name']}...")

        indexed = []

        # Walk through all files
        for file_path in project_path.rglob('*'):
            if not file_path.is_file():
                continue

            if not self.should_index_file(file_path):
                continue

            file_data = self.extract_code_file(file_path, project['name'])
            if file_data:
                indexed.append(file_data)

        logger.info(f"✅ Indexed {len(indexed)} files from {project['name']}")
        return indexed

    def index_all_projects(self) -> List[Dict]:
        """Clone and index all projects"""
        logger.info("🚀 Starting GitHub projects indexing...")

        all_indexed = []

        for project in self.projects:
            logger.info(f"\n{'='*60}")
            logger.info(f"Processing: {project['name']}")
            logger.info(f"{'='*60}")

            # Clone/update project
            if self.clone_project(project):
                # Index files
                indexed = self.index_project(project)
                all_indexed.extend(indexed)

        logger.info(f"\n{'='*60}")
        logger.info(f"✅ Indexing complete!")
        logger.info(f"📊 Total files indexed: {len(all_indexed)}")

        # Statistics
        stats = self.calculate_stats(all_indexed)
        self.print_stats(stats)

        return all_indexed

    def calculate_stats(self, indexed_files: List[Dict]) -> Dict:
        """Calculate indexing statistics"""
        stats = {
            'total_files': len(indexed_files),
            'total_lines': sum(f['lines'] for f in indexed_files),
            'total_size': sum(f['size'] for f in indexed_files),
            'by_project': {},
            'by_extension': {}
        }

        for file_data in indexed_files:
            # By project
            proj = file_data['project']
            if proj not in stats['by_project']:
                stats['by_project'][proj] = {'count': 0, 'lines': 0}
            stats['by_project'][proj]['count'] += 1
            stats['by_project'][proj]['lines'] += file_data['lines']

            # By extension
            ext = file_data['extension']
            if ext not in stats['by_extension']:
                stats['by_extension'][ext] = 0
            stats['by_extension'][ext] += 1

        return stats

    def print_stats(self, stats: Dict):
        """Print indexing statistics"""
        logger.info(f"\n📊 Statistics:")
        logger.info(f"  Total files: {stats['total_files']}")
        logger.info(f"  Total lines of code: {stats['total_lines']:,}")
        logger.info(f"  Total size: {stats['total_size'] / 1024:.1f} KB")

        logger.info(f"\n📁 By project:")
        for project, data in stats['by_project'].items():
            logger.info(f"  {project}: {data['count']} files, {data['lines']:,} lines")

        logger.info(f"\n📝 By file type:")
        for ext, count in sorted(stats['by_extension'].items(), key=lambda x: x[1], reverse=True):
            logger.info(f"  {ext}: {count} files")

    def save_to_json(self, indexed_files: List[Dict], output_path: str = "data/docs/github_projects.json"):
        """Save indexed files to JSON"""
        output_file = Path(output_path)
        output_file.parent.mkdir(parents=True, exist_ok=True)

        with open(output_file, 'w', encoding='utf-8') as f:
            json.dump(indexed_files, f, ensure_ascii=False, indent=2)

        logger.info(f"\n💾 Saved to {output_path}")


def main():
    """Main entry point"""
    indexer = GitHubProjectIndexer()

    # Clone and index all projects
    indexed_files = indexer.index_all_projects()

    # Save to JSON
    indexer.save_to_json(indexed_files)

    logger.info(f"\n✨ Done! Your 3 projects are now indexed and ready to use.")
    logger.info(f"Run 'python scripts/index_docs.py' to add them to the vector database.")


if __name__ == "__main__":
    main()
